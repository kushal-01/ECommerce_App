import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-product-navbar',
  templateUrl: './admin-product-navbar.component.html',
  styleUrls: ['./admin-product-navbar.component.css'],
})
export class AdminProductNavbarComponent {
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}
  public navigateToAddProductPage() {
    this.route.navigate(['admin/product-navbar/add-product']);
  }
  public navigateToProductListPage() {
    this.route.navigate(['admin/product-navbar/product-list']);
  }
}
