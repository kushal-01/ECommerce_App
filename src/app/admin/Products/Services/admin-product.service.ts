import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/data/Models/Product Model/product';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';
@Injectable({
  providedIn: 'root',
})
export class AdminProductService {
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
  updateSpecificProduct(productId: string | null, productData: Product) {
    return this.httpService.putRequest(
      this.urlService.productApiUrl + '/',
      productId,
      productData
    );
  }
}
