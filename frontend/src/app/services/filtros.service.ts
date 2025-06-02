import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FiltrosService {
  private apiUrl = `${environment.apiUrl}/filtros`;

  constructor(private http: HttpClient) {}

  obtenerPorAnimal(idAnimal: any): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorAnimal', idAnimal);
  }
  obtenerPorAnimalYTipo(objAnimalTipo: any): Observable<any> {
    return this.http.post(
      this.apiUrl + '/obtenerPorAnimalYTipo',
      objAnimalTipo
    );
  }
}
