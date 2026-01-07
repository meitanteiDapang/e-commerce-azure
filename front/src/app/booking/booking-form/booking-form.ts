import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Availability } from '../../shared/types';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.scss'],
})
export class BookingFormComponent {
  @Input({ required: true }) bookingForm!: FormGroup;
  @Input({ required: true }) totalPrice!: { nights: number; total: number };
  @Input({ required: true }) today = '';
  @Input({ required: true }) minCheckOutDate = '';
  @Input() checking = false;
  @Input() availabilityError = '';
  @Input() availability: Availability | null = null;
  @Input() bookingButtonDisabled = false;
  @Input() submitting = false;
  @Output() readonly phoneInput = new EventEmitter<Event>();
  @Output() readonly submit = new EventEmitter<void>();
}
