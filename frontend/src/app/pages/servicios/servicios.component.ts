import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { BodyServiciosComponent } from "../../components/body-servicios/body-servicios.component";

@Component({
  selector: 'app-servicios',
  imports: [HeaderComponent, BreadcrumbComponent, BodyServiciosComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent {

}
