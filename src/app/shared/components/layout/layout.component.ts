import {Component, inject, output, ViewChild, AfterViewInit} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {NgOptimizedImage} from '@angular/common';
import {SidenavService} from '@services/sidenav-service/sidenav.service';

@Component({
  selector: 'app-layout',
  imports: [MatIconModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule, MatListModule, NgOptimizedImage],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  private sidenavService = inject(SidenavService);

  sideNavCollapsed = output<boolean>();

  readonly isCollapsed = this.sidenavService.isCollapsed;
  readonly isMobile = this.sidenavService.isMobile;

  constructor() {
    this.sidenavService.registerSidenav(this.sidenav);
  }

  ngAfterViewInit(): void {
    this.sidenavService.registerSidenav(this.sidenav);
  }

  toggleMenu() {
    this.sidenavService.toggle();

    this.sideNavCollapsed.emit(this.isCollapsed());
  }

}
