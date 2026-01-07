import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { TestProbeService } from '../testProbeService';

@Component({
  selector: 'app-home-booking-test-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookingTestPanel.html',
  styleUrls: ['../home.scss', './bookingTestPanel.scss'],
})
export class HomeBookingTestPanelComponent {

  private readonly testProbeService = inject(TestProbeService);
  readonly testProbeState = this.testProbeService.probeState;

  ngOnInit() {
    this.testProbeService.run();
  }
}
