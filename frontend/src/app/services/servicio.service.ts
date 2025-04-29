import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class servicioService {

    private apiUrl = "http://localhost:3000/api/servicio";

    constructor(private http: HttpClient){}

    crearServicio(objServicio: object): Observable<any>{
        return this.http.post(this.apiUrl+"/nuevoServicio",objServicio)
    }

    /*modificarPorCodigo(objServicio: object): Observable<any>{
      return this.http.post(this.apiUrl+"/modificarPorCodigo", objServicio)
    }

    obtenerPorCodigo(objServicio:object): Observable<any>{
      return this.http.post(this.apiUrl+'/obtenerPorCodigo', objServicio)
    }

    eliminarPorCodigo(objServicio:object): Observable<any>{
      return this.http.post(this.apiUrl+'/eliminarPorCodigo', objServicio)
    }*/
}