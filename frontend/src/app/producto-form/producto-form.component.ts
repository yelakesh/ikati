import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../servicios/usuario.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent {

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  producto = {
    nombre: '',
    descripcion: '',
    miniatura: '',
    animal: '',
    marca: '',
    tipo: '',
    descuento: '',
    valoracion: '',

  }

  nombre_variacion=''

  variantes = [
    {
    valor_variacion: '',
    precio: '',
    stock: ''
  }
]


  imagenes = [{
    url: ''
  }]

  filtros = [
    {
      filtro: '',
      valor: ''
    }
  ]

  nuevoFiltro() {
    this.filtros.push({ filtro: '', valor: '' });
  }

  eliminarFiltro(i: number) {
    this.filtros.splice(i, 1)
  }

  nuevaImagen() {
    this.imagenes.push({ url: ''});
  }

  eliminarImagen(i: number) {
    this.imagenes.splice(i,1)
      }
  nuevaVariante() {
    this.variantes.push( {
      valor_variacion: '',
      precio: '',
      stock: ''
    });
  }

  eliminarVariante(i: number) {
    this.variantes.splice(i,1)
      }




  @Input() modo: string = '';

  /*
    completarDatosProducto() {
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
          if (respuesta.mensaje === 'Usuario encontrado') {
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
          direccion: ''
  
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
  */

}
