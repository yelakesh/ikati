import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TipoVarianteService {
  private apiUrl = 'http://localhost:3000/api/tipo_variante';

  constructor(private http: HttpClient) {}

  obtenerPorId(objTipo_variante: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorId', objTipo_variante);
  }

  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', '');
  }

  registrar(objTipo_variante: object): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', objTipo_variante);
  }

  eliminarPorId(objTipo_variante: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarPorId', objTipo_variante);
  }

  modificarPorUsuario(objTipo_variante: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificar', objTipo_variante);
  }
}
