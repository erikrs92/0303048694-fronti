import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../../src/environments/environment';
//const baseUrl = 'http://localhost:8080/api/users';http://localhost:8090/backi/


@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = environment.apiBaseUrl+"/users"; 
  //const baseUrl = `${environment}/users`;
  constructor(private http: HttpClient) {}
 /*
  getAll(): Observable<user[]> {
    return this.http.get<user[]>(baseUrl);
  }*/
  getAll(): Observable<user[]> {
    console.debug("Holaaaaaa")
    return this.http.get<user[]>(`${this.API_URL}`).pipe(
      catchError(error => { 
        console.error('An error occurred:', error);
        return throwError(() => new Error('An error occurred'));
      })
    );
  }

  get(id: any): Observable<user> {
    return this.http.get<user>(`${this.API_URL}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${this.API_URL}`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.API_URL}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${this.API_URL}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(`${this.API_URL}`);
  }

  findByTitle(title: any): Observable<user[]> {
    return this.http.get<user[]>(`${this.API_URL}/username/${title}`);
  }
}
