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
    usuario: '',
    contrasena: ''
  };

  constructor(private router:Router,private usuarioService: UsuarioService) {}

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
}