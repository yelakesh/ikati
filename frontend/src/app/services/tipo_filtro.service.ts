import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoFiltroService {
  private apiUrl = 'http://localhost:3000/api/tipo_filtro';

  constructor(private http: HttpClient) {}

  obtenerPorId(objTipo_filtro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorId', objTipo_filtro);
  }

  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', '');
  }

  registrar(objTipo_filtro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', objTipo_filtro);
  }

  eliminarPorId(objTipo_filtro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarPorId', objTipo_filtro);
  }

  modificarPorUsuario(objTipo_filtro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificar', objTipo_filtro);
  }
}
