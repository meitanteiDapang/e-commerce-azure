import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-hero-flex',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './hero-flex.html',
  styleUrls: ['../home.scss', './hero-flex.scss'],
})
export class HomeHeroFlexComponent {
  @Input({ required: true }) heroImage!: () => string;
}
