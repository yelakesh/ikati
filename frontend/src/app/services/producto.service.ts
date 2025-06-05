import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = `${environment.apiUrl}/productos`;

  constructor(private http: HttpClient) {}

  obtenerProductoPorId(objProducto: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerProductoPorId', objProducto);
  }

  obtenerEnOferta(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerEnOferta', '');
  }

  obtenerNombres(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerNombres', '');
  }
  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', '');
  }
  obtenerRecomendados(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerRecomendados', '');
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

  obtenerPorAnimalYTipo(objAnimal: object, objTipo: object): Observable<any> {
    const objs = {
      objAnimal: objAnimal,
      objTipo: objTipo,
    };
    return this.http.post(this.apiUrl + '/obtenerPorAnimalYTipo', objs);
  }

  buscarPorNombre(textoBusqueda: string): Observable<any> {    
    return this.http.post(this.apiUrl + '/buscarPorNombre', {textoBusqueda:textoBusqueda});
  }

    obtenerProductoPorIdVariante(objCarro: object): Observable<any>{
    return this.http.post(this.apiUrl + '/obtenerProductoPorIdVariante', objCarro)
  }
    obtenerVariantePorIdVariante(id_variante: object): Observable<any>{
    return this.http.post(this.apiUrl + '/obtenerProductoPorIdVariante', id_variante)
  }
}