import { CanActivate, Router } from '@angular/router';
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})

export class adminGuard implements CanActivate {
  constructor(private router: Router){}

  canActivate(): boolean {
    
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}')
    
    if(usuario && usuario.rol === 'admin'){
      return true
    }
    
    alert('No tienes los permisos de admin')
    this.router.navigate(['login'])
    return false
  }
}
