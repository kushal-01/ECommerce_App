import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomePageComponent } from './Admin-Home/admin-home-page/admin-home-page.component';
import { AdminComponent } from './admin.component';
import { AddEditCategoryComponent } from './Category/add-edit-category/add-edit-category.component';
import { AdminCategoryNavbarComponent } from './Category/admin-category-navbar/admin-category-navbar.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { AdminOrdersListComponent } from './Orders/admin-orders-list/admin-orders-list.component';
import { AdminProductDetailsComponent } from './Products/admin-product-details/admin-product-details.component';
import { AdminProductListComponent } from './Products/admin-product-list/admin-product-list.component';
import { AdminProductNavbarComponent } from './Products/admin-product-navbar/admin-product-navbar.component';
import { ProductFormComponent } from './Products/product-form/product-form.component';
import { UserDetailsComponent } from './Users/user-details/user-details.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: 'home', component: AdminHomePageComponent },
      { path: 'user-list', component: UsersListComponent },
      { path: 'user-details/:id', component: UserDetailsComponent },
      {
        path: 'category-navbar',
        component: AdminCategoryNavbarComponent,
        children: [
          { path: '', component: CategoryListComponent },
          { path: 'category-list', component: CategoryListComponent },
          { path: 'add-category', component: AddEditCategoryComponent },
        ],
      },
      {
        path: 'product-navbar',
        component: AdminProductNavbarComponent,
        children: [
          { path: '', component: AdminProductListComponent },
          { path: 'product-list', component: AdminProductListComponent },
          { path: 'add-product', component: ProductFormComponent },
          {
            path: 'product-details/:id',
            component: AdminProductDetailsComponent,
          },
        ],
      },
      { path: 'admin-order-list', component: AdminOrdersListComponent },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
