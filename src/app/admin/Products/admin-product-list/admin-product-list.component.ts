import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/data/Models/Product Model/product';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { AdminProductService } from '../Services/admin-product.service';

@Component({
  selector: 'app-admin-product-list',
  templateUrl: './admin-product-list.component.html',
  styleUrls: ['./admin-product-list.component.css'],
})
export class AdminProductListComponent {
  public showMessage: boolean = true;
  public allProducts: Product[] = [];
  private specificProduct!: Product;
  public showSpinner: boolean = false;
  constructor(
    private adminProductService: AdminProductService,
    private subjectService: SubjectService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAllProductData();
  }
  private getAllProductData() {
    this.showMessage = false;
    this.showSpinner = true;
    this.adminProductService.getProductList().subscribe((response) => {
      this.allProducts = response;
      this.showSpinner = false;
    });
  }
  public navigateToProductDetails(productId: string | undefined) {
    this.route.navigate(['admin/product-navbar/product-details', productId]);
  }
  public onEditProduct(productId: string | undefined) {
    this.subjectService.productUpdateButtonSubject.next(true);
    this.route.navigate(['admin/product-navbar/add-product'], {
      queryParams: { id: productId },
    });
  }
}
