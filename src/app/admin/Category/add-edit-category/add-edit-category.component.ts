import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/data/Models/Categories Model/category';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css'],
})
export class AddEditCategoryComponent {
  public categoryForm!: FormGroup;
  public showAddMessage: boolean = false;
  // Variables for Edit Functionality
  private categoryId: string | null = '';
  public showUpdateMessage!: boolean;
  public showUpdateButton!: boolean;
  private currentCategory!: Category;
  constructor(
    private httpService: HttpClientService,
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private urlService: UrlService
  ) {}
  ngOnInit() {
    // Category Form
    this.categoryForm = new FormGroup({
      name: new FormControl('', Validators.required),
      subcategories: new FormArray([]),
    });
    // Getting categoryId from Query parameter
    this.activatedRoute.queryParamMap.subscribe((response) => {
      this.categoryId = response.get('id');
    });
    this.subjectService.categoryUpdateButtonSubject.subscribe((response) => {
      this.showUpdateButton = response;
      this.getSpecificCategoryDetails(this.categoryId);
    });
  }
  // Function Related To Subcategory Form Array
  public onAddSubcategorySelect() {
    const control = new FormControl('', Validators.required);
    (<FormArray>this.categoryForm.get('subcategories')).push(control);
    return <FormArray>this.categoryForm.get('subcategories');
  }
  public removeSpecificSubcategory(index: number) {
    (<FormArray>this.categoryForm.get('subcategories')).removeAt(index);
  }
  get controls() {
    return (this.categoryForm.get('subcategories') as FormArray).controls;
  }
  // Post Function For Adding Category To Database
  private postCategoryDataToDatabase() {
    this.httpService
      .postRequest(this.urlService.categoryJsonApiUrl, this.categoryForm.value)
      .subscribe();
  }
  // Submit Function For Form
  public onSubmit() {
    this.postCategoryDataToDatabase();
    this.showAddMessage = true;
    setTimeout(() => {
      this.showAddMessage = false;
    }, 2000);
    this.categoryForm.reset();
    (<FormArray>this.categoryForm.get('subcategories')).clear();
  }
  // Getting Single Category Details according to Id from database
  private getSpecificCategoryDetails(id: string | null) {
    this.httpService
      .getRequest(this.urlService.categoryApiUrl + '/' + id + '.json')
      .subscribe((response: any) => {
        this.currentCategory = response;
        this.categoryForm.patchValue({
          name: this.currentCategory.name,
        });
        const subcategories = this.categoryForm.get(
          'subcategories'
        ) as FormArray;
        this.currentCategory.subcategories.forEach((subcategory) => {
          subcategories.push(new FormControl(subcategory));
        });
      });
  }
  // Put Function For Updating Category To Database
  public updateCategoryInDatabase() {
    let confirmation = confirm('Do You want to Update the Category');
    if (confirmation) {
      this.httpService
        .putRequest(
          this.urlService.categoryApiUrl + '/',
          this.categoryId,
          this.categoryForm.value
        )
        .subscribe();
      this.showUpdateMessage = true;
      setTimeout(() => {
        this.showUpdateMessage = false;
      }, 2000);
      this.categoryForm.reset();
      (<FormArray>this.categoryForm.get('subcategories')).clear();
      this.subjectService.categoryUpdateButtonSubject.next(false);
      setTimeout(() => {
        this.route.navigate(['admin/category-navbar/category-list']);
      }, 500);
    }
  }
  ngOnDestroy() {
    this.subjectService.categoryUpdateButtonSubject.next(false);
  }
}
