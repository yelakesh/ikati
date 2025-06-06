import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class CarroService {

  private apiUrl = `${environment.apiUrl}/carro`;

  private cantidadSubject = new BehaviorSubject<number>(0);
  cantidad$ = this.cantidadSubject.asObservable();

  constructor(private http: HttpClient) { }

  anadiraCarro(objCarro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/anadiraCarro', objCarro);
  }

  obtenerProductosCarritoPorIdUsuario(objCarro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerProductosCarritoPorIdUsuario', objCarro)
  }

    setCantidad(nuevaCantidad: number) {
    this.cantidadSubject.next(nuevaCantidad);
  }


}