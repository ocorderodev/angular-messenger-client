import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public URL;

  constructor(
    private http: HttpClient
  ) {
    this.URL = environment.URI;
  }

  register(body):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL + 'user/singup', body, { headers });
  }

  auth(body):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL + 'user/singin', body, { headers });
  }

  getUsers():Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.URL + 'user/get', { headers });
  }

  getUser(i):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.URL + 'user/get/' + i, { headers });
  }

}
