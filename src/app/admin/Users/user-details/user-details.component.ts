import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/data/Models/Users Model/user';
import { UserDataService } from '../User-Services/user-data.service';

@Component({
  selector: 'app-show-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent {
  public userId: string | null = '';
  public singleUserDetails!: User;
  public userName: string = '';
  public userEmail: string = '';
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserDataService
  ) {}
  ngOnInit(): void {
    // Getting the Route Parameter
    this.activatedRoute.paramMap.subscribe((value) => {
      this.userId = value.get('id');
    });
    // Fetching the User Details with Route Parameter Id
    this.getSpecificUserData();
  }
  // Method for getting Single User Details from Database via UserData Service getSingleUser() Method
  private getSpecificUserData() {
    this.userService.getSingleUser(this.userId).subscribe((response: any) => {
      this.singleUserDetails = response;
    });
  }
}
