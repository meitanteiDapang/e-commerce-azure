import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-hero-grid',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero-grid.html',
  styleUrls: ['../home.scss', './hero-grid.scss'],
})
export class HomeHeroGridComponent {
  @Input({ required: true }) heroImage!: () => string;
}
