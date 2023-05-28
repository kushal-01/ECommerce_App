import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { Product } from 'src/app/data/Models/Product Model/product';
import { iWishlist } from 'src/app/data/Models/Wishlist Model/wishlist';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { CartService } from '../../Carts/Cart-Service/cart.service';
import { WishlistService } from '../wishlist-service/wishlist.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';
@Component({
  selector: 'app-wishlist-list',
  templateUrl: './wishlist-list.component.html',
  styleUrls: ['./wishlist-list.component.css'],
})
export class WishlistListComponent {
  public isUserLoggedIn!: boolean;
  public currentUserId!: any;
  public allWishlistData: iWishlist[] = [];
  public currentUserWishlist: iWishlist[] = [];
  public showLoadingMessage: boolean = true;
  // Variables for Cart Related Functionality
  public allCartData: iCart[] = [];
  public userCartExists: boolean = false;
  public currentCartId!: any;
  public currentCart!: iCart;
  constructor(
    private subjectService: SubjectService,
    private wishlistService: WishlistService,
    private route: Router,
    private httpService: HttpClientService,
    private cartService: CartService,
    private urlService: UrlService
  ) {}
  ngOnInit() {
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
    // Getting WishList List Here
    this.wishlistService.getWishlistList().subscribe((response) => {
      this.allWishlistData = response;
      // Getting specific Wishlist of logged in User
      this.currentUserWishlist = this.allWishlistData.filter((wishlist) => {
        return wishlist.belongsTo === this.currentUserId;
      });
      this.showLoadingMessage = false;
    });
    // Checking if the whole Wishlist is emptied or not
    this.subjectService.wishlistEmptySubject.subscribe((response) => {
      if (response == true) {
        this.currentUserWishlist.length = 0;
      }
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
  public removeProductFromWishlist(currentProduct: Product, index: number) {
    const remove = confirm('Do You want to remove item from the Wishlist:');
    if (remove) {
      if (this.currentUserWishlist[0].products.length > 1) {
        this.currentUserWishlist[0].products.splice(index, 1);
        if (this.currentUserWishlist[0].id) {
          this.httpService
            .putRequest(
              this.urlService.wishlistApiUrl,
              this.currentUserWishlist[0].id,
              this.currentUserWishlist[0]
            )
            .subscribe();
        }
      } else {
        if (this.currentUserWishlist[0].id) {
          this.httpService
            .deleteRequest(
              this.urlService.wishlistApiUrl,
              this.currentUserWishlist[0].id
            )
            .subscribe();
          setTimeout(() => {
            this.subjectService.wishlistEmptySubject.next(true);
          }, 800);
        }
      }
      setTimeout(() => {
        this.subjectService.wishlistItemUpdateSubject.next(true);
      }, 800);
    }
  }
  public emptyWishlist() {
    const remove = confirm('Do You want to remove all item from the Wishlist:');
    if (remove) {
      if (this.currentUserWishlist[0].id) {
        this.httpService
          .deleteRequest(
            this.urlService.wishlistApiUrl,
            this.currentUserWishlist[0].id
          )
          .subscribe((response) => {});
      }
      setTimeout(() => {
        this.subjectService.wishlistItemUpdateSubject.next(true);
        this.subjectService.wishlistEmptySubject.next(true);
      }, 800);
    }
  }
  // Add Product To Cart  Related Logic
  public addProductToCart(product: Product) {
    if (this.isUserLoggedIn) {
      this.cartService.getCartList().subscribe((response) => {
        this.allCartData = response;
      });
      setTimeout(() => {
        this.checkUserInCart();
        if (this.userCartExists) {
          this.currentCart.products.push(product);
          this.httpService
            .putRequest(
              this.urlService.cartApiUrl,
              this.currentCartId,
              this.currentCart
            )
            .subscribe();
        } else {
          const productArray: any[] = [product];
          const postBody: iCart = {
            belongsTo: this.currentUserId,
            products: productArray,
          };
          this.cartService.storeUserCartToDatabase(postBody).subscribe();
        }
      }, 1000);
    } else {
      alert('Please Login First Before Adding To Cart ');
      this.route.navigate(['login']);
    }
    this.userCartExists = false;
    setTimeout(() => {
      this.subjectService.cartItemUpdateSubject.next(true);
    }, 2000);
  }
  private checkUserInCart() {
    for (let cart of this.allCartData) {
      if (cart.belongsTo === this.currentUserId) {
        this.userCartExists = true;
        this.currentCartId = cart.id;
        this.currentCart = cart;
        break;
      }
    }
  }
  public onViewDetailSelect(productId: string) {
    this.route.navigate(['products', productId]);
  }
}
