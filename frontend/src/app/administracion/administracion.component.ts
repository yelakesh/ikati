import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { CuponFormComponent } from '../cupon-form/cupon-form.component';
import { ServicioFormComponent} from '../servicio-form/servicio-form.component';
import { ProductoFormComponent } from '../producto-form/producto-form.component';
import { CommonModule } from '@angular/common';
import { AdminFormComponent } from '../admin-form/admin-form.component';
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
