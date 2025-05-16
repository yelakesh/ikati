import { Component, Input } from '@angular/core';
import { HeaderComponent } from "../../../../components/header/header.component";
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-editpassword',
  imports: [HeaderComponent, FormsModule, CommonModule, RouterLink],
  templateUrl: './editpassword.component.html',
  styleUrl: './editpassword.component.css'
})


export class EditpasswordComponent {
  constructor(private router:Router, private usuarioService: UsuarioService) { 
    const usuarioGuardado = sessionStorage.getItem('usuario')

    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado)
      this.usuario.usuario = usuarioObj.usuario
    }
  }

  
  usuario = {
    usuario: '',
    contrasena: '',
    antigua: '',
    nueva: '',
    nueva2: ''

  };

  get contrasenasNoCoinciden(): boolean {
    return (
      !!this.usuario.nueva &&
      !!this.usuario.nueva2 &&
      this.usuario.nueva !== this.usuario.nueva2
    );
  }

  get puedeCambiarPassword(): boolean {
    return (
      !!this.usuario.antigua && // Contraseña actual no vacía
      !!this.usuario.nueva &&   // Nueva contraseña no vacía
      !!this.usuario.nueva2 &&  // Repetir contraseña no vacía
      !this.contrasenasNoCoinciden // Las contraseñas coinciden
    );
  }

  cambiarPassword() {

    if (this.usuario.antigua === this.usuario.nueva || this.usuario.nueva != this.usuario.nueva2) {
      alert('La nueva contraseña no puede ser igual a la antigua');
      return;
    }

    this.usuarioService.cambiarPass(this.usuario).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }
}
