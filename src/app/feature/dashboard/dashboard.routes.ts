import { Routes } from '@angular/router';
import { DashboardLayout } from '../../layout/dashboard-layout/dashboard-layout';

export const Dashboard_ROUTES: Routes = [
    { path: '', component: DashboardLayout , children:[
        {
            path:'project' ,
            loadComponent: () => import('../dashboard/project-list/project-list').then(m => m.ProjectList) 
        },
    ] },
];