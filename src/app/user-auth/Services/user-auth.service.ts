import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClientService } from 'src/app/shared/Services/HttpClient Service/http-client.service';
import { UrlService } from 'src/app/shared/Services/Url Service/url.service';
@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(
    private httpService: HttpClientService,
    private urlService: UrlService
  ) {}
  storeUserData(postBody: any) {
    const newPostBody: any = { ...postBody, isAdmin: false };
    return this.httpService.postRequest(
      this.urlService.userJsonApiUrl,
      newPostBody
    );
  }
  getUserData() {
    return this.httpService.getRequest(this.urlService.userJsonApiUrl).pipe(
      map((data: any) => {
        const users: any[] = [];
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            users.push({ ...data[key], id: key });
          }
        }
        return users;
      })
    );
  }
  // Firebase Authentication Logic Here
  storeUserToFirebaseAuthentication(postBody: any) {
    return this.httpService.postRequest(this.urlService.registerFirebaseUrl, {
      email: postBody.email,
      password: postBody.password,
      returnSecureToken: true,
    });
  }
  validateUserOnFirebaseAuthentication(postBody: any) {
    return this.httpService.postRequest(this.urlService.loginFirebaseUrl, {
      email: postBody.email,
      password: postBody.password,
      returnSecureToken: true,
    });
  }
}
