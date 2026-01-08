import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RoomTypesService } from '../shared/room-types-service';
import { RoomType } from '../shared/types';
import { BookingFormComponent } from './booking-form/booking-form';
import { BookingHeaderComponent } from './booking-header/booking-header';
import { BookingSummaryComponent } from './booking-summary/booking-summary';
import { parseRoomTypeId } from './booking-helpers';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [CommonModule, BookingFormComponent, BookingHeaderComponent, BookingSummaryComponent],
  templateUrl: './booking.html',
  styleUrls: ['./booking.scss'],
})
export class BookingComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly roomTypesService = inject(RoomTypesService);

  readonly roomTypesState = this.roomTypesService.roomTypesState;
  readonly roomTypeId = signal<number | null>(parseRoomTypeId(this.route.snapshot.queryParamMap.get('roomTypeId')));
  readonly selectedRoom = computed<RoomType | null>(() => {
    const id = this.roomTypeId();
    if (id == null) return null;
    return this.roomTypesState().data.find((room) => room.id === id) ?? null;
  });

  constructor() {
    this.roomTypesService.ensureLoaded();
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe((params) => {
      this.roomTypeId.set(parseRoomTypeId(params.get('roomTypeId')));
    });
  }

  handleBookingComplete(event: { roomTypeId: number }): void {
    const queryParams = event.roomTypeId ? { roomTypeId: event.roomTypeId } : undefined;
    this.router.navigate(['/booked'], { queryParams });
  }
}
