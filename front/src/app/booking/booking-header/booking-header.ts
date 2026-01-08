import { Component, EventEmitter, Output } from '@angular/core';
import { DapangButton } from "../../dapang-button/dapang-button";

@Component({
  selector: 'app-booking-header',
  standalone: true,
  templateUrl: './booking-header.html',
  styleUrls: ['./booking-header.scss'],
  imports: [DapangButton],
})
export class BookingHeaderComponent {
}
