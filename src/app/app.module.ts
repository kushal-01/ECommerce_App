import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DataModule } from './data/data.module';
import { FeaturesModule } from './features/features.module';
import { SharedModule } from './shared/shared.module';
import { UserAuthModule } from './user-auth/user-auth.module';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserAuthModule,
    SharedModule,
    FeaturesModule,
    DataModule,
    CoreModule,
    NgxPaginationModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
