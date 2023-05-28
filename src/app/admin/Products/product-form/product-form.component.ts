import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Category } from 'src/app/data/Models/Categories Model/category';
import { Product } from 'src/app/data/Models/Product Model/product';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { AdminProductService } from '../Services/admin-product.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
})
export class ProductFormComponent {
  public productForm!: FormGroup;
  public showAddMessage: boolean = false;
  // Variables for Setting the Select Controls Of Add Product Form
  public categoryListData: Category[] = [];
  public filteredSubcategory: any[] = [];
  private currentCategory!: any;
  public selectedCategory: string = '';
  public selectedSubCategory: string = '';
  // Variables for image upload
  public thumbnailFileSelection!: File;
  public thumbnailBase64String!: any;
  public showThumbnailUploadMessage: boolean = false;
  public imageFileSelection!: File;
  public imageBase64String!: any;
  public showImageUploadMessage: boolean = false;
  // Variables for Edit Functionality
  private productId: string = '';
  private currentProduct!: Product;
  public showUpdateMessage!: boolean;
  public showUpdateButton!: boolean;
  public earlierThumbnailString!: string;
  public earlierImageString!: string[] | string;
  constructor(
    private httpService: HttpClientService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private subjectService: SubjectService,
    private adminProductService: AdminProductService,
    private urlService: UrlService
  ) {}
  ngOnInit(): void {
    this.getCategoryList();
    this.createProductForm();
    // Getting productId from Query parameter
    this.activatedRoute.queryParamMap.subscribe((response) => {
      const value = response.get('id');
      if (value != null) {
        this.productId = value;
      }
    });
    // Getting Specific Product Details and Setting its Values to product Form.
    this.subjectService.productUpdateButtonSubject.subscribe((response) => {
      this.showUpdateButton = response;
      this.adminProductService
        .getSpecificProduct(this.productId)
        .subscribe((response: any) => {
          this.currentProduct = response;
          this.populateProductForm(this.currentProduct);
        });
    });
  }
  private createProductForm() {
    this.productForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      subcategory: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      rating: new FormControl('', [Validators.required]),
      discountPercentage: new FormControl('', [Validators.required]),
      id: new FormControl('', [Validators.required]),
      stock: new FormControl('', [Validators.required]),
      images: new FormControl('', [Validators.required]),
      thumbnail: new FormControl('', [Validators.required]),
    });
  }
  // Methods for Getting Categories From Database and Displaying To Select Input.
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
      });
  }
  // Method to populate Subcategory Select input when A Category Is Selected
  public onCategoryChange() {
    this.currentCategory = this.categoryListData.filter(
      (category) => category.name === this.selectedCategory
    );
    this.filteredSubcategory = this.currentCategory[0].subcategories;
  }
  public onThumbnailFileSelected(event: any) {
    this.showThumbnailUploadMessage = true;
    this.thumbnailFileSelection = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.thumbnailFileSelection);
    reader.onload = () => {
      this.thumbnailBase64String = reader.result as string;
    };
    setTimeout(() => {
      this.showThumbnailUploadMessage = false;
    }, 1500);
  }
  public onImageFileSelected(event: any) {
    this.showImageUploadMessage = true;
    this.imageFileSelection = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.imageFileSelection);
    reader.onload = () => {
      this.imageBase64String = reader.result as string;
    };
    setTimeout(() => {
      this.showImageUploadMessage = false;
    }, 1500);
  }
  private postProductDataToDatabase() {
    this.productForm.value.thumbnail = this.thumbnailBase64String;
    this.productForm.value.images = this.imageBase64String;
    this.httpService
      .postRequest(this.urlService.productJsonApiUrl, this.productForm.value)
      .subscribe();
  }
  public onSubmit() {
    this.postProductDataToDatabase();
    this.showAddMessage = true;
    setTimeout(() => {
      this.showAddMessage = false;
    }, 2000);
    this.productForm.reset();
  }
  private populateProductForm(currentProduct: Product) {
    // Storing already existed Thumbnail
    this.earlierThumbnailString = currentProduct.thumbnail;
    // Storing already existed Image
    if (currentProduct.images.length > 200) {
      this.earlierImageString = currentProduct.images;
    } else if (currentProduct.images.length > 1) {
      this.earlierImageString = currentProduct.images[0];
    }
    this.productForm.patchValue({
      title: currentProduct.title,
      description: currentProduct.description,
      brand: currentProduct.brand,
      category: currentProduct.category,
      price: currentProduct.price,
      rating: currentProduct.rating,
      discountPercentage: currentProduct.discountPercentage,
      id: currentProduct.id,
      stock: currentProduct.stock,
    });
    this.currentCategory = currentProduct.category;
    setTimeout(() => {
      this.onCategoryChange();
    }, 1000);
    this.productForm.patchValue({
      subcategory: currentProduct.subcategory,
    });
  }
  public updateProductInDatabase() {
    let confirmation = confirm('Do You want to Update the Products');
    if (confirmation) {
      // Logic Related to Edit Image and Thumbnail
      if (this.thumbnailBase64String == undefined) {
        this.productForm.value.thumbnail = this.earlierThumbnailString;
      } else {
        this.productForm.value.thumbnail = this.thumbnailBase64String;
      }
      if (this.imageBase64String == undefined) {
        this.productForm.value.images = this.earlierImageString;
      } else {
        this.productForm.value.images = this.imageBase64String;
      }
      this.adminProductService
        .updateSpecificProduct(this.productId, this.productForm.value)
        .subscribe();
      this.showUpdateMessage = true;
      setTimeout(() => {
        this.showUpdateMessage = false;
      }, 2000);
      this.productForm.reset();
      this.subjectService.productUpdateButtonSubject.next(false);
      setTimeout(() => {
        this.route.navigate(['admin/product-navbar/product-list']);
      }, 500);
    }
  }
  ngOnDestroy() {
    this.subjectService.productUpdateButtonSubject.next(false);
  }
}
