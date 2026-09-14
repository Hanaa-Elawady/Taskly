import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./feature/auth/auth.routes').then(m => m.AUTH_ROUTES)
      }
    ]
  },
  {
      path: '',
      canActivate: [authGuard],
      loadChildren: () =>
        import('./feature/dashboard/dashboard.routes').then(m => m.Dashboard_ROUTES)
  }
];
