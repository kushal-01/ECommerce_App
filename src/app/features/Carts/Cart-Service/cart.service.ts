import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private subjectService: SubjectService,
    private route: Router,
    private httpService: HttpClientService,
    private urlService: UrlService
  ) {}
  storeUserCartToDatabase(postBody: iCart) {
    return this.httpService.postRequest(
      this.urlService.cartJsonApiUrl,
      postBody
    );
  }
  getCartList() {
    return this.httpService.getRequest(this.urlService.cartJsonApiUrl).pipe(
      map((data: any) => {
        const carts: any[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            carts.push({ ...data[key], id: key });
          }
        }
        return carts;
      })
    );
  }
  getSpecificUserCart(id: string | null) {
    return this.httpService.getRequest(
      this.urlService.cartApiUrl + '/' + id + '.json'
    );
  }
}
