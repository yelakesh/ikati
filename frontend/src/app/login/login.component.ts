import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UsuarioService } from '../servicios/usuario.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  usuario = {
    nombre: '',
    contrasena: ''
  };

  constructor(private usuarioService: UsuarioService) {}

comprobarLogin(){
  this.usuarioService.login(this.usuario.nombre, this.usuario.contrasena).subscribe({
    next: (respuesta) => {
      console.log('Login exitoso:', respuesta);

    },
    error: (err) => {
      console.error('Error en login:', err);
    }
  });

}
}