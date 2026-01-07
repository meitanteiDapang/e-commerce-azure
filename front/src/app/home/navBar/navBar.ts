import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-nav-bar',
  standalone: true,
  templateUrl: './navBar.html',
  styleUrls: ['../home.scss', './navBar.scss'],
})
export class HomeNavBarComponent {
  private readonly router = inject(Router);

  handleAdminEntry(e: Event): void {
    this.router.navigate(['/adminLogin']);
  }
}
