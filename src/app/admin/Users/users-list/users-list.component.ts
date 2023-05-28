import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/data/Models/Users Model/user';
import { UserDataService } from '../User-Services/user-data.service';

@Component({
  selector: 'app-show-users',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css'],
})
export class UsersListComponent {
  public showMessage: boolean = true;
  public allUsers: User[] = [];
  public singleUser!: User;
  public showSpinner: boolean = false;
  constructor(
    private userService: UserDataService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getAllUserdata();
  }
  private getAllUserdata() {
    this.showMessage = false;
    this.showSpinner = true;
    this.userService.getUserList().subscribe((response) => {
      this.allUsers = response;
      this.showSpinner = false;
    });
  }
  public navigateToUserDetails(userId: string | undefined) {
    this.route.navigate(['admin/user-details', userId]);
  }
}
