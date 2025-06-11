import {Injectable, signal, inject} from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {MediaMatcher} from '@angular/cdk/layout';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {

  private sidenav!: MatSidenav;
  private _isCollapsed = signal<boolean>(true);
  private _isMobile = signal(true);
  private readonly _mobileQuery: MediaQueryList;
  private readonly _mobileQueryListener: () => void;

  readonly isCollapsed = this._isCollapsed.asReadonly();
  readonly isMobile = this._isMobile.asReadonly();

  constructor() {
    const media = inject(MediaMatcher);
    this._mobileQuery = media.matchMedia('(max-width: 600px)');
    this._isMobile.set(this._mobileQuery.matches);
    this._mobileQueryListener = () => this._isMobile.set(this._mobileQuery.matches);
    this._mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  registerSidenav(sidenav: MatSidenav): void {
    this.sidenav = sidenav;
  }

  toggle(): void {
    if (!this.sidenav) return;

    if (this._isMobile()) {
      this.sidenav.toggle();
      this._isCollapsed.set(false);
    } else {
      this.sidenav.open();
      this._isCollapsed.set(!this.isCollapsed());
    }
  }

  open(): void {
    if (!this.sidenav) return;
    this.sidenav.open();
    this._isCollapsed.set(false);
  }

  close(): void {
    if (!this.sidenav) return;
    this.sidenav.close();
    this._isCollapsed.set(true);
  }

  collapse(): void {
    if (!this.sidenav) return;
    this.sidenav.open();
    this._isCollapsed.set(true);
  }

  expand(): void {
    if (!this.sidenav) return;
    this.sidenav.open();
    this._isCollapsed.set(false);
  }
}
