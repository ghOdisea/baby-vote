import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'vote', pathMatch: 'full' },
  { path: 'vote', loadComponent: () => import('./pages/vote/vote').then(m => m.VoteComponent) },
  { path: 'results', loadComponent: () => import('./pages/results/results').then(m => m.ResultsComponent) },
  { path: '**', redirectTo: 'vote' }
];
