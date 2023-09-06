import { Platform } from '@angular/cdk/platform';
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
  public isInstalled = false;

  constructor(private platform: Platform) {}

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (event: Event) => {
      event.preventDefault();
    });
  }

  public isCanInstallPWA(): boolean {
    return this.platform.isBrowser && 'serviceWorker' in navigator;
  }

  public handleInstallPWA(): void {
    const promptEvent = (window as any).beforeinstallprompt;

    if (promptEvent) {
      promptEvent.prompt();

      promptEvent.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          this.isInstalled = true;
        }
      });
    }
  }
}
