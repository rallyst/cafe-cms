import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';



export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    data: {
      expectedRole: ['admin']
    }
  }
];
