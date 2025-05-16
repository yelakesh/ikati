import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../forms/usuario-form/usuario-form.component';
import { CuponFormComponent } from '../forms/cupon-form/cupon-form.component';
import { ServicioFormComponent } from '../forms/servicio-form/servicio-form.component';
import { ProductoFormComponent } from '../forms/producto-form/producto-form.component';
import { CommonModule } from '@angular/common';
import { AdminFormComponent } from '../forms/admin-form/admin-form.component';
import { HeaderComponent } from '../components/header/header.component';

@Component({
  selector: 'app-administracion',
  imports: [
    AdminFormComponent,
    UsuarioFormComponent,
    CommonModule,
    CuponFormComponent,
    ServicioFormComponent,
    ProductoFormComponent,
    HeaderComponent,
  ],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css',
})
export class AdministracionComponent {
  protected modo = '';
  formularioVisible: string | null = null;

  mostrarFormulario(nombre: string, modo: string) {
    this.formularioVisible = nombre;
    this.modo = modo;
  }
}
