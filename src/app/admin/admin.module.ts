import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminHomeNavigationBarComponent } from './Navigation Bars/Home Navigation Bar/admin-home-navigation-bar/admin-home-navigation-bar.component';
import { UsersListComponent } from './Users/users-list/users-list.component';
import { UserDetailsComponent } from './Users/user-details/user-details.component';
import { SharedModule } from '../shared/shared.module';
import { AdminHomePageComponent } from './Admin-Home/admin-home-page/admin-home-page.component';
import { CategoryListComponent } from './Category/category-list/category-list.component';
import { AddEditCategoryComponent } from './Category/add-edit-category/add-edit-category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminCategoryNavbarComponent } from './Category/admin-category-navbar/admin-category-navbar.component';
import { AdminProductListComponent } from './Products/admin-product-list/admin-product-list.component';
import { ProductFormComponent } from './Products/product-form/product-form.component';
import { AdminProductNavbarComponent } from './Products/admin-product-navbar/admin-product-navbar.component';
import { AdminProductDetailsComponent } from './Products/admin-product-details/admin-product-details.component';
import { AdminLoginFormComponent } from './admin-login-form/admin-login-form/admin-login-form.component';
import { AdminOrdersListComponent } from './Orders/admin-orders-list/admin-orders-list.component';
@NgModule({
  declarations: [
    AdminComponent,
    AdminHomeNavigationBarComponent,
    UsersListComponent,
    UserDetailsComponent,
    AdminHomePageComponent,
    CategoryListComponent,
    AddEditCategoryComponent,
    AdminCategoryNavbarComponent,
    AdminProductListComponent,
    ProductFormComponent,
    AdminProductNavbarComponent,
    AdminProductDetailsComponent,
    AdminLoginFormComponent,
    AdminOrdersListComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [AdminLoginFormComponent],
})
export class AdminModule {}
