import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CarroService {

      private apiUrl = `${environment.apiUrl}/carro`;

  constructor(private http: HttpClient) {}

  anadiraCarro(objCarro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/anadiraCarro', objCarro);
  }

  obtenerProductosCarritoPorIdUsuario(objCarro: object): Observable<any>{
    return this.http.post(this.apiUrl + '/obtenerProductosCarritoPorIdUsuario', objCarro)
  }

}