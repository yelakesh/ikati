import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CuponService {

    private apiUrl = "http://localhost:3000/api/cupones";

    constructor(private http: HttpClient){}

    crearCupon(objCupon: object): Observable<any>{
        return this.http.post(this.apiUrl+"/nuevoCupon",objCupon)
    }

    modificarPorCodigo(objCupon: object): Observable<any>{
      return this.http.post(this.apiUrl+"/modificarPorCodigo", objCupon)
    }

    obtenerPorCodigo(objCupon:object): Observable<any>{
      return this.http.post(this.apiUrl+'/obtenerPorCodigo', objCupon)
    }

    eliminarPorCodigo(objCupon:object): Observable<any>{
      return this.http.post(this.apiUrl+'/eliminarPorCodigo', objCupon)
    }
}