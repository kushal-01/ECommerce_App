import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iOrder } from 'src/app/data/Models/Orders Model/order';
import { Product } from 'src/app/data/Models/Product Model/product';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { CartService } from '../../Carts/Cart-Service/cart.service';
import { OrderService } from '../Order-Services/order.service';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css'],
})
export class OrderListComponent {
  public isUserLoggedIn!: boolean;
  public currentUserId!: any;
  public allOrderData: iOrder[] = [];
  public currentUserOrder: iOrder[] = [];
  public userOrderExists: boolean = false;
  public currentOrderId!: any;
  public showLoadingMessage: boolean = true;
  constructor(
    private subjectService: SubjectService,
    private cartService: CartService,
    private route: Router,
    private httpService: HttpClientService,
    private orderService: OrderService
  ) {}
  ngOnInit() {
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
    // Getting Order List Here
    this.orderService.getOrderList().subscribe((response) => {
      this.allOrderData = response;
      // Getting specific Orders of logged in User
      this.currentUserOrder = this.allOrderData.filter((order) => {
        return order.belongsTo === this.currentUserId;
      });
      this.showLoadingMessage = false;
    });
  }
  ngDoCheck() {
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
  }
  // Method for Viewing Details of Product
  public onViewDetailSelect(productId: string) {
    this.route.navigate(['products', productId]);
  }
  public navigateToLoginPage() {
    this.route.navigate(['login']);
  }
}
