import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterLink } from '@angular/router';
import { adminService} from "../services/admin.service";
import { HeaderComponent } from '../components/header/header.component';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterLink, BreadcrumbComponent, HeaderComponent],
  providers: [ HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  usuario = {
    usuario: '',
    contrasena: '',
    rol:''

  };



  constructor(private router:Router,private usuarioService: UsuarioService, private adminService: adminService) {}


comprobarLogin(){

  this.usuarioService.login(this.usuario).subscribe({
    next: (respuesta) => {
      if (respuesta.ok) {      
        
        console.log(respuesta)

        sessionStorage.setItem('usuario', JSON.stringify(respuesta.usuario))
        this.router.navigate(['']);
      } else {
        alert(respuesta.mensaje);
      }
    },
    error: (err) => {
      console.error('Error en login:', err);
      alert('Hubo un error en el servidor');
    }
  });

}
comprobarLoginAdmin(){

  this.adminService.login(this.usuario).subscribe({
    next: (respuesta) => {
      if (respuesta.ok) {      
        
        console.log(respuesta)

        sessionStorage.setItem('usuario', JSON.stringify(respuesta.usuario))
        alert("Bienvenido "+this.usuario.usuario)
          this.router.navigate(['administracion']);
        
        
      } else {
        alert(respuesta.mensaje);
      }
    },
    error: (err) => {
      console.error('Error en login:', err);
      alert('Hubo un error en el servidor');
    }
  });

}
}