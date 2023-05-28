import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginFormComponent } from './admin/admin-login-form/admin-login-form/admin-login-form.component';
import { AdminGuard } from './admin/Guard/admin.guard';
import { AppComponent } from './app.component';
import { HomePageComponent } from './features/Home/home-page/home-page.component';
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'home-page',
    component: HomePageComponent,
  },
  {
    path: 'admin-auth',
    component: AdminLoginFormComponent,
  },
  {
    path: 'user-auth',
    loadChildren: () =>
      import('./user-auth/user-auth.module').then((m) => m.UserAuthModule),
  },
  {
    path: 'features',
    loadChildren: () =>
      import('./features/features.module').then((m) => m.FeaturesModule),
  },
  {
    path: 'core',
    loadChildren: () => import('./core/core.module').then((m) => m.CoreModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
