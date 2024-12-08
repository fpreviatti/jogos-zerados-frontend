import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Zerado } from '../model/zerado';

@Injectable({
  providedIn: 'root',
})
export class ZeradoObservableService {
  URL = 'http://localhost:8080/zerados';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private httpClient: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Um erro ocorreu no lado do cliente', error.error);
    } else {
      console.error(
        'O Backend returnou o seguinte código de erro: ${error.status}, erro:',
        error.error
      );
    }
    return throwError(
      () => new Error('Não foi possível completar a requisição.')
    );
  }

  getAll(): Observable<Zerado[]> {
    
    let token = sessionStorage.getItem('token');

    console.log('valor do token: ' +token );

    let id = sessionStorage.getItem('id');

    //console.log(idUsuario);

    return this.httpClient
      .get<Zerado[]>(this.URL +'/' +id)
      .pipe(catchError(this.handleError));
  }

  post(zerado: Zerado): Observable<Zerado> {
    return this.httpClient
      .post<Zerado>(this.URL, (zerado), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  put(zerado: Zerado): Observable<Zerado> {
    return this.httpClient
      .put<Zerado>(
        `${this.URL}/${zerado.zeradoId}`,
        (zerado),
        this.httpOptions
      )
      .pipe(retry(2), catchError(this.handleError));
  }
  delete(zerado: Zerado): Observable<Zerado> {
    console.log(zerado);
    return this.httpClient
      .delete<Zerado>(`${this.URL}/${zerado.zeradoId}`)
      .pipe(retry(2), catchError(this.handleError));
  }
}
