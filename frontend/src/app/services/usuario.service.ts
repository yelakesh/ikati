import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = `${environment.apiUrl}/usuarios`;

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

  cambiarPass(objUsuario: object): Observable<any> {
    return this.http.post(this.apiUrl + '/cambiarPass', objUsuario);
  }

  private leerUsuario() {
    const usuarioSesion = sessionStorage.getItem('usuario');
    return usuarioSesion ? JSON.parse(usuarioSesion) : null;
  }

  obtenerComprasConProductosPorIdUsuario(idUsuario: number) {
    return this.http.post(
      this.apiUrl + '/obtenerComprasConProductosPorIdUsuario',
      {idUsuario}
    );
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