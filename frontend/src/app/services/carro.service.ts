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

  constructor(private http: HttpClient) {}
  private carritoActualizado = new BehaviorSubject<void>(undefined);
  carritoActualizado$ = this.carritoActualizado.asObservable();

  anadiraCarro(objCarro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/anadiraCarro', objCarro);
  }

  obtenerProductosCarritoPorIdUsuario(objCarro: object): Observable<any> {
    return this.http.post(
      this.apiUrl + '/obtenerProductosCarritoPorIdUsuario',
      objCarro
    );
  }

  setCantidad(nuevaCantidad: number) {
    this.cantidadSubject.next(nuevaCantidad);
  }

  notificarActualizacionCarrito() {
    this.carritoActualizado.next();
  }

  eliminarDeCarro(objCarro: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarDeCarro', objCarro);
  }

  completarCompra(objCompra: object): Observable<any> {
        
    return this.http.post(this.apiUrl + '/completarCompra', objCompra);
  }
}