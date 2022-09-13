import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public URL;

  constructor(
    private http: HttpClient
  ) {
    this.URL = environment.URI;
  }

  getMessage(from, to):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.get(this.URL + 'message/' + from + '/' + to, { headers });
  }

  send(body):Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(this.URL + 'message/send', body, { headers });
  }

}
