import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  BASE_PATH: 'http://localhost:8080/login'
  TOKEN = 'token'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) {

  }

  authenticationService(username: String, password: String) {

    console.log('usuario: ' +username);
    console.log('senha: ' +password);

    const body = { email: username, pass: password };

    const headers = { 'Content-Type': 'application/json', 'My-Custom-Header': 'foobar' };

        return this.http.post('http://localhost:8080/login', body
     ).pipe(map((res) => {    
      console.log(res);
       this.registerSuccessfulLogin(res);
      }));
  }

  registerSuccessfulLogin(res) {

    console.log('token ' +res.token);

    sessionStorage.setItem("id", res.id);
    sessionStorage.setItem("token", res.token);
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.TOKEN)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.TOKEN)
    if (user === null) return ''
    return user
  }
}