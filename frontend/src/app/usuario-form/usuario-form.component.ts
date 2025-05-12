import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatAutocompleteModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent {
  constructor(private router: Router, private usuarioService: UsuarioService) {}
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
    rol: '',
  };

  usuarios: any[] = [];
  usuariosFiltrados: any[] = [];

  @Input() modo: string = '';
  @Input() origen: 'admin' | 'registro' = 'registro';

  completarDatos() {
    this.vaciarInputs();

    this.usuarioService.obtenerPorUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.usuario.nombre = respuesta.usuario.nombre;
          this.usuario.contrasena = respuesta.usuario.contrasena;
          this.usuario.apellido1 = respuesta.usuario.apellido1;
          this.usuario.apellido2 = respuesta.usuario.apellido2;
          this.usuario.email = respuesta.usuario.email;
          this.usuario.telefono = respuesta.usuario.telefono;
          this.usuario.cp = respuesta.usuario.cp;
          this.usuario.direccion = respuesta.usuario.direccion;
        }
      },
      error: () => {
        alert('Usuario no encontrado');
      },
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.vaciarInputs();
    }
  }

  registrar() {
    if (this.formularioValido()) {
      this.usuarioService.registrar(this.usuario).subscribe({
        next: (respuesta) => {
          if (this.origen === 'registro') {
            this.router.navigate(['/registro-exito']);
          } else {
            alert(respuesta.mensaje);
            this.cargarUsuarios();
          }
        },
        error: (err) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });
    }
  }

  eliminar() {
    this.usuarioService.eliminarPorUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
        this.cargarUsuarios();
      },
      error: (err) => {
        console.log(err);
        alert(err.error.mensaje);
      },
    });
  }
  modificar() {
    if (this.formularioValido()) {
      this.usuarioService.modificarPorUsuario(this.usuario).subscribe({
        next: (respuesta) => {
          alert(respuesta.mensaje);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });
    }
  }

  formularioValido() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].required && inputs[i].value == '') {
        alert('Debe rellenar todos los campos obligatorios');
        inputs[i].focus();
        return false;
      }
      if (inputs[i].type == 'email' && !inputs[i].validity.valid) {
        alert('Email incorrecto');
        inputs[i].focus();
        return false;
      }
    }

    return true;
  }

  async cargarUsuarios() {
    this.usuarioService.obtenerTodos().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.usuarios = respuesta.cupon;
          this.usuariosFiltrados = this.usuarios;
        }
      },
      error: (error) => {
        if (error.status != '404') {
          alert(error.mensaje);
        }
      },
    });
  }

  filtrarUsuarios() {
    if (this.usuario.usuario == '') {
      this.vaciarInputs();
    }
    this.usuariosFiltrados = this.usuarios.filter((f) =>
      f.usuario.toLowerCase().includes(this.usuario.usuario.toLowerCase())
    );
  }

  vaciarInputs() {
    this.usuario.nombre = '';
    this.usuario.contrasena = '';
    this.usuario.apellido1 = '';
    this.usuario.apellido2 = '';
    this.usuario.email = '';
    this.usuario.telefono = '';
    this.usuario.cp = '';
    this.usuario.direccion = '';
  }
}
