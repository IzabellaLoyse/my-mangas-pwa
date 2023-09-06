
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  private deferredPrompt: any;
  public isInstallable = false;

  constructor() {}

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event: any) => {
      event.preventDefault();
      this.deferredPrompt = event;
      this.isInstallable = true;
    });

    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstallable = false;
    }
  }

  public handleInstallPWA(): void {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('O usuário instalou o PWA.');
          this.isInstallable = false;
        }
        this.deferredPrompt = null;
      });
    }
  }
}
