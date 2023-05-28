import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-category-navbar',
  templateUrl: './admin-category-navbar.component.html',
  styleUrls: ['./admin-category-navbar.component.css'],
})
export class AdminCategoryNavbarComponent {
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}
  public navigateToAddCategoryPage() {
    this.route.navigate(['admin/category-navbar/add-category']);
  }
  public navigateToCategoryListPage() {
    this.route.navigate(['admin/category-navbar/category-list']);
  }
}
