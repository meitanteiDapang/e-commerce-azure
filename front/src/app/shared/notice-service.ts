import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NoticeService {
  private readonly messageSignal = signal<string | null>(null);
  readonly message = this.messageSignal.asReadonly();
  private timeoutId: ReturnType<typeof setTimeout> | null = null;

  show(message: string, durationMs = 10000): void {
    this.messageSignal.set(message);
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    this.timeoutId = setTimeout(() => {
      this.messageSignal.set(null);
      this.timeoutId = null;
    }, durationMs);
  }
}
