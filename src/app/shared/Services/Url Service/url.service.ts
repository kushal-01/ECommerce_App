import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  // Api Related to User Data
  userJsonApiUrl: string =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Users.json';
  userApiUrl = 'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Users';
  // Api related to Firebase authentication
  registerFirebaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA4FVDIbzy5W8rn5bVnDs3VY49gHSg_SGY';
  loginFirebaseUrl: string =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA4FVDIbzy5W8rn5bVnDs3VY49gHSg_SGY';
  // Api Related to Wishlist Data
  wishlistJsonApiUrl: string =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Wishlists.json';
  wishlistApiUrl =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Wishlists';
  // Api Related to Cart Data
  cartJsonApiUrl: string =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Carts.json';
  cartApiUrl = 'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Carts';
  // Api related to Orders Data
  orderJsonApiUrl: string =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Orders.json';
  orderApiUrl = 'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Orders';
  // Api related to Products Data
  productJsonApiUrl: string =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Products.json';
  productApiUrl =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Products';
  // Api related to Categories Data
  categoryJsonApiUrl: string =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Category.json';
  categoryApiUrl =
    'https://e-commerce-fbc49-default-rtdb.firebaseio.com/Category';
}
