import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { servicioService } from '../services/servicio.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-servicio-form',
  standalone:true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './servicio-form.component.html',
  styleUrl: './servicio-form.component.css'
})
export class ServicioFormComponent {

  constructor(private router:Router, private servicioService: servicioService) { }

  servicio ={
      nombre: '',
      tipo: '',
      latitud: 0,
      longitud: 0,
      direccion: '',
      web: ''
    };
  @Input() modo: string = '';

  nuevoServicio() {
    this.servicioService.crearServicio(this.servicio).subscribe({
      next: (respuesta)=> {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert (err.error.mensaje)
      }
    })
  }

  completarDatosServicio(){
    
  }



}
