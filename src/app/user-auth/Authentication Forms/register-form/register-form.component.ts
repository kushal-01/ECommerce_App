import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/shared/Services/Subject Service/subject.service';
import { UserAuthService } from '../../Services/user-auth.service';
import { interval } from 'rxjs';
@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  public registerForm!: FormGroup;
  public showMessage = false;
  public errorMessage: string | null = null;
  public passwordType: string = 'password';
  public eyeIcon: string = 'fa fa-eye';
  public confirmPasswordType: string = 'password';
  public confirmEyeIcon: string = 'fa fa-eye';
  public passwordValidationPass: boolean = false;
  constructor(
    private userService: UserAuthService,
    private route: Router,
    private subjectService: SubjectService
  ) {}
  // ngOnInit Hook initialising the SignUp Form
  ngOnInit(): void {
    this.subjectService.adminSubject.next(true);
    this.registerForm = new FormGroup({
      fullName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20),
        Validators.pattern('^[a-zA-Z]( *[a-zA-Z])+$'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(10),
        // Validators.pattern('(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{6,}'),
      ]),
      confirmedPassword: new FormControl('', [
        Validators.required,
        this.matchPasswords.bind(this),
      ]),
    });
  }
  // Get functions for Form Controls.
  get fullname() {
    return this.registerForm?.get('fullName');
  }
  get email() {
    return this.registerForm?.get('email');
  }
  get password() {
    return this.registerForm?.get('password');
  }
  get confirmedPassword() {
    return this.registerForm?.get('confirmedPassword');
  }
  //Custom Validation For the Confirmed Password
  private matchPasswords(
    control: AbstractControl
  ): { [s: string]: boolean } | null {
    const confirmedPassword = control.value;
    return this.password?.value === confirmedPassword
      ? null
      : { differentPasswords: true };
  }
  // OnSignUp Function
  public onSignUp() {
    // Storing User To Firebase Authentication
    if (!this.registerForm.invalid) {
      this.userService
        .storeUserToFirebaseAuthentication(this.registerForm.value)
        .subscribe(
          (responseToken) => {
            this.showMessage = true;
            this.userService.storeUserData(this.registerForm.value).subscribe();
            // Resetting the Form Value
            this.registerForm.reset();
            const intervalObservable = interval(1000).subscribe((value) => {
              if (value == 3) {
                this.showMessage = false;
                this.route.navigate(['login']);
                intervalObservable.unsubscribe();
              }
            });
          },
          (errorResponse) => {
            this.errorMessage = errorResponse.error.error.message;
            const intervalObservable = interval(1000).subscribe((value) => {
              if (value == 5) {
                this.errorMessage = null;
                intervalObservable.unsubscribe();
              }
            });
          }
        );
    } else {
      this.errorMessage = 'Please Try again to Sign Up';
      const intervalObservable = interval(1000).subscribe((value) => {
        if (value == 5) {
          this.errorMessage = null;
          intervalObservable.unsubscribe();
        }
      });
    }
  }
  public navigateToLoginForm() {
    this.route.navigate(['login']);
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
  public toggleConfirmPassword() {
    if (this.confirmPasswordType == 'password') {
      this.confirmPasswordType = 'text';
      this.confirmEyeIcon = 'fa fa-eye-slash';
    } else {
      this.confirmPasswordType = 'password';
      this.confirmEyeIcon = 'fa fa-eye';
    }
  }
  ngOnDestroy() {
    this.subjectService.adminSubject.next(false);
  }
}
