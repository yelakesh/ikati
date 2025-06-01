import { Component } from '@angular/core';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { NgFor } from '@angular/common';
import { ProductoService } from '../../../../services/producto.service';
import { HeaderGridService } from '../../../../services/header-grid.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from "./filtros/filtros.component";

@Component({
  selector: 'app-grid-productos',
  imports: [CardProductoComponent, NgFor, CommonModule, FiltrosComponent],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css',
})
export class GridProductosComponent {
  constructor(
    private productoService: ProductoService,
    //private header_grid: HeaderGridService,
    private route: ActivatedRoute
  ) {}
  productos: any = [];
  accion:string|null =''

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.accion = this.route.snapshot.paramMap.get('accion');
      const filtro1 = this.route.snapshot.paramMap.get('filtro1');
      const filtro2 = this.route.snapshot.paramMap.get('filtro2');

      if (this.accion == 'animal_tipo') {
        this.obtenerProductosPorIdAnimalYTipo({ id: filtro1 }, { id: filtro2 });
      } else if (this.accion == 'animal') {
        this.obtenerProductosPorAnimal({ id: filtro1 });
      } else if (this.accion == 'buscar') {
        this.buscarProductosPorNombre(filtro1);
      } else if (this.accion == 'ofertas') {
        this.obtenerProductosEnOferta();
      } else {
        this.obtenerProductosRecomendados()
        //   this.header_grid.porAnimal$.subscribe((data: any) => {
        //     if (data.id) {
        //       this.obtenerProductosPorAnimal(data);
        //     }
        //   });
        //   this.header_grid.porAnimalYTipo$.subscribe((data: any) => {
        //     if (data.objAnimal) {
        //       this.obtenerProductosPorIdAnimalYTipo(data.objAnimal, data.objTipo);
        //     }
        //   });
      }
    });
  }
  obtenerProductosRecomendados() {
    this.productoService.obtenerRecomendados().subscribe({
      next: (res) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });  }

  obtenerProductos() {
    this.productoService.obtenerTodos().subscribe({
      next: (res) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }

  obtenerProductosPorAnimal(objAnimal: object) {
    this.productos = [];
    this.productoService.obtenerPorAnimal(objAnimal).subscribe({
      next: (res) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }

  obtenerProductosPorIdAnimalYTipo(objAnimal: object, objTipo: object) {
    this.productos = [];
    this.productoService.obtenerPorAnimalYTipo(objAnimal, objTipo).subscribe({
      next: (res) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }

  buscarProductosPorNombre(textoBusqueda: string | null) {
    if (textoBusqueda) {
      this.productos = [];
      this.productoService.buscarPorNombre(textoBusqueda).subscribe({
        next: (res) => {
          if (res.productos.length) {
            this.productos = res.productos;
          } else {
            alert('No se han encontrado productos con ese nombre');
            this.obtenerProductos();
          }
        },
        error: (err) => {
          console.error('Error al obtener productos:', err);
        },
      });
    }
  }
  obtenerProductosEnOferta() {
    this.productoService.obtenerEnOferta().subscribe({
      next: (res) => {
        this.productos = res.productos;
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });  }
}
