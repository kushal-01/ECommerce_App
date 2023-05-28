import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { iWishlist } from 'src/app/data/Models/Wishlist Model/wishlist';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  constructor(
    private subjectService: SubjectService,
    private route: Router,
    private httpService: HttpClientService,
    private urlService: UrlService
  ) {}
  storeUserWishlistToDatabase(postBody: iWishlist) {
    return this.httpService.postRequest(
      this.urlService.wishlistJsonApiUrl,
      postBody
    );
  }
  getWishlistList() {
    return this.httpService.getRequest(this.urlService.wishlistJsonApiUrl).pipe(
      map((data: any) => {
        const wishlists: any[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            wishlists.push({ ...data[key], id: key });
          }
        }
        return wishlists;
      })
    );
  }
  getSpecificUserWishlist(id: string | null) {
    return this.httpService.getRequest(
      this.urlService.wishlistApiUrl + '/' + id + '.json'
    );
  }
}
