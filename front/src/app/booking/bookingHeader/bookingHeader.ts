import { Component, EventEmitter, Output } from '@angular/core';
import { DapangButton } from "../../dapang-button/dapang-button";

@Component({
  selector: 'app-booking-header',
  standalone: true,
  templateUrl: './bookingHeader.html',
  styleUrls: ['./bookingHeader.scss'],
  imports: [DapangButton],
})
export class BookingHeaderComponent {
  @Output() readonly back = new EventEmitter<void>();

  handleBack(): void {
    this.back.emit();
  }
}
