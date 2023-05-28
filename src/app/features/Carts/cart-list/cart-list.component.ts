import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { iOrder } from 'src/app/data/Models/Orders Model/order';
import { Product } from 'src/app/data/Models/Product Model/product';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { OrderService } from '../../Orders/Order-Services/order.service';
import { CartService } from '../Cart-Service/cart.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent {
  public isUserLoggedIn!: boolean;
  public currentUserId!: any;
  public allCartData: iCart[] = [];
  public currentUserCart: iCart[] = [];
  public grandTotal: number = 0;
  public showLoadingMessage: boolean = true;
  // Variables related to Order Now Functionality
  public allOrderData: iOrder[] = [];
  public currentUserOrder: iOrder[] = [];
  public userOrderExists: boolean = false;
  public currentOrderId!: any;
  constructor(
    private subjectService: SubjectService,
    private cartService: CartService,
    private route: Router,
    private httpService: HttpClientService,
    private orderService: OrderService,
    private urlService: UrlService
  ) {}
  ngOnInit() {
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
    // Getting Cart List Here
    this.cartService.getCartList().subscribe((response) => {
      this.allCartData = response;
      // Getting specific cart of logged in User
      this.currentUserCart = this.allCartData.filter((cart) => {
        return cart.belongsTo === this.currentUserId;
      });
      // Calculating the grand Total
      if (this.currentUserCart.length > 0) {
        for (let product of this.currentUserCart[0].products) {
          this.grandTotal = product.price + this.grandTotal;
        }
      }
      this.showLoadingMessage = false;
    });
    // Checking if the whole cart is emptied or not
    this.subjectService.cartEmptySubject.subscribe((response) => {
      if (response == true) {
        this.currentUserCart.length = 0;
      }
    });
    // Getting Order List Here
    this.orderService.getOrderList().subscribe((response) => {
      this.allOrderData = response;
      // Getting specific Orders of logged in User
      this.currentUserOrder = this.allOrderData.filter((order) => {
        return order.belongsTo === this.currentUserId;
      });
    });
  }
  ngDoCheck() {
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
  }
  public navigateToLoginPage() {
    this.route.navigate(['login']);
  }
  public removeProductFromCart(currentProduct: Product, index: number) {
    const remove = confirm('Do You want to remove item from the Cart:');
    if (remove) {
      if (this.currentUserCart[0].products.length > 1) {
        this.currentUserCart[0].products.splice(index, 1);
        if (this.currentUserCart[0].id) {
          this.httpService
            .putRequest(
              this.urlService.cartApiUrl,
              this.currentUserCart[0].id,
              this.currentUserCart[0]
            )
            .subscribe();
        }
      } else {
        if (this.currentUserCart[0].id) {
          this.httpService
            .deleteRequest(
              this.urlService.cartApiUrl,
              this.currentUserCart[0].id
            )
            .subscribe();
          setTimeout(() => {
            this.subjectService.cartEmptySubject.next(true);
          }, 800);
        }
      }
      setTimeout(() => {
        this.subjectService.cartItemUpdateSubject.next(true);
      }, 800);
    }
  }
  public emptyCart() {
    const remove = confirm('Do You want to remove all item from the Cart:');
    if (remove) {
      if (this.currentUserCart[0].id) {
        this.httpService
          .deleteRequest(this.urlService.cartApiUrl, this.currentUserCart[0].id)
          .subscribe((response) => {});
      }
      setTimeout(() => {
        this.subjectService.cartItemUpdateSubject.next(true);
        this.subjectService.cartEmptySubject.next(true);
      }, 800);
    }
  }
  // Method for Viewing Details of Product
  public onViewDetailSelect(productId: string) {
    this.route.navigate(['products', productId]);
  }
  // Methods related to Order Now Functionality
  public onOrder() {
    this.orderService.getOrderList().subscribe((response) => {
      this.allOrderData = response;
    });
    const order = confirm('Do You Want to Order all The Items');
    setTimeout(() => {
      if (order) {
        this.checkUserInOrders();
        if (this.userOrderExists) {
          for (let product of this.currentUserCart[0].products) {
            this.currentUserOrder[0].products.push(product);
          }
          this.httpService
            .putRequest(
              this.urlService.orderApiUrl,
              this.currentOrderId,
              this.currentUserOrder[0]
            )
            .subscribe();
        } else {
          const productArray: any[] = this.currentUserCart[0].products;
          const postBody: iOrder = {
            belongsTo: this.currentUserId,
            products: productArray,
          };
          this.orderService.storeUserOrderToDatabase(postBody).subscribe();
        }
        // After Ordering all the items
        alert('Items are Ordered Successfully');
        // Deleting Items From The Cart
        if (this.currentUserCart[0].id) {
          this.httpService
            .deleteRequest(
              this.urlService.cartApiUrl,
              this.currentUserCart[0].id
            )
            .subscribe((response) => {});
        }
        setTimeout(() => {
          this.subjectService.cartItemUpdateSubject.next(true);
          this.subjectService.cartEmptySubject.next(true);
        }, 800);
      }
    }, 1000);
    this.userOrderExists = false;
  }
  private checkUserInOrders() {
    for (let order of this.allOrderData) {
      if (order.belongsTo === this.currentUserId) {
        this.userOrderExists = true;
        this.currentOrderId = order.id;
        this.currentUserOrder[0] = order;
        break;
      }
    }
  }
}
