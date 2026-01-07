import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dapang-button',
  imports: [],
  templateUrl: './dapang-button.html',
  styleUrl: './dapang-button.scss',
})
export class DapangButton {

  private router = inject(Router)

  onClick(e: Event): void {
    if (this.router.url === '/') {
      window.location.reload();
      return;
    }
    this.router.navigate(['/']);
  }
}
