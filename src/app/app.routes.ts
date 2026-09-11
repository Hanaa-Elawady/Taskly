import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
      }
    ]
  },
  {
      path: '',
      canActivate: [authGuard],
      loadChildren: () =>
        import('./project/project.routes').then(m => m.PROJECT_ROUTES)
  }
];
