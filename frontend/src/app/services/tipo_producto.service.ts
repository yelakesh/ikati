import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoProductoService {
  private apiUrl = `${environment.apiUrl}/tipo_producto`;

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
  obtenerPorIdAnimal(objAnimal: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorIdAnimal', objAnimal);
  }
  obtenerFiltroPorIdAnimal(objAnimal: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerFiltroPorIdAnimal', objAnimal);
  }
}
