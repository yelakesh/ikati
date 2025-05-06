import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-ofertas',
  imports: [HeaderComponent, BreadcrumbComponent],
  templateUrl: './ofertas.component.html',
  styleUrl: './ofertas.component.css'
})
export class OfertasComponent {

}
