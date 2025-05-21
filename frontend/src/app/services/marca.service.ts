import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MarcaService {
  private apiUrl = `${environment.apiUrl}/marcas`;

  constructor(private http: HttpClient) {}

  obtenerPorId(objMarca: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorId', objMarca);
  }
  obtenerTodas(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodas', '');
  }
  registrar(formData: object): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', formData);
  }
  modificar(formData: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificar', formData);
  }
  eliminar(marca: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminar', marca);
  }
}
