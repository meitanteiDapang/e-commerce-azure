import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DapangButton } from "../../dapang-button/dapang-button";

@Component({
  selector: 'app-home-nav-bar',
  standalone: true,
  templateUrl: './navBar.html',
  styleUrls: ['../home.scss', './navBar.scss'],
  imports: [DapangButton],
})
export class HomeNavBarComponent {
  private readonly router = inject(Router);

  handleAdminEntry(e: Event): void {
    this.router.navigate(['/adminLogin']);
  }
}
