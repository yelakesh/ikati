import { Component } from '@angular/core';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { NgFor } from '@angular/common';
import { ProductoService } from '../../../../services/producto.service';
import { HeaderGridService } from '../../../../services/header-grid.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-grid-productos',
  imports: [CardProductoComponent, NgFor],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css',
})
export class GridProductosComponent {
  constructor(
    private productoService: ProductoService,
    private header_grid: HeaderGridService,
    private route: ActivatedRoute
  ) {}
  productos: any = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      const id_animal = this.route.snapshot.paramMap.get('id_animal');
      const id_tipo = this.route.snapshot.paramMap.get('id_tipo');

      if (id_tipo) {
        this.obtenerProductosPorIdAnimalYTipo(
          { id: id_animal },
          { id: id_tipo }
        );
      } else if (id_animal) {
        this.obtenerProductosPorAnimal({ id: id_animal });
      } else {
        this.obtenerProductos();
        this.header_grid.porAnimal$.subscribe((data: any) => {
          if (data.id) {
            this.obtenerProductosPorAnimal(data);
          }
        });
        this.header_grid.porAnimalYTipo$.subscribe((data: any) => {
          if (data.objAnimal) {
            this.obtenerProductosPorIdAnimalYTipo(data.objAnimal, data.objTipo);
          }
        });
      }

    });
    
  }

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
}
