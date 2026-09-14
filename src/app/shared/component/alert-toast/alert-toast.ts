import { NgClass } from '@angular/common';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
export type AlertType = 'success' | 'error' | 'info';

@Component({
  imports: [NgClass],
  selector: 'app-alert-toast',
  styleUrl: './alert-toast.css',
  templateUrl: './alert-toast.html',
})
export class AlertToast implements OnInit {
  @Input() type: AlertType = 'success';
  @Input() message: string = '';

  isVisible: boolean = true;
  @ViewChild('toastContainer') toastContainer!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.handleLifecycle();
  }

  getStyles(): string {
    switch (this.type) {
      case 'success': return 'bg-emerald-500 border-emerald-600';
      case 'error': return 'bg-rose-500 border-rose-600';
      case 'info': return 'bg-sky-400 border-sky-500';
    }
  }

  handleLifecycle(): void {
    setTimeout(() => {
      if (this.toastContainer) {
        this.renderer.addClass(this.toastContainer.nativeElement, '-translate-y-4');
        this.renderer.addClass(this.toastContainer.nativeElement, 'opacity-0');
      }
    }, 4500);

    setTimeout(() => {
      this.dismiss();
    }, 5000);
  }

  dismiss(): void {
    this.isVisible = false;
  }
}