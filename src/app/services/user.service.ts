import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url =
    'http://api.weatherapi.com/v1/current.json?key=f6ca5dce458e4c34a53190836241205&q=London&aqi=no';
  constructor(private http: HttpClient) {}
  Apicall() {
    return this.http.get(this.url);
  }
}
