import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { MapaComponent } from './mapa/mapa.component';

@Component({
  selector: 'app-servicios',
  imports: [HeaderComponent, BreadcrumbComponent, MapaComponent],
  templateUrl: './servicios.component.html',
  styleUrl: './servicios.component.css'
})
export class ServiciosComponent implements OnInit {

  ngOnInit(): void {
      window.scrollTo(0, 0);
  }
  
}
