import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-home-navigation-bar',
  templateUrl: './admin-home-navigation-bar.component.html',
  styleUrls: ['./admin-home-navigation-bar.component.css'],
})
export class AdminHomeNavigationBarComponent {
  constructor(private route: Router, private activatedRoute: ActivatedRoute) {}
  public navigateToShowUsersPage() {
    this.route.navigate(['user-list'], { relativeTo: this.activatedRoute });
  }
  public navigateToAdminHomePage() {
    this.route.navigate(['admin/home']);
  }
  public navigateToCategoryPage() {
    this.route.navigate(['admin/category-navbar']);
  }
  public navigateToProductPage() {
    this.route.navigate(['admin/product-navbar']);
  }
  public navigateToOrderPage() {
    this.route.navigate(['admin/admin-order-list']);
  }
  public onLogout() {
    localStorage.removeItem('isAdmin');
    this.route.navigate(['admin-auth']);
  }
}
