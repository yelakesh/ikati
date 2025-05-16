import { Component } from '@angular/core';
import { CardProductoComponent } from "./card-producto/card-producto.component";
import { NgFor } from '@angular/common';
import { ProductoService } from '../../../../services/producto.service';

@Component({
  selector: 'app-grid-productos',
  imports: [CardProductoComponent,NgFor],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css'
})
export class GridProductosComponent {
  constructor(private productoService:ProductoService ){}
  productos:any=[]

  ngOnInit(): void {
    this.obtenerProductos()
    
    
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

}
