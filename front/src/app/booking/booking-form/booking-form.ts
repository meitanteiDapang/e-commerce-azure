import { CommonModule } from "@angular/common";
import {
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  computed,
  inject,
  input,
  signal,
} from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { takeUntilDestroyed, toObservable } from "@angular/core/rxjs-interop";
import {
  combineLatest,
  debounceTime,
  EMPTY,
  finalize,
  startWith,
  switchMap,
  tap,
  catchError,
} from "rxjs";
import { BookingService } from "../../shared/booking-service";
import { Availability, RoomType } from "../../shared/types";
import {
  sanitizePhone,
  toIsoDate,
  isEmailPatternLegal,
  isPhonePatternLegal,
} from "../booking-helpers";

@Component({
  selector: "app-booking-form",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./booking-form.html",
  styleUrls: ["./booking-form.scss"],
})
export class BookingFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bookingService = inject(BookingService);
  private readonly destroyRef = inject(DestroyRef);

  roomType = input.required<RoomType | null>();
  private readonly roomId = computed(() => this.roomType()?.id ?? -1);

  @Output() readonly booked = new EventEmitter<{ roomTypeId: number }>();

  readonly bookingForm = this.fb.group({
    checkInDate: [""],
    checkOutDate: [""],
    name: [""],
    email: [""],
    phone: [""],
  });

  availability: Availability | null = null;
  availabilityError = "";
  checking = false;
  submitting = false;
  error = "";

  dateErrorText = "";
  nameErrorText = "";
  emailErrorText = "";
  phoneErrorText = "";

  success = "";
  readonly today = toIsoDate(new Date());

  constructor() {
    this.setupAvailabilityWatcher();
  }

  get minCheckOutDate(): string {
    const checkIn = this.bookingForm.controls.checkInDate.value;
    if (!checkIn) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      return toIsoDate(tomorrow);
    }
    const parsed = new Date(checkIn);
    if (Number.isNaN(parsed.getTime())) {
      return this.today;
    }
    parsed.setDate(parsed.getDate() + 1);
    return toIsoDate(parsed);
  }

  get totalPrice() {
    const room = this.roomType();
    const formValue = this.bookingForm.value;
    if (!room || !formValue.checkInDate || !formValue.checkOutDate) {
      return { nights: 0, total: 0 };
    }
    const checkIn = new Date(formValue.checkInDate);
    const checkOut = new Date(formValue.checkOutDate);
    if (Number.isNaN(checkIn.getTime()) || Number.isNaN(checkOut.getTime())) {
      return { nights: 0, total: 0 };
    }
    if (checkOut <= checkIn) {
      return { nights: 0, total: 0 };
    }
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (nights <= 0) return { nights: 0, total: 0 };
    return { nights, total: nights * room.price };
  }

  get isBookingFormFinished(): boolean {
    const formValue = this.bookingForm.value;
    return (this.availability?.available === true &&
      formValue.name &&
      !this.nameErrorText &&
      formValue.email &&
      !this.emailErrorText &&
      formValue.phone &&
      !this.phoneErrorText) as boolean;
  }

  get bookingButtonDisabled(): boolean {
    const formValue = this.bookingForm.value;
    return (
      this.submitting ||
      this.checking ||
      !formValue.checkInDate ||
      !formValue.checkOutDate ||
      this.availability?.available === false
    );
  }

  onNameChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const raw = input.value;
    if (raw == "") {
      this.nameErrorText = "Please input your name.";
    } else {
      this.nameErrorText = "";
    }
  }

  onEmailValidated(res: boolean): void {
    if (res) {
      this.emailErrorText = "";
    } else {
      this.emailErrorText = "Please enter a valid email address.";
    }
  }

  onEmailChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    console.log(input.value);
    const raw = input.value;
    this.onEmailValidated(isEmailPatternLegal(raw));
  }

  onPhoneValidated(res: boolean): void {
    if (res) {
      this.phoneErrorText = "";
    } else {
      this.phoneErrorText = "Please enter a valid phone number.";
    }
  }

  onPhoneChange(event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const raw = input.value;
    this.onPhoneValidated(isPhonePatternLegal(raw));
  }

  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bookingForm.controls.phone.setValue(sanitizePhone(input.value), {
      emitEvent: false,
    });
  }

  handleSubmit(): void {
    this.error = "";
    this.success = "";
    const formValue = this.bookingForm.value;
    const room = this.roomType();
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!room) {
      this.error = "Room type not determined.";
      return;
    }

    if (
      !(formValue.checkInDate &&
        formValue.checkOutDate &&
        formValue.name &&
        formValue.email &&
        formValue.phone &&
        this.isBookingFormFinished)
    ) {
      this.error = "Please check your booking detail";
      return;
    }


    this.submitting = true;
    this.bookingService
      .createBooking({
        roomTypeId: this.roomId(),
        checkInDate: formValue.checkInDate,
        checkOutDate: formValue.checkOutDate,
        name: formValue.name,
        email: formValue.email,
        phone: formValue.phone,
      })
      .pipe(
        tap((result) => {
          const roomNote = result?.roomNumber
            ? ` Room #${result.roomNumber} reserved.`
            : "";
          this.success = `Booking confirmed. We will reach out shortly.${roomNote}`;
          this.booked.emit({ roomTypeId: this.roomId() });
        }),
        catchError((err) => {
          this.error =
            err instanceof Error ? err.message : "Failed to create booking.";
          return EMPTY;
        }),
        finalize(() => {
          this.submitting = false;
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  private setupAvailabilityWatcher(): void {
    const roomTypeId$ = toObservable(this.roomId);
    const checkIn$ = this.bookingForm.controls.checkInDate.valueChanges.pipe(
      startWith("")
    );
    const checkOut$ = this.bookingForm.controls.checkOutDate.valueChanges.pipe(
      startWith("")
    );

    combineLatest([roomTypeId$, checkIn$, checkOut$])
      .pipe(
        debounceTime(120),
        tap(() => {
          this.availability = null;
          this.availabilityError = "";
        }),
        switchMap(([roomTypeId, checkInDate, checkOutDate]) => {
          if (!roomTypeId || !checkInDate || !checkOutDate) {
            this.checking = false;
            return EMPTY;
          }

          const checkIn = new Date(checkInDate);
          const checkOut = new Date(checkOutDate);

          if (
            Number.isNaN(checkIn.getTime()) ||
            Number.isNaN(checkOut.getTime())
          ) {
            this.availabilityError = "Please select valid dates.";
            this.checking = false;
            return EMPTY;
          }

          if (checkOut <= checkIn) {
            this.availabilityError = "Check-out must be after check-in.";
            this.checking = false;
            return EMPTY;
          }

          this.checking = true;
          return this.bookingService
            .checkAvailability({
              roomTypeId,
              checkInDate,
              checkOutDate,
            })
            .pipe(
              tap((availability) => {
                this.availability = availability;
                this.availabilityError = "";
              }),
              catchError((err) => {
                this.availability = null;
                this.availabilityError =
                  err instanceof Error
                    ? err.message
                    : "Failed to check availability.";
                return EMPTY;
              }),
              finalize(() => {
                this.checking = false;
              })
            );
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }
}
