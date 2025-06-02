import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoServicioService {
  private apiUrl = `${environment.apiUrl}/tipo_servicio`;

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', '');
  }

}
