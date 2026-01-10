import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { catchError, combineLatest, of, switchMap, tap } from 'rxjs';
import { AdminBooking } from '../../../shared/types';
import { AdminAuthService } from '../../../services/admin/admin-auth-service';
import { AdminBookingsService } from '../../../services/admin/admin-bookings-service';

const formatRoomLabel = (roomTypeId?: number, roomNumber?: number) => {
  if (roomTypeId != null && roomNumber != null) {
    return `t${roomTypeId}-${roomNumber}`;
  }
  if (roomTypeId != null) {
    return `t${roomTypeId}-?`;
  }
  if (roomNumber != null) {
    return `t?-${roomNumber}`;
  }
  return '-';
};

@Component({
  selector: 'app-bookings-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './table.html',
  styleUrls: ['../../admin-shared.scss', './table.scss'],
})
export class BookingsTableComponent {
  private readonly auth = inject(AdminAuthService);
  private readonly bookingsService = inject(AdminBookingsService);

  readonly PAGE_SIZE = 20;
  readonly showFutureOnly = signal(true);
  readonly page = signal(1);
  private readonly allSinceDate = '1970-01-01';

  bookings: AdminBooking[] = [];
  loadError: string | null = null;
  total: number | null = null;
  constructor() {
    // "$" suffix is a common convention (not enforced by RxJS) to mark Observable variables.
    // toObservable(A) makes A's changes observable; when A updates, A$ emits.
    const token$ = toObservable(this.auth.token);
    const filter$ = toObservable(this.showFutureOnly);
    const page$ = toObservable(this.page);

    const resetState = () => {
      this.bookings = [];
      this.total = null;
      this.loadError = null;
    };
    const applySuccess = ({ bookings, total }: { bookings: AdminBooking[]; total: number | null }) => {
      this.bookings = bookings;
      this.total = total;
      this.loadError = null;
    };
    const applyError = (err: unknown) => {
      this.bookings = [];
      this.total = null;
      this.loadError = err instanceof Error ? err.message : 'Unknown error';
    };

    // combineLatest: when token/filter/page changes, emit the latest values together.
    // On subscribe, it waits for each source to emit once, then emits immediately; later it emits on any change.
    // Here token$/filter$/page$ emit their current values right away, so combineLatest fires once immediately.
    combineLatest([token$, filter$, page$])
      // pipe: chains RxJS operators in order; each operator runs left-to-right and uses the previous result.
      // .pipe(...) returns a new Observable.
      .pipe(
        // switchMap: map that emission to a new inner Observable (HTTP request here).
        // When the request returns, tap(applySuccess) or catchError(applyError) runs.
        // If a new emission happens before the previous request returns, switchMap switches to the new request and ignores the old one.
        switchMap(([token, showFuture, page]) => {
          if (!token) {
            // Logged out or token missing: clear UI and stop here.
            resetState();
            // of(null): emit a single null value and complete, so switchMap still returns an Observable.
            return of(null);
          }

          const fromDate = showFuture ? this.getNzToday() : this.allSinceDate;
          // It returns immediately (lazy); execution happens later when the outer stream is subscribed.
          return this.bookingsService.loadBookings(fromDate, page, this.PAGE_SIZE).pipe(
            // tap: run side effects (update component state) without changing the emitted value.
            tap(applySuccess),
            // Error path: clear data and store the message.
            catchError((err) => {
              applyError(err);
              return of(null);
            }),
          );
        }),
        // takeUntilDestroyed: auto-unsubscribe on component destroy to avoid leaks.
        // It stops the whole chain (combineLatest -> switchMap -> inner HTTP request), so no more values or callbacks run.
        // This happens at destroy time; it doesn't wait for the HTTP request to finish.
        takeUntilDestroyed(),
      )
      // subscribe: starts the stream so it runs; without it nothing executes.
      .subscribe();
  }

  get token(): string | null {
    return this.auth.token();
  }

  get toggleLabel(): string {
    return this.showFutureOnly() ? 'Show all (check-out)' : 'Show future (check-out)';
  }

  get pageCount(): number | null {
    return this.total != null ? Math.max(1, Math.ceil(this.total / this.PAGE_SIZE)) : null;
  }

  get isNextDisabled(): boolean {
    return this.total != null ? this.page() * this.PAGE_SIZE >= this.total : this.bookings.length < this.PAGE_SIZE;
  }

  toggleScope(): void {
    this.page.set(1);
    this.showFutureOnly.set(!this.showFutureOnly());
  }

  previousPage(): void {
    this.page.update((value) => Math.max(1, value - 1));
  }

  nextPage(): void {
    this.page.update((value) => value + 1);
  }

  formatRoomLabel(roomTypeId?: number, roomNumber?: number): string {
    return formatRoomLabel(roomTypeId, roomNumber);
  }

  onDelete(booking: AdminBooking, details: HTMLDetailsElement | null): void {
    // Placeholder for future delete action; keep UI behaviour consistent.
    // eslint-disable-next-line no-console
    console.log('delete booking id:', booking.id ?? '-');
    if (details) {
      details.removeAttribute('open');
    }
  }

  private getNzToday(): string {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Pacific/Auckland',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const parts = formatter.formatToParts(new Date());
    const pick = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? '';
    return `${pick('year')}-${pick('month')}-${pick('day')}`;
  }
}
