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
  public isInstallable = false;

  public ngOnInit(): void {
    this.checkIfInstallable();

    window.addEventListener('appinstalled', (event) => {
      (window as any).deferredPrompt = null;
    });

    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      (window as any).deferredPrompt = event;
      this.isInstallable = true;
    });
  }

  public handleInstallPWA(): void {
    if (this.isInstallable) {
      const deferredPrompt = (window as any).deferredPrompt;

      if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            this.isInstallable = false;
          }
          (window as any).deferredPrompt = null;
        });
      }
    }
  }

  private checkIfInstallable(): void {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      this.isInstallable = false;
    }
  }
}
