import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class servicioService {

  private apiUrl = `${environment.apiUrl}/servicio`;

  constructor(private http: HttpClient) { }

  crearServicio(objServicio: object): Observable<any> {
    return this.http.post(this.apiUrl + "/nuevoServicio", objServicio)
  }
  modificarPorNombre(objServicio: object): Observable<any> {
    return this.http.post(this.apiUrl + "/modificarPorNombre", objServicio)
  }
  obtenerPorNombre(objServicio: object): Observable<any> {
    return this.http.post(this.apiUrl + "/obtenerPorNombre", objServicio)
  }
  eliminarPorNombre(objServicio:object): Observable<any>{
    return this.http.post(this.apiUrl+'/eliminarPorNombre', objServicio)

  

  
  }
}