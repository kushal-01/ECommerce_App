import { compileNgModule } from '@angular/compiler';
import {
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { Product } from 'src/app/data/Models/Product Model/product';
import { iWishlist } from 'src/app/data/Models/Wishlist Model/wishlist';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { CartService } from '../../Carts/Cart-Service/cart.service';
import { WishlistService } from '../../Wishlist/wishlist-service/wishlist.service';
import { ProductServiceService } from '../Services/product-service.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, DoCheck {
  public allProductData: Product[] = [];
  private categoryName!: string | null;
  public showByCategory: boolean = false;
  public productDataByCategory: Product[] = [];
  public showLoadingMessage: boolean = false;
  public showPriceFilter!: boolean;
  public showPagination!: boolean;
  // Variables For Subcategories Showing
  public productDataBySubCategory: Product[] = [];
  private subCategoryName!: string | null;
  public showBySubCategory: boolean = false;
  // Variables For Showing Products By Search Value
  public productDataBySearchValue: Product[] = [];
  private searchValue!: string;
  public showBySearchValue: boolean = false;
  // Variables for Cart Related Functionality
  public isUserLoggedIn!: boolean;
  public currentUserId!: any;
  public allCartData: iCart[] = [];
  public userCartExists: boolean = false;
  public currentCartId!: any;
  public currentUserCart!: iCart;
  // Variables for Wishlist Related Functionality
  public allWishlistData: iWishlist[] = [];
  public userWishlistExists: boolean = false;
  public currentUserWishlistId!: any;
  public currentUserWishlist!: iWishlist;
  // Variables for Filter Functionality
  @ViewChild('selectMenu') selectedFilter!: ElementRef;
  public defaultAllProductData: Product[] = [];
  //Variables related to Pagination Functionality
  page: number = 1;
  count: number = 0;
  tableSize: number = 9;
  constructor(
    private productService: ProductServiceService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private cartService: CartService,
    private subjectService: SubjectService,
    private httpService: HttpClientService,
    private wishlistService: WishlistService,
    private urlService: UrlService
  ) {}
  ngOnInit() {
    // Subscribing to the show Price filter and show Pagination
    this.subjectService.showPriceFilter.subscribe((response) => {
      this.showPriceFilter = response;
    });
    this.subjectService.showPagination.subscribe((response) => {
      this.showPagination = response;
    });
    this.showLoadingMessage = true;
    this.productService.getProductList().subscribe((response) => {
      this.allProductData = response;
      this.showByCategory = this.productService.showByCategory;
      this.showLoadingMessage = false;
    });
    // Getting the Category Name if the category Icon is Clicked through Query Parameters
    this.activatedRoute.queryParamMap.subscribe((response) => {
      this.page = 1;
      this.categoryName = response.get('category');
      this.showByCategory = this.productService.showByCategory;
      if (
        response.get('category') &&
        (this.productDataByCategory.length == 0 ||
          this.productDataByCategory.length == 1)
      ) {
        this.subjectService.showPriceFilter.next(false);
        this.subjectService.showPagination.next(false);
      }
    });
    // Getting the SubCategory Name if the subcategory Icon is Clicked through Query Parameters
    this.activatedRoute.queryParamMap.subscribe((response) => {
      this.page = 1;
      this.subCategoryName = response.get('subcategory');
      this.showBySubCategory = this.productService.showBySubCategory;
      if (
        response.get('subcategory') &&
        (this.productDataBySubCategory.length == 0 ||
          this.productDataBySubCategory.length == 1)
      ) {
        this.subjectService.showPriceFilter.next(false);
        this.subjectService.showPagination.next(false);
      }
    });
    // Getting the Search Value if the Search Icon is Clicked through Query Parameters
    this.activatedRoute.queryParamMap.subscribe((response) => {
      this.page = 1;
      if (response.get('searchValue') != null) {
        const value = response.get('searchValue');
        this.searchValue = value || '';
      }
      this.showBySearchValue = this.productService.showBySearchValue;
      if (response.get('searchValue') == null) {
        this.showBySearchValue = false;
      }
      if (response.get('searchValue') == '') {
        this.subjectService.showPriceFilter.next(false);
        this.subjectService.showPagination.next(false);
      }
      if (
        response.get('searchValue') &&
        (this.productDataBySearchValue.length == 0 ||
          this.productDataBySearchValue.length == 1)
      ) {
        this.subjectService.showPriceFilter.next(false);
        this.subjectService.showPagination.next(false);
      }
    });
    //Add To Cart Cart and User Authentication Related Logic
    // Checking if the user is logged in or not
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
    // Getting Cart List Here
    this.cartService.getCartList().subscribe((response) => {
      this.allCartData = response;
    });
    // Add To Wishlist  Related Logic
    // Getting Wishlist List Here
    this.wishlistService.getWishlistList().subscribe((response) => {
      this.allWishlistData = response;
    });
  }
  ngDoCheck() {
    this.searchByCategory();
    this.searchBySubCategory();
    this.searchBySearchValue();
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
  }
  public onViewDetailSelect(productId: string) {
    this.route.navigate(['products', productId]);
  }
  private searchByCategory() {
    // this.subjectService.showPriceFilter.next(true);
    // this.subjectService.showPagination.next(true);
    this.productDataByCategory = this.allProductData.filter((product) => {
      return product.category === this.categoryName;
    });
    this.subjectService.showPriceFilter.next(true);
    this.subjectService.showPagination.next(true);
    if (this.showByCategory && this.productDataByCategory.length <= 1) {
      this.subjectService.showPriceFilter.next(false);
      this.subjectService.showPagination.next(false);
    }
  }
  private searchBySubCategory() {
    // this.subjectService.showPriceFilter.next(true);
    // this.subjectService.showPagination.next(true);
    this.productDataBySubCategory = this.allProductData.filter((product) => {
      return product.subcategory === this.subCategoryName;
    });
    this.subjectService.showPriceFilter.next(true);
    this.subjectService.showPagination.next(true);
    if (this.showBySubCategory && this.productDataBySubCategory.length <= 1) {
      this.subjectService.showPriceFilter.next(false);
      this.subjectService.showPagination.next(false);
    }
  }
  private searchBySearchValue() {
    if (this.searchValue != '') {
      this.productDataBySearchValue = this.allProductData.filter((product) => {
        return (
          product.subcategory.toLowerCase().trim().includes(this.searchValue) ||
          product.category.toLowerCase().trim().includes(this.searchValue) ||
          product.title.toLowerCase().trim().includes(this.searchValue)
        );
      });
      if (this.showBySearchValue) {
        this.subjectService.showPriceFilter.next(true);
        this.subjectService.showPagination.next(true);
      }
      if (this.showBySearchValue && this.productDataBySearchValue.length <= 1) {
        this.subjectService.showPriceFilter.next(false);
        this.subjectService.showPagination.next(false);
      }
    }
  }
  // Methods related to Add To Cart Functionality
  public onAddToCart(product: Product) {
    if (this.isUserLoggedIn) {
      this.cartService.getCartList().subscribe((response) => {
        this.allCartData = response;
      });
      setTimeout(() => {
        this.checkUserInCart();
        if (this.userCartExists) {
          this.currentUserCart.products.push(product);
          this.httpService
            .putRequest(
              this.urlService.cartApiUrl,
              this.currentCartId,
              this.currentUserCart
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
        this.currentUserCart = cart;
        break;
      }
    }
  }
  // Methods related to Add To Wishlist Functionality
  public onAddToWishlist(product: Product) {
    if (this.isUserLoggedIn) {
      this.wishlistService.getWishlistList().subscribe((response) => {
        this.allWishlistData = response;
      });
      setTimeout(() => {
        this.checkUserInWishlist();
        if (this.userWishlistExists) {
          this.currentUserWishlist.products.push(product);
          this.httpService
            .putRequest(
              this.urlService.wishlistApiUrl,
              this.currentUserWishlistId,
              this.currentUserWishlist
            )
            .subscribe();
        } else {
          const productArray: any[] = [product];
          const postBody: iWishlist = {
            belongsTo: this.currentUserId,
            products: productArray,
          };
          this.wishlistService
            .storeUserWishlistToDatabase(postBody)
            .subscribe();
        }
      }, 1000);
    } else {
      alert('Please Login First Before Adding To Wishlist ');
      this.route.navigate(['login']);
    }
    this.userWishlistExists = false;
    setTimeout(() => {
      this.subjectService.wishlistItemUpdateSubject.next(true);
    }, 2000);
  }
  private checkUserInWishlist() {
    for (let wishlist of this.allWishlistData) {
      if (wishlist.belongsTo === this.currentUserId) {
        this.userWishlistExists = true;
        this.currentUserWishlistId = wishlist.id;
        this.currentUserWishlist = wishlist;
        break;
      }
    }
  }
  // Methods related to Filter Functionality
  public onFilterChange() {
    this.sortProducts(this.selectedFilter.nativeElement.value);
  }
  private sortProducts(order: string) {
    if (order === 'Low To High') {
      this.allProductData.sort((a, b) => a.price - b.price);
    } else if (order === 'High To Low') {
      this.allProductData.sort((a, b) => b.price - a.price);
    } else {
      this.productService.getProductList().subscribe((response) => {
        this.allProductData = response;
      });
    }
  }
  public onTableDataChange(event: any) {
    this.page = event;
    window.scrollTo(0, 0);
  }
}
