import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { adminService } from '../../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './admin-form.component.html',
  styleUrl: './admin-form.component.css'
})
export class AdminFormComponent {

  constructor(private router: Router, private adminService: adminService) { }
  admin = {
    usuario: '',
    contrasena: '',
    antigua: '',
    nueva: ''

  };
  @Input() modo: string = '';

  crearAdmin() {
    this.adminService.crearAdmin(this.admin).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }



  eliminarAdministrador() {
    if (window.confirm('¿Estás seguro que quieres eliminar a '+this.admin.usuario+'?')) {
      this.adminService.eliminarAdmin(this.admin).subscribe({
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
  cambiarPassword() {

    if (this.admin.antigua === this.admin.nueva) {
      alert('La nueva contraseña no puede ser igual a la antigua');
      return;
    }

    this.adminService.cambiarPass(this.admin).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
        this.admin.antigua = '';
        this.admin.nueva = '';
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }
}
