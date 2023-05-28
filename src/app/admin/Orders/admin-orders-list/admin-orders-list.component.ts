import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { iOrder } from 'src/app/data/Models/Orders Model/order';
import { User } from 'src/app/data/Models/Users Model/user';
import { CartService } from 'src/app/features/Carts/Cart-Service/cart.service';
import { OrderService } from 'src/app/features/Orders/Order-Services/order.service';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UserDataService } from '../../Users/User-Services/user-data.service';

@Component({
  selector: 'app-admin-orders-list',
  templateUrl: './admin-orders-list.component.html',
  styleUrls: ['./admin-orders-list.component.css'],
})
export class AdminOrdersListComponent {
  public isUserLoggedIn!: boolean;
  public currentUserId!: any;
  public allOrderData: iOrder[] = [];
  public currentUserOrder: iOrder[] = [];
  public currentOrderId!: any;
  public showSpinner: boolean = true;
  // Variables related to User List
  public allUserData: User[] = [];
  public currentUsers: User[] = [];
  public usersWhoOrdered: User[] = [];
  constructor(
    private subjectService: SubjectService,
    private route: Router,
    private httpService: HttpClientService,
    private orderService: OrderService,
    private userService: UserDataService
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
    });
    // Getting User List Here
    this.userService.getUserList().subscribe((response) => {
      this.allUserData = response;
    });
    // Getting those Users Who Ordered
    setTimeout(() => {
      for (let order of this.allOrderData) {
        this.currentUsers = this.allUserData.filter((user) => {
          return order.belongsTo === user.id;
        });
        this.usersWhoOrdered.push(this.currentUsers[0]);
      }
      this.showSpinner = false;
    }, 1000);
  }
  ngDoCheck() {
    this.subjectService.userLoggedIn.subscribe((response) => {
      this.isUserLoggedIn = response;
    });
    this.subjectService.userIdSubject.subscribe((response) => {
      this.currentUserId = response;
    });
  }
  ngOnDestroy() {
    this.showSpinner = true;
  }
}
