import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private apiUrl = 'http://localhost:3000/api/animal';

  constructor(private http: HttpClient) {}

  obtenerPorId(id: {id:string}): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorId', id);
  }

  obtenerAnimales(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerAnimales', "");
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
