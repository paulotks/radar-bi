import { Routes } from '@angular/router';
import {BiListComponent} from './views/bi-list/bi-list.component';
import {PageNotFoundComponent} from './views/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: BiListComponent },
  { path: '**', component: PageNotFoundComponent }

];
