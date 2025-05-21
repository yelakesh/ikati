import { Component } from '@angular/core';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { NgFor } from '@angular/common';
import { ProductoService } from '../../../../services/producto.service';
import { HeaderGridService } from '../../../../services/header-grid.service';

@Component({
  selector: 'app-grid-productos',
  imports: [CardProductoComponent, NgFor],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css',
})
export class GridProductosComponent {
  constructor(
    private productoService: ProductoService,
    private header_grid: HeaderGridService
  ) {}
  productos: any = [];

  ngOnInit(): void {
    this.obtenerProductos();
    this.header_grid.porAnimal$.subscribe((data: any) => {
      this.obtenerProductosPorAnimal(data);
    });
    this.header_grid.porAnimalYTipo$.subscribe((data: any) => {
      this.obtenerProductosPorIdAnimalYTipo(data.objAnimal, data.objTipo);
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
