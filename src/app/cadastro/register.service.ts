import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  BASE_PATH: 'http://localhost:8080/register'
  TOKEN = 'token'

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient) {   }

  registerService(email: String, username: String, password: String) {

    const body = { email: email, name: username, pass: password };

    const headers = { 'Content-Type': 'application/json', 'My-Custom-Header': 'foobar' };

        return this.http.post('http://localhost:8080/register', body
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