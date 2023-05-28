import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/data/Models/Product Model/product';
import { ProductServiceService } from 'src/app/features/Products/Services/product-service.service';
import { AdminProductService } from '../Services/admin-product.service';

@Component({
  selector: 'app-admin-product-details',
  templateUrl: './admin-product-details.component.html',
  styleUrls: ['./admin-product-details.component.css'],
})
export class AdminProductDetailsComponent {
  private productId: string | null = '';
  private singleProductDetails!: Product;
  public productThumbnail: string = '';
  public productBrand!: string;
  public productCategory!: string;
  public productDescription!: string;
  public productDiscountPercentage!: number;
  public productImages!: string[];
  public productPrice!: number;
  public productRating!: number;
  public productStock!: number;
  public productTitle!: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: AdminProductService
  ) {}
  ngOnInit(): void {
    // Getting the Route Parameter
    this.activatedRoute.paramMap.subscribe((value) => {
      this.productId = value.get('id');
      // Fetching the Product Details with Route Parameter Id
      this.productService
        .getSpecificProduct(this.productId)
        .subscribe((response: any) => {
          this.singleProductDetails = response;
          this.productThumbnail = this.singleProductDetails.thumbnail;
          this.productBrand = this.singleProductDetails.brand;
          this.productCategory = this.singleProductDetails.category;
          this.productDescription = this.singleProductDetails.description;
          this.productDiscountPercentage =
            this.singleProductDetails.discountPercentage;
          this.productImages = this.singleProductDetails.images;
          this.productPrice = this.singleProductDetails.price;
          this.productRating = this.singleProductDetails.rating;
          this.productStock = this.singleProductDetails.stock;
          this.productTitle = this.singleProductDetails.title;
        });
    });
  }
}
