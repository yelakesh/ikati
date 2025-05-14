import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { RouterLink } from "@angular/router";
import { RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


interface Breadcrumb {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumb',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  breadcrumbs: Breadcrumb[] = [];

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    // Obtén la ruta actual inmediatamente cuando el componente se inicia
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    
    // Construye el breadcrumb basado en la URL actual
    this.breadcrumbs = this.buildBreadCrumbFromUrl(currentUrl);
    
    
    // También suscríbete a cambios futuros en la ruta
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.breadcrumbs = this.buildBreadCrumbFromUrl(this.router.url);
      
    });
  }
  
  buildBreadCrumbFromUrl(url: string): Breadcrumb[] {
    // Implementa la lógica para construir el breadcrumb desde la URL
    const segments = url.split('/').filter(segment => segment);
    const breadcrumbs: Breadcrumb[] = [];
    
    // Siempre añade 'Inicio'
    breadcrumbs.push({ label: 'Inicio', url: '/home' });
    
    let currentPath = '';
    segments.forEach(segment => {
      currentPath += `/${segment}`;
      // Busca el nombre del breadcrumb en las rutas configuradas
      const breadcrumbLabel = this.getBreadcrumbLabel(segment);
      if (breadcrumbLabel) {
        breadcrumbs.push({ label: breadcrumbLabel, url: currentPath });
      }
    });
    
    return breadcrumbs;
  }
  
  getBreadcrumbLabel(segment: string): string {
    // Mapea los segmentos de URL a nombres de breadcrumb
    const breadcrumbMap: {[key: string]: string} = {
      'home': 'Inicio',
      'servicios': 'Servicios',
      'ofertas' : 'Ofertas',
      'registro': 'Crear Cuenta',
      'login': 'Iniciar Sesión',
      'cambiar-pass-admin': 'Cambiar Password',
      'perfil': 'Mi Perfil'

    };
    return breadcrumbMap[segment] || segment;
  }
}  