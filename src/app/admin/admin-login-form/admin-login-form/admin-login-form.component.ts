import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UserAuthService } from 'src/app/user-auth/Services/user-auth.service';
import { AdminAuthService } from '../../Services/admin-auth.service';

@Component({
  selector: 'app-admin-login-form',
  templateUrl: './admin-login-form.component.html',
  styleUrls: ['./admin-login-form.component.css'],
})
export class AdminLoginFormComponent {
  public adminLoginForm!: FormGroup;
  public showLoginMessage = false;
  public showInvalidAdminMessage: boolean = false;
  public allUserData: any[] = [];
  public isLoginStatus!: boolean;
  public passwordType: string = 'password';
  public eyeIcon: string = 'fa fa-eye';
  constructor(
    private userService: UserAuthService,
    private route: Router,
    private adminAuthService: AdminAuthService,
    private subjectService: SubjectService,
    private activatedRoute: ActivatedRoute
  ) {}
  // ngOnInit Hook initialising the Admin Login Form
  ngOnInit(): void {
    this.adminLoginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        // Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}'),
      ]),
    });
    this.subjectService.adminSubject.next(true);
  }
  // Get functions for Form Controls.
  get email() {
    return this.adminLoginForm?.get('email');
  }
  get password() {
    return this.adminLoginForm?.get('password');
  }
  // Validating user from database
  private validateAdmin(): { isLogin: boolean; index: any } {
    const loginEmail = this.adminLoginForm.value.email;
    const loginPassword = this.adminLoginForm.value.password;
    for (const i in this.allUserData) {
      if (
        // Through this accessing one user object of userData Array.
        this.allUserData[i].email === loginEmail &&
        this.allUserData[i].password === loginPassword &&
        this.allUserData[i].isAdmin === true
      ) {
        return { isLogin: true, index: i };
      }
    }
    return { isLogin: false, index: null };
  }
  // OnLogin Function
  public onLogin() {
    this.userService.getUserData().subscribe((response: any) => {
      this.allUserData = response;
      this.isLoginStatus = this.validateAdmin().isLogin;
    });
    setTimeout(() => {
      if (this.isLoginStatus) {
        this.showLoginMessage = true;
        setTimeout(() => {
          this.showLoginMessage = false;
        }, 2000);
        this.adminLoginForm.reset();
        this.adminAuthService.isAdmin = 'true';
        localStorage.setItem('isAdmin', 'true');
        this.route.navigate(['admin']);
      } else {
        this.showInvalidAdminMessage = true;
        setTimeout(() => {
          this.showInvalidAdminMessage = false;
        }, 4000);
        this.adminAuthService.isAdmin = null;
      }
    }, 1000);
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
