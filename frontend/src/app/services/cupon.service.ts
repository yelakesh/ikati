import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CuponService {
  private apiUrl = `${environment.apiUrl}/cupones`;

  constructor(private http: HttpClient) {}

  crearCupon(objCupon: object): Observable<any> {
    return this.http.post(this.apiUrl + '/nuevoCupon', objCupon);
  }

  modificarPorCodigo(objCupon: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificarPorCodigo', objCupon);
  }

  obtenerPorCodigo(objCupon: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorCodigo', objCupon);
  }

  eliminarPorCodigo(objCupon: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarPorCodigo', objCupon);
  }

  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', null);
  }
  aplicarCupon(objCupon: object): Observable<any> {
    return this.http.post(this.apiUrl + '/aplicarCupon', objCupon);
  }
}