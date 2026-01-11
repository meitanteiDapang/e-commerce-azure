import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NoticeService } from '../notice-service';

@Component({
  selector: 'app-notice-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notice-toast.html',
  styleUrls: ['./notice-toast.scss'],
})
export class NoticeToastComponent {
  readonly notice = inject(NoticeService);
}
