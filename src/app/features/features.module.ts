import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeaturesRoutingModule } from './features-routing.module';
import { FeaturesComponent } from './features.component';
import { HomePageComponent } from './Home/home-page/home-page.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { ProductDetailsComponent } from './Products/product-details/product-details.component';
import { TextBlueDirective } from '../shared/Directives/Text-Color Directive/text-blue.directive';
import { SharedModule } from '../shared/shared.module';
import { CartListComponent } from './Carts/cart-list/cart-list.component';
import { WishlistListComponent } from './Wishlist/wishlist-list/wishlist-list.component';
import { OrderListComponent } from './Orders/order-list/order-list.component';
import { ErrorPageComponent } from './Error Page/error-page/error-page.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    FeaturesComponent,
    HomePageComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartListComponent,
    WishlistListComponent,
    OrderListComponent,
    ErrorPageComponent,
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    NgxPaginationModule,
  ],
  exports: [HomePageComponent, ProductListComponent, ProductDetailsComponent],
})
export class FeaturesModule {}
