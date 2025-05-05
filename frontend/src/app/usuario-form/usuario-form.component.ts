import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {


  constructor(private router: Router, private usuarioService: UsuarioService) { }
  usuario = {
    usuario: '',
    contrasena: '',
    nombre: '',
    apellido1: '',
    apellido2: '',
    email: '',
    telefono: '',
    cp: '',
    direccion: '',
    rol: ''

  };
  @Input() modo: string = '';

  completarDatosUsuario() {
    this.usuario.nombre = ""
    this.usuario.contrasena = ""
    this.usuario.apellido1 = ""
    this.usuario.apellido2 = ""
    this.usuario.email = ""
    this.usuario.telefono = ""
    this.usuario.cp = ""
    this.usuario.direccion = ""

    this.usuarioService.obtenerPorUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.usuario.nombre = respuesta.usuario.nombre
          this.usuario.contrasena = respuesta.usuario.contrasena
          this.usuario.apellido1 = respuesta.usuario.apellido1
          this.usuario.apellido2 = respuesta.usuario.apellido2
          this.usuario.email = respuesta.usuario.email
          this.usuario.telefono = respuesta.usuario.telefono
          this.usuario.cp = respuesta.usuario.cp
          this.usuario.direccion = respuesta.usuario.direccion


        }
      },
      error: () => {
        alert('Usuario no encontrado');
      }
    });

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.usuario = {
        usuario: '',
        contrasena: '',
        nombre: '',
        apellido1: '',
        apellido2: '',
        email: '',
        telefono: '',
        cp: '',
        direccion: '',
        rol: ''
      };

    }
  }

  registrar() {
    this.usuarioService.registrar(this.usuario).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }

  eliminar() {
    this.usuarioService.eliminarPorUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })

  }
  modificar() {
    this.usuarioService.modificarPorUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }


}
