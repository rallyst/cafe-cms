import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';



export const MaterialRoutes: Routes = [
  {
    path: 'category',
    component: ManageCategoryComponent,
    data: {
      expectedRole: ['admin']
    }
  },
  {
    path: 'product',
    component: ManageProductComponent,
    data: {
      expectedRole: ['admin']
    }
  }
];
