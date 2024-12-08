import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { Zerado } from '../model/zerado';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class ZeradoPromiseService {
  URL = 'http://localhost:8080/zerados';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  zerados!: Zerado[];
  user: User;
  
  constructor(private httpClient: HttpClient) {
    
  }

  getAll(): Promise<Zerado[]> {
    let id = sessionStorage.getItem('id');
    return this.httpClient.get<Zerado[]>(this.URL+'/'+id).toPromise();
  }

  save(zerado: Zerado): Promise<Zerado> {
    let id = sessionStorage.getItem('id');
    return this.httpClient
      .post<Zerado>(this.URL+'/'+id, (zerado))
      .toPromise();
  }

  update(zerado: Zerado): Promise<Zerado> {
    return this.httpClient
      .put<Zerado>(
        `${this.URL}/${zerado.zeradoId}`,
        (zerado),
        this.httpOptions
      )
      .toPromise();
  }

  delete(id: number): Promise<Zerado> {
    return this.httpClient.delete<Zerado>(`${this.URL}/${id}`).toPromise();
  }

  getById(id: number): Promise<Zerado> {
    return this.httpClient.get<Zerado>(`${this.URL}/${id}`).toPromise();
  }
}
