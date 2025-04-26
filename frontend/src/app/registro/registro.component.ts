import { Component,ViewChild  } from '@angular/core';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [UsuarioFormComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  @ViewChild('formulario') formularioComponent!: UsuarioFormComponent
  registrar() {
    this.formularioComponent.registrar()
  }
}

