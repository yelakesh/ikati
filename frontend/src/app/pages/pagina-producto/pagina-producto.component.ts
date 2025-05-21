import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink, Router } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { GridProductosComponent } from "../home/body/grid-productos/grid-productos.component";
import { ActivatedRoute } from '@angular/router';
import { HeaderGridService } from '../../services/header-grid.service';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-pagina-producto',
  imports: [HeaderComponent, BreadcrumbComponent],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent {



  constructor(private route: ActivatedRoute, private ProductoService: ProductoService) { }

  producto: any


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    // Usa el id para cargar los datos del producto

      if (id) {
    this.cargarProducto(id);
  }

  }

  async cargarProducto(id:string) {
    this.ProductoService.obtenerProductoPorId({id}).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.producto = respuesta.producto;

          console.log(this.producto);


        }
      },
      error: (error) => {

        console.error('Error al cargar el producto:', error);
      },
    });
  }
}

