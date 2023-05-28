import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormComponent } from './Authentication Forms/login-form/login-form.component';
import { RegisterFormComponent } from './Authentication Forms/register-form/register-form.component';
import { UserAuthComponent } from './user-auth.component';
const routes: Routes = [
  {
    path: '',
    component: UserAuthComponent,
  },
  { path: 'login', component: LoginFormComponent },
  { path: 'register', component: RegisterFormComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserAuthRoutingModule {}
