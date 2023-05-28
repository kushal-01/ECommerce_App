import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private http: HttpClient) {}
  postRequest(apiUrl: string, postBody: any) {
    return this.http.post(apiUrl, postBody);
  }
  getRequest(apiUrl: string) {
    return this.http.get(apiUrl);
  }
  deleteRequest(url: string, id: string) {
    return this.http.delete(url + '/' + id + '.json');
  }
  deleteAllRequest(url: string) {
    return this.http.delete(url);
  }
  putRequest(url: string, id: string | null, putBody: any) {
    return this.http.put(url + '/' + id + '.json', putBody);
  }
}
