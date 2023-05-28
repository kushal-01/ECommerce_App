import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { iWishlist } from 'src/app/data/Models/Wishlist Model/wishlist';
import { CartService } from 'src/app/features/Carts/Cart-Service/cart.service';
import { ProductServiceService } from 'src/app/features/Products/Services/product-service.service';
import { WishlistService } from 'src/app/features/Wishlist/wishlist-service/wishlist.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.css'],
})
export class NavigationBarComponent {
  public userIsLoggedIn: boolean = false;
  public userName: string = 'User';
  // Variables related to Cart Functionality in Navigation bar
  public totalCartItem: number = 0;
  public allCartData: iCart[] = [];
  public currentCart: iCart[] = [];
  public currentUserId!: string;
  // Variables related to Wishlist Functionality in Navigation bar
  public totalWishlistItem: number = 0;
  public allWishlistData: iWishlist[] = [];
  public currentUserWishlist: iWishlist[] = [];
  constructor(
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductServiceService,
    private subjectService: SubjectService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}
  ngOnInit(): void {
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.userIsLoggedIn = response;
      if (!this.userIsLoggedIn) {
        this.totalCartItem = 0;
        this.totalWishlistItem = 0;
      }
    });
    this.subjectService.userNameSubject.subscribe((response: any) => {
      this.userName = response;
    });
    this.subjectService.userIdSubject.subscribe((response: any) => {
      this.currentUserId = response;
    });
    // Getting cart Data to Show Total Cart Items in cart Link
    this.cartService.getCartList().subscribe((response) => {
      this.allCartData = response;

      // Getting specific cart of logged in User
      this.currentCart = this.allCartData.filter((cart) => {
        return cart.belongsTo === this.currentUserId;
      });
      this.totalCartItem = this.currentCart[0].products.length;
    });
    // Checking if the Cart Item is Updated
    this.subjectService.getCartItemUpdate().subscribe((response) => {
      // Getting cart Data to Show in cart Link
      this.cartService.getCartList().subscribe((response) => {
        this.allCartData = response;
        // Getting specific cart of logged in User
        this.currentCart = this.allCartData.filter((cart) => {
          return cart.belongsTo === this.currentUserId;
        });
        setTimeout(() => {
          if (this.currentCart.length > 0) {
            this.totalCartItem = this.currentCart[0].products.length;
          } else {
            this.totalCartItem = 0;
          }
        }, 1000);
      });
    });
    // Getting Wishlist Data to Show total Wishlist data in Wishlist Link
    this.wishlistService.getWishlistList().subscribe((response) => {
      this.allWishlistData = response;
      // Getting specific Wishlist of logged in User
      this.currentUserWishlist = this.allWishlistData.filter((wishlist) => {
        return wishlist.belongsTo === this.currentUserId;
      });
      this.totalWishlistItem = this.currentUserWishlist[0].products.length;
    });
    // Checking if the Wishlist Item is Updated
    this.subjectService.getWishlistItemUpdate().subscribe((response) => {
      // Getting Wishlist Data to Show total Wishlist data in Wishlist Link
      this.wishlistService.getWishlistList().subscribe((response) => {
        this.allWishlistData = response;
        // Getting specific Wishlist of logged in User
        this.currentUserWishlist = this.allWishlistData.filter((wishlist) => {
          return wishlist.belongsTo === this.currentUserId;
        });
        setTimeout(() => {
          if (this.currentUserWishlist.length > 0) {
            this.totalWishlistItem =
              this.currentUserWishlist[0].products.length;
          } else {
            this.totalWishlistItem = 0;
          }
        }, 1000);
      });
    });
  }
  public navigateToLoginPage() {
    this.route.navigate(['login']);
  }
  public onSearch(searchForm: NgForm) {
    this.productService.showBySearchValue = true;
    this.subjectService.showPriceFilter.next(true);
    this.subjectService.showPagination.next(true);
    this.route.navigate(['products'], {
      relativeTo: this.activatedRoute,
      queryParams: { searchValue: searchForm.value['searchValue'] },
    });
  }
  public navigateToHomePage() {
    this.route.navigate(['home-page']);
  }
  public onLogout() {
    this.subjectService.cartItemUpdateSubject.next(true);
    this.subjectService.wishlistItemUpdateSubject.next(true);
    this.subjectService.userEmailSubject.next(null);
    this.subjectService.userLoggedIn.next(false);
    this.subjectService.userIdSubject.next(null);
    this.subjectService.userNameSubject.next('User');
    localStorage.removeItem('user');
    localStorage.removeItem('user-data');
  }
  public navigateToCartList() {
    this.route.navigate(['cart-list']);
  }
  public navigateToWishList() {
    this.route.navigate(['wish-list']);
  }
  public navigateToOrderList() {
    this.route.navigate(['order-list']);
  }
}
