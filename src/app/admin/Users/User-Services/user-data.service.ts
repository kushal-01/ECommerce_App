import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { User } from 'src/app/data/Models/Users Model/user';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(
    private httpService: HttpClientService,
    private urlService: UrlService
  ) {}
  getUserList() {
    return this.httpService.getRequest(this.urlService.userJsonApiUrl).pipe(
      map((data: any) => {
        const users: User[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            users.push({ ...data[key], id: key });
          }
        }
        return users;
      })
    );
  }
  getSingleUser(id: string | null) {
    return this.httpService.getRequest(
      this.urlService.userApiUrl + '/' + id + '.json'
    );
  }
}
