import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  adminSubject = new BehaviorSubject<boolean>(false);
  categoryUpdateButtonSubject = new BehaviorSubject<boolean>(false);
  productUpdateButtonSubject = new BehaviorSubject<boolean>(false);
  // Subjects related to user authentication
  userLoggedIn = new BehaviorSubject<boolean>(false);
  userEmailSubject = new BehaviorSubject<string | null>(null);
  userIdSubject = new BehaviorSubject<string | null | undefined>(null);
  userNameSubject = new BehaviorSubject<string | null>('User');
  // Subject Related to Cart
  cartItemUpdateSubject = new BehaviorSubject<boolean>(false);
  public getCartItemUpdate() {
    return this.cartItemUpdateSubject.asObservable();
  }
  cartEmptySubject = new Subject<boolean>();
  // Subject Related to Wishlist
  wishlistItemUpdateSubject = new BehaviorSubject<boolean>(false);
  public getWishlistItemUpdate() {
    return this.wishlistItemUpdateSubject.asObservable();
  }
  wishlistEmptySubject = new Subject<boolean>();
  // Subject for Pagination and Price Filter
  showPriceFilter = new BehaviorSubject<boolean>(true);
  showPagination = new BehaviorSubject<boolean>(true);
}
