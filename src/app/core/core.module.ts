import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreRoutingModule } from './core-routing.module';
import { ApplicationCoreComponent } from './application-core.component';
import { NavigationBarComponent } from './Navigation Bars/Home Navigation Bar/navigation-bar/navigation-bar.component';
import { CategoryNavigationBarComponent } from './Navigation Bars/Category Navigation Bar/category-navigation-bar/category-navigation-bar.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ApplicationCoreComponent,
    NavigationBarComponent,
    CategoryNavigationBarComponent,
  ],
  imports: [CommonModule, CoreRoutingModule, SharedModule, FormsModule],
  exports: [
    ApplicationCoreComponent,
    NavigationBarComponent,
    CategoryNavigationBarComponent,
  ],
})
export class CoreModule {}
