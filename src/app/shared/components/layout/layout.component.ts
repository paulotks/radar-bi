import {Component, inject, OnDestroy, output, signal, ViewChild} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {NgOptimizedImage} from '@angular/common';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, NgOptimizedImage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnDestroy {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  sideNavCollapsed = output<boolean>();
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

    this.sideNavCollapsed.emit(this.isCollapsed());
  }

  ngOnDestroy(): void {
    this._mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

}
