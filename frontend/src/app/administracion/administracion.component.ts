import { Component } from '@angular/core';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { CuponFormComponent } from '../cupon-form/cupon-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-administracion',
  imports: [UsuarioFormComponent,CommonModule, CuponFormComponent],
  templateUrl: './administracion.component.html',
  styleUrl: './administracion.component.css'
})
export class AdministracionComponent {

  protected modo =""
  formularioVisible: string | null = null;

mostrarFormulario(nombre: string, modo:string) {
  this.formularioVisible = nombre
  this.modo=modo
}

}
