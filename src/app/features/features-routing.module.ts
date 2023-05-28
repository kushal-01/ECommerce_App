import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './Carts/cart-list/cart-list.component';
import { FeaturesComponent } from './features.component';
import { OrderListComponent } from './Orders/order-list/order-list.component';
import { ProductDetailsComponent } from './Products/product-details/product-details.component';
import { ProductListComponent } from './Products/product-list/product-list.component';
import { WishlistListComponent } from './Wishlist/wishlist-list/wishlist-list.component';
const routes: Routes = [
  { path: '', component: FeaturesComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id', component: ProductDetailsComponent },
  { path: 'cart-list', component: CartListComponent },
  { path: 'wish-list', component: WishlistListComponent },
  { path: 'order-list', component: OrderListComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FeaturesRoutingModule {}
