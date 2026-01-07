import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { TestProbeService } from '../test-probe-service';

@Component({
  selector: 'app-home-booking-test-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './booking-test-panel.html',
  styleUrls: ['../home.scss', './booking-test-panel.scss'],
})
export class HomeBookingTestPanelComponent {
  private readonly testProbeService = inject(TestProbeService);
  readonly testProbeState = this.testProbeService.probeState;

  ngOnInit() {
    this.testProbeService.run();
  }
}
