import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  providers: [ HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  usuario = {
    nombre: '',
    contrasena: ''
  };

  constructor(private router:Router,private usuarioService: UsuarioService) {}

comprobarLogin(){

  this.usuarioService.login(this.usuario.nombre, this.usuario.contrasena).subscribe({
    next: (respuesta) => {
      if (respuesta.mensaje === 'Login correcto') {
        document.cookie="id_usuario="+respuesta.id
        this.router.navigate(['']);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    },
    error: (err) => {
      console.error('Error en login:', err);
      alert('Hubo un error en el servidor');
    }
  });

}
}