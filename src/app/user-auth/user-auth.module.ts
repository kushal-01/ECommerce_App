import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAuthRoutingModule } from './user-auth-routing.module';
import { UserAuthComponent } from './user-auth.component';
import { LoginFormComponent } from './Authentication Forms/login-form/login-form.component';
import { RegisterFormComponent } from './Authentication Forms/register-form/register-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [UserAuthComponent, LoginFormComponent, RegisterFormComponent],
  imports: [
    CommonModule,
    UserAuthRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [UserAuthComponent, LoginFormComponent, RegisterFormComponent],
})
export class UserAuthModule {}
