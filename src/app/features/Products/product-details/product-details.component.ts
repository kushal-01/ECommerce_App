import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/data/Models/Product Model/product';
import { ProductServiceService } from '../Services/product-service.service';
import { TextBlueDirective } from 'src/app/shared/Directives/Text-Color Directive/text-blue.directive';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { CartService } from '../../Carts/Cart-Service/cart.service';
import { WishlistService } from '../../Wishlist/wishlist-service/wishlist.service';
import { iWishlist } from 'src/app/data/Models/Wishlist Model/wishlist';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  private productId: string | null = '';
  public singleProductDetails!: Product;
  public productThumbnail: string = '';
  public productBrand!: string;
  public productCategory!: string;
  public productDescription!: string;
  public productDiscountPercentage!: number;
  public productImages!: string[];
  public productPrice!: number;
  public productRating!: number;
  public productStock!: number;
  public productTitle!: string;
  private allProductList: Product[] = [];
  public similarProducts: Product[] | undefined = [];
  public productNotExist: boolean = false;
  public showSpinner: boolean = true;
  // Variables for Cart Related Functionality
  public isUserLoggedIn!: boolean;
  public currentUserId!: any;
  public allCartData: iCart[] = [];
  public userCartExists: boolean = false;
  public currentUserCartId!: any;
  public currentUserCart!: iCart;
  // Variables for Wishlist Related Functionality
  public allWishlistData: iWishlist[] = [];
  public userWishlistExists: boolean = false;
  public currentUserWishlistId!: any;
  public currentUserWishlist!: iWishlist;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductServiceService,
    private route: Router,
    private cartService: CartService,
    private subjectService: SubjectService,
    private httpService: HttpClientService,
    private wishlistService: WishlistService,
    private urlService: UrlService
  ) {}
  ngOnInit(): void {
    // Getting the Route Parameter
    this.activatedRoute.paramMap.subscribe((value) => {
      this.productId = value.get('id');
      // Fetching the Product Details with Route Parameter Id
      this.productService
        .getSpecificProduct(this.productId)
        .subscribe((response: any) => {
          this.singleProductDetails = response;
          setTimeout(() => {
            if (this.singleProductDetails == undefined) {
              this.productNotExist = true;
            }
          }, 1000);
          this.productThumbnail = this.singleProductDetails.thumbnail;
          this.productBrand = this.singleProductDetails.brand;
          this.productCategory = this.singleProductDetails.category;
          this.productDescription = this.singleProductDetails.description;
          this.productDiscountPercentage =
            this.singleProductDetails.discountPercentage;
          this.productImages = this.singleProductDetails.images;
          this.productPrice = this.singleProductDetails.price;
          this.productRating = this.singleProductDetails.rating;
          this.productStock = this.singleProductDetails.stock;
          this.productTitle = this.singleProductDetails.title;
        });
    });
    this.productService.getProductList().subscribe((response) => {
      this.allProductList = response;
      this.getSimilarProducts();
    });
    // Add To Cart  Related Logic
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
    // Getting Wishlist List Here
    this.wishlistService.getWishlistList().subscribe((response) => {
      this.allWishlistData = response;
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
  private getSimilarProducts() {
    setTimeout(() => {
      this.similarProducts = this.allProductList.filter((product: any) => {
        return product.category.includes(this.productCategory);
      });
      this.similarProducts = this.similarProducts.slice(0, 5);
      this.showSpinner = false;
    }, 1000);
  }
  public onViewDetailSelect(productId: string) {
    this.route.navigate(['products', productId]);
    window.scrollTo(0, 0);
  }
  // Methods Related To Add To Cart Functionality
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
              this.currentUserCartId,
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
        this.currentUserCartId = cart.id;
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
}
