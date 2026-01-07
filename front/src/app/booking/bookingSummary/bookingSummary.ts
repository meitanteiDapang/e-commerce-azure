import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RoomType } from '../../shared/types';

@Component({
  selector: 'app-booking-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookingSummary.html',
  styleUrls: ['./bookingSummary.scss'],
})
export class BookingSummaryComponent {
  @Input({ required: true }) room: RoomType | null = null;
}
