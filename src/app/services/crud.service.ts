import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(public http: HttpClient) {}

  post(url, body?): Observable<any> {
    return this.http.post(url, body);
  }

  get(url): Observable<any> {
    const route = new URL(url);
    return this.http.get(route.toString());
  }

  put(url, body?, headers?): Observable<any> {
    const route = new URL(url);
    return this.http.put(route.toString(), body, headers);
  }

  patch(url, body?, headers?): Observable<any> {
    const route = new URL(url);
    return this.http.patch(route.toString(), body, headers);
  }

  delete(url, body?): Observable<any> {
    const route = new URL(url);
    return this.http.delete(route.toString());
  }
}
