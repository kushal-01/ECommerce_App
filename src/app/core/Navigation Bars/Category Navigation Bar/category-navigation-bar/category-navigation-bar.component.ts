import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Category } from 'src/app/data/Models/Categories Model/category';
import { ProductServiceService } from 'src/app/features/Products/Services/product-service.service';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Component({
  selector: 'app-category-navigation-bar',
  templateUrl: './category-navigation-bar.component.html',
  styleUrls: ['./category-navigation-bar.component.css'],
})
export class CategoryNavigationBarComponent {
  public categoryList: Category[] = [];
  constructor(
    private httpService: HttpClientService,
    private route: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductServiceService,
    private urlservice: UrlService,
    private subjectService: SubjectService
  ) {}
  ngOnInit() {
    this.getCategoryList();
  }
  // Navigating to Product List Component Via AllProducts
  public navigateToProductList() {
    this.subjectService.showPriceFilter.next(true);
    this.subjectService.showPagination.next(true);
    this.productService.showByCategory = false;
    this.productService.showBySubCategory = false;
    this.productService.showBySearchValue = false;
    this.route.navigate(['products']);
  }
  // Navigating to Product List Component Via Category Name
  public navigateToProductListByCategory(categoryName: string) {
    this.subjectService.showPriceFilter.next(true);
    this.subjectService.showPagination.next(true);
    this.productService.showByCategory = true;
    this.route.navigate(['products'], {
      relativeTo: this.activatedRoute,
      queryParams: { category: categoryName },
    });
  }
  // Navigating to Product List Component Via SubCategory Name
  public navigateToProductListBySubCategory(subCategoryName: string) {
    this.subjectService.showPriceFilter.next(true);
    this.subjectService.showPagination.next(true);
    this.productService.showBySubCategory = true;
    this.route.navigate(['products'], {
      relativeTo: this.activatedRoute,
      queryParams: { subcategory: subCategoryName },
    });
  }
  // Getting Category List Here
  private getCategoryList() {
    this.httpService
      .getRequest(this.urlservice.categoryJsonApiUrl)
      .pipe(
        map((data: any) => {
          const categories: any[] = [];
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              categories.push({ ...data[key], id: key });
            }
          }
          return categories;
        })
      )
      .subscribe((response) => {
        this.categoryList = response;
      });
  }
}
