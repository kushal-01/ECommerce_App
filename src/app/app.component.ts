import { Component } from '@angular/core';
import { SubjectService } from './shared/Services/Subject Service/subject.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  private title = 'Ecommerce_App';
  public showAdminPanel!: boolean;
  constructor(private subjectService: SubjectService) {}
  ngDoCheck() {
    this.subjectService.adminSubject.subscribe((response) => {
      this.showAdminPanel = response;
    });
    // User-Authentication Logic Here
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
}
