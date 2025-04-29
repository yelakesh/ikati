import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  
  private apiUrl = 'http://localhost:3000/api/productos'

  constructor(private http: HttpClient) {}

  obtenerProductoCompleto(objProducto: object): Observable<any>{
    return this.http.post(this.apiUrl+"/obtenerProductoCompleto", objProducto)

  }

  registrarProductoCompleto(objProducto: object): Observable<any>{
    return this.http.post(this.apiUrl+"/registrarProductoCompleto", objProducto)

  }

}