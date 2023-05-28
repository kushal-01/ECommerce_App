import { Injectable } from '@angular/core';
import { map, Subject } from 'rxjs';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Injectable({
  providedIn: 'root',
})
export class ProductServiceService {
  public showByCategory!: boolean;
  public showBySubCategory!: boolean;
  public showBySearchValue!: boolean;
  constructor(
    private httpService: HttpClientService,
    private urlService: UrlService
  ) {}
  getProductList() {
    return this.httpService.getRequest(this.urlService.productJsonApiUrl).pipe(
      map((data: any) => {
        const products: any[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            products.push({ ...data[key], id: key });
          }
        }
        return products;
      })
    );
  }
  getSpecificProduct(id: string | null) {
    return this.httpService.getRequest(
      this.urlService.productApiUrl + '/' + id + '.json'
    );
  }
}
