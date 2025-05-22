import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-pagina-producto',
  imports: [HeaderComponent, BreadcrumbComponent, CommonModule],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent {



  constructor(private route: ActivatedRoute, private ProductoService: ProductoService) { }

  producto: any
  imagenes: any
  valoracion = 0;


  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarProducto(id);
      

    }
    

  }



  async cargarProducto(id: string) {
    this.ProductoService.obtenerProductoPorId({ id }).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.producto = respuesta.producto;
          this.imagenes= respuesta.imagenes

          this.valoracion = 100 - (this.producto.valoracion * 20);

          console.log(this.imagenes);


        }
      },
      error: (error) => {

        console.error('Error al cargar el producto:', error);
      },
    });
  }
}

