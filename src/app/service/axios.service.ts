import { Injectable } from '@angular/core';
import axios from 'axios';
import { Zerado } from '../model/zerado';

@Injectable({
  providedIn: 'root'
})
export class AxiosService {

  constructor() {
    axios.defaults.baseURL = 'http://localhost:8080';
    axios.defaults.headers.post['Content-Type'] = 'application/json';
  }

  getAuthToken(): string | null {
    return sessionStorage.getItem("token");
  }

  setAuthToken(token: string | null): void {
    if (token !== null) {
      sessionStorage.setItem("token", token);
    } else {
      sessionStorage.removeItem("token");
    }
  }


  request(method: string, url: string, data: any): Promise<Zerado> {
      let headers: any = {};

      if (this.getAuthToken() !== null) {
          headers = {"Authorization": "Bearer " + this.getAuthToken()};
      }

      return axios({
          method: method,
          url: url,
          data: data,
          headers: headers
      });
  }
}
