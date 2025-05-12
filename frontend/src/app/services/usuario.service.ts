import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  private usuarioSubject = new BehaviorSubject<any>(this.leerUsuario());

  usuario = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(objUsuario: object): Observable<any> {
    return this.http.post(this.apiUrl + '/login', objUsuario);
  }

  obtenerPorUsuario(objUsuario: object): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerPorUsuario', objUsuario);
  }
  obtenerTodos(): Observable<any> {
    return this.http.post(this.apiUrl + '/obtenerTodos', null);
  }

  registrar(objUsuario: object): Observable<any> {
    return this.http.post(this.apiUrl + '/registrar', objUsuario);
  }

  eliminarPorUsuario(objUsuario: object): Observable<any> {
    return this.http.post(this.apiUrl + '/eliminarPorUsuario', objUsuario);
  }

  modificarPorUsuario(objUsuario: object): Observable<any> {
    return this.http.post(this.apiUrl + '/modificarPorUsuario', objUsuario);
  }

  private leerUsuario() {
    const usuarioSesion = sessionStorage.getItem('usuario');
    return usuarioSesion ? JSON.parse(usuarioSesion) : null;
  }

  setUsuario(usuario: any) {
    sessionStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuarioSubject.next(usuario);
  }

  logOut() {
    sessionStorage.removeItem('usuario');
    this.usuarioSubject.next(null);
  }
}