import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class adminService {
  
  private apiUrl = `${environment.apiUrl}/admin`;

  constructor(private http: HttpClient) {}

  login(objAdmin: object): Observable<any> {
    return this.http.post(this.apiUrl+"/login", objAdmin);
  }


  cambiarPass(objAdmin: object): Observable<any>{
    return this.http.post(this.apiUrl+"/cambiarPass", objAdmin);

  }

  crearAdmin(objAdmin: object): Observable<any>{
    return this.http.post(this.apiUrl+"/crearAdmin", objAdmin);

  }

  eliminarAdmin(objAdmin:object):Observable<any> {
  return this.http.post(this.apiUrl+"/eliminarAdmin", objAdmin);
}



}