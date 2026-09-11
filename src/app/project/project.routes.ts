import { Routes } from '@angular/router';
import { ProjectList } from './component/project-list/project-list';

export const PROJECT_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'project', component: ProjectList },
];