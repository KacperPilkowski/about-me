import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'en', pathMatch: 'full' },
  {
    path: ':lang',
    loadComponent: () => import('./home/home').then(m => m.Home),
  },
];
