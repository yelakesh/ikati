import { Component,ViewChild  } from '@angular/core';
import { UsuarioFormComponent } from '../usuario-form/usuario-form.component';
import { HeaderComponent } from '../components/header/header.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [UsuarioFormComponent,HeaderComponent,BreadcrumbComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {

  @ViewChild('formulario') formularioComponent!: UsuarioFormComponent
  registrar() {
    this.formularioComponent.registrar()
  }
}

