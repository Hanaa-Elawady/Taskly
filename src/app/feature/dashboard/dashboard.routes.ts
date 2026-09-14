import { Routes } from '@angular/router';
import { ProjectList } from './project-list/project-list';

export const Dashboard_ROUTES: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'project', component: ProjectList },
];