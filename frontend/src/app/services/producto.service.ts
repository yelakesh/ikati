import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}

  obtenerProductoPorId(objProducto: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerProductoPorId', objProducto);
  }

  obtenerNombres(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerNombres', '');
  }
  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', '');
  }

  registrarProductoCompleto(formData: object): Observable<any> {
    return this.http.post(this.apiUrl + '/registrarProductoCompleto', formData);
  }
  modificarProducto(formData: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificarProducto', formData);
  }

  eliminarProducto(producto: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarProducto', producto);
  }

  obtenerPorAnimal(objAnimal: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorAnimal', objAnimal);
  }
  obtenerPorAnimalYTipo(objAnimal: object,objTipo:object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorAnimal', objAnimal,objTipo);
  }
}