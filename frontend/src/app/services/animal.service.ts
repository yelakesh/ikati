import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = `${environment.apiUrl}/animales`;

  constructor(private http: HttpClient) {}

  obtenerPorId(id: { id: string }): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorId', id);
  }

  obtenerAnimales(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerAnimales', '');
  }

  registrar(objAnimal: object): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', objAnimal);
  }

  eliminarPorId(objAnimal: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarPorId', objAnimal);
  }

  modificarPorUsuario(objAnimal: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificarAnimal', objAnimal);
  }
}
