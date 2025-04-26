import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  login(objUsuario: object): Observable<any> {
    return this.http.post(this.apiUrl+"/login", objUsuario);
  }

  obtenerPorUsuario(objUsuario: object): Observable<any>{
    return this.http.post(this.apiUrl+"/obtenerPorUsuario", objUsuario);

  }

  registrar(objUsuario: object): Observable<any>{
    return this.http.post(this.apiUrl+"/registrar", objUsuario);

  }

  eliminarPorUsuario(objUsuario:object):Observable<any> {
  return this.http.post(this.apiUrl+"/eliminarPorUsuario", objUsuario);
}

  modificarPorUsuario(objUsuario: object):Observable<any> {
  return this.http.post(this.apiUrl+"/modificarPorUsuario", objUsuario);
}

}