import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { servicioService } from '../services/servicio.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-servicio-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './servicio-form.component.html',
  styleUrl: './servicio-form.component.css'
})
export class ServicioFormComponent {

  constructor(private router: Router, private servicioService: servicioService) { }

  servicio = {
    nombre: '',
    tipo: '',
    latitud: 0,
    longitud: 0,
    direccion: '',
    web: ''
  };
  @Input() modo: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.servicio = {
        nombre: '',
        tipo: '',
        latitud: 0,
        longitud: 0,
        direccion: '',
        web: '',

      };

    }
  }
  nuevoServicio() {
    this.servicioService.crearServicio(this.servicio).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }

  modificarServicio() {
    this.servicioService.modificarPorNombre(this.servicio).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }
  completarDatosServicio() {

    
    this.servicio.tipo = ""
    this.servicio.latitud = 0
    this.servicio.longitud = 0
    this.servicio.direccion = ""
    this.servicio.web = ""


    this.servicioService.obtenerPorNombre(this.servicio).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.servicio.nombre = respuesta.servicio.nombre
          this.servicio.tipo = respuesta.servicio.tipo
          this.servicio.latitud = respuesta.servicio.latitud
          this.servicio.longitud = respuesta.servicio.longitud
          this.servicio.direccion = respuesta.servicio.direccion
          this.servicio.web = respuesta.servicio.web


        }

      }

    })

    

  }

  eliminarPorNombre() {
    this.servicioService.eliminarPorNombre(this.servicio).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })

  }
}
