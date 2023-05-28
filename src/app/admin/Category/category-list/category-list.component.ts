import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Category } from 'src/app/data/Models/Categories Model/category';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent {
  public categoryListData: Category[] = [];
  public showSpinner: boolean = true;
  constructor(
    private httpService: HttpClientService,
    private subjectService: SubjectService,
    private route: Router,
    private urlService: UrlService
  ) {}
  ngOnInit() {
    this.getCategoryList();
  }
  // Getting Category List Here
  private getCategoryList() {
    this.httpService
      .getRequest(this.urlService.categoryJsonApiUrl)
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
        this.categoryListData = response;
        this.showSpinner = false;
      });
  }
  public onEditCategorySelect(categoryId: string | undefined) {
    this.subjectService.categoryUpdateButtonSubject.next(true);
    this.route.navigate(['admin/category-navbar/add-category'], {
      queryParams: { id: categoryId },
    });
  }
}
