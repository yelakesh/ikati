import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HeaderComponent } from '../../components/header/header.component';

import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-registro-exito',
  imports: [RouterLink, BreadcrumbComponent, HeaderComponent],
  templateUrl: './registro-exito.component.html',
  styleUrl: './registro-exito.component.css'
})
export class RegistroExitoComponent {

}
