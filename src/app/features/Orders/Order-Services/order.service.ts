import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { iCart } from 'src/app/data/Models/Carts Model/cart';
import { iOrder } from 'src/app/data/Models/Orders Model/order';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';
@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(
    private subjectService: SubjectService,
    private route: Router,
    private httpService: HttpClientService,
    private urlService: UrlService
  ) {}
  storeUserOrderToDatabase(postBody: iOrder) {
    return this.httpService.postRequest(
      this.urlService.orderJsonApiUrl,
      postBody
    );
  }
  getOrderList() {
    return this.httpService.getRequest(this.urlService.orderJsonApiUrl).pipe(
      map((data: any) => {
        const orders: any[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            orders.push({ ...data[key], id: key });
          }
        }
        return orders;
      })
    );
  }
  getSpecificUserOrder(id: string | null) {
    return this.httpService.getRequest(
      this.urlService.orderApiUrl + '/' + id + '.json'
    );
  }
}
