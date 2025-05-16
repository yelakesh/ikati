import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoProductoService {
  private apiUrl = 'http://localhost:3000/api/tipo_producto';

  constructor(private http: HttpClient) {}

  obtenerPorId(objTipo_producto: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorId', objTipo_producto);
  }

  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', '');
  }

  registrar(objTipo_producto: object): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', objTipo_producto);
  }

  eliminarPorId(objTipo_producto: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarPorId', objTipo_producto);
  }

  modificarPorUsuario(objTipo_producto: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificar', objTipo_producto);
  }
}
