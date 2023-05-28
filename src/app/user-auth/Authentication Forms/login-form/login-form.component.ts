import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/data/Models/Users Model/user';
import { UserAuthService } from '../../Services/user-auth.service';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { interval, timer } from 'rxjs';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent {
  constructor(
    private userService: UserAuthService,
    private route: Router,
    private subjectService: SubjectService
  ) {}
  public loginForm!: FormGroup;
  public showLoginMessage = false;
  public showInvalidUserMessage: boolean = false;
  public allUserData: any[] = [];
  public isLoginStatus!: boolean;
  public currentUser!: User[];
  public errorMessage: string | null = null;
  public passwordType: string = 'password';
  public eyeIcon: string = 'fa fa-eye';

  // ngOnInit Hook initialising the Login Form
  ngOnInit(): void {
    this.subjectService.adminSubject.next(true);
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        // Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}'),
      ]),
    });
  }
  ngDoCheck() {
    if (localStorage.getItem('user')) {
      const userDataString = localStorage.getItem('user-data');
      if (userDataString) {
        const userObject: any = JSON.parse(userDataString);

        this.subjectService.userEmailSubject.next(userObject.email);
        this.subjectService.userLoggedIn.next(userObject.userLoggedIn);
        this.subjectService.userIdSubject.next(userObject.id);
        this.subjectService.userNameSubject.next(userObject.name);
      }
    }
  }
  // Get functions for Form Controls.
  get email() {
    return this.loginForm?.get('email');
  }
  get password() {
    return this.loginForm?.get('password');
  }
  // Validating user from database
  private validateUser(): { isLogin: boolean; index: any } {
    const loginEmail = this.loginForm.value.email;
    const loginPassword = this.loginForm.value.password;
    for (const i in this.allUserData) {
      if (
        // Through this accessing one user object of userData Array.
        this.allUserData[i].email === loginEmail &&
        this.allUserData[i].password === loginPassword
      ) {
        return { isLogin: true, index: i };
      }
    }
    return { isLogin: false, index: null };
  }
  // OnLogin Function
  public onLogin() {
    // Checking User From Firebase Authentication
    this.userService
      .validateUserOnFirebaseAuthentication(this.loginForm.value)
      .subscribe(
        (responseToken: any) => {
          // Storing The Token In Local Storage
          localStorage.setItem('user', JSON.stringify(responseToken));
          const loginEmail = responseToken.email;
          this.subjectService.userEmailSubject.next(responseToken.email);
          this.subjectService.userLoggedIn.next(true);
          // Getting the UserId from Realtime Database
          this.userService.getUserData().subscribe((response) => {
            this.allUserData = response;
            this.currentUser = this.allUserData.filter((user) => {
              return loginEmail === user.email;
            });
            this.subjectService.userIdSubject.next(this.currentUser[0].id);
            this.subjectService.userNameSubject.next(
              this.currentUser[0].fullName
            );
            // Storing the Current User in Local Storage
            localStorage.setItem(
              'user-data',
              JSON.stringify({
                email: loginEmail,
                userLoggedIn: true,
                name: this.currentUser[0].fullName,
                id: this.currentUser[0].id,
              })
            );
            this.subjectService.cartItemUpdateSubject.next(true);
            this.subjectService.wishlistItemUpdateSubject.next(true);
          });
          this.route.navigate(['home-page']);
        },
        (errorResponse) => {
          this.errorMessage = errorResponse.error.error.message;
          const intervalObservable = interval(1000).subscribe((value) => {
            if (value == 4) {
              this.errorMessage = null;
              intervalObservable.unsubscribe();
            }
          });
        }
      );
  }
  public navigateToRegisterForm() {
    this.route.navigate(['register']);
  }
  public navigateToHomePage() {
    this.route.navigate(['home-page']);
  }
  public togglePassword() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
      this.eyeIcon = 'fa fa-eye-slash';
    } else {
      this.passwordType = 'password';
      this.eyeIcon = 'fa fa-eye';
    }
  }
  ngOnDestroy() {
    this.subjectService.adminSubject.next(false);
  }
}
