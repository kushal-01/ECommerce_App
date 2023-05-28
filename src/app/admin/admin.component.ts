import { Component } from '@angular/core';
import { SubjectService } from '../shared/Services/Subject Service/subject.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  constructor(private subjectService: SubjectService) {}
  ngOnInit() {
    this.subjectService.adminSubject.next(true);
  }
  ngOnDestroy() {
    this.subjectService.adminSubject.next(false);
  }
}
