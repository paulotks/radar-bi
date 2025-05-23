import {Component, inject, OnDestroy, signal, ViewChild} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MediaMatcher} from '@angular/cdk/layout';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, MatIconModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  readonly isCollapsed = signal(true);

  protected readonly isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  constructor() {
    const media = inject(MediaMatcher);

    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this.isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this.isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  toggleMenu() {
    if (this.isMobile()) {
      this.sidenav.toggle();
      this.isCollapsed.set(false);
    } else {
      this.sidenav.open();
      this.isCollapsed.set(!this.isCollapsed());
    }
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
