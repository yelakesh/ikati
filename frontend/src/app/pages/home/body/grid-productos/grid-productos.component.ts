import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  Output,
  signal,
  AfterViewInit
} from '@angular/core';
import { CardProductoComponent } from './card-producto/card-producto.component';
import { NgFor } from '@angular/common';
import { ProductoService } from '../../../../services/producto.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FiltrosComponent } from './filtros/filtros.component';

@Component({
  selector: 'app-grid-productos',
  imports: [CardProductoComponent, NgFor, CommonModule, FiltrosComponent],
  templateUrl: './grid-productos.component.html',
  styleUrl: './grid-productos.component.css',
})
export class GridProductosComponent{
  constructor(
    private productoService: ProductoService,
    private route: ActivatedRoute
  ) {}
  productos: any = [];
  productosFiltrados: any = [];
  accion: string | null = '';

  

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
        this.obtenerProductosRecomendados();
        
      }
    });
  
  }
  private hacerScroll() {
    setTimeout(() => { 
      if (this.accion) {
        const grid = document.getElementById('grid-productos');
      if (grid) {
        grid.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest' 
        });
      }
        
      }
      else{
        const body = document.getElementsByTagName('body')[0];
      if (body) {
        body.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start',
          inline: 'nearest' 
        });
      }

      }
      
    }, 10);
  }

  
  obtenerProductosRecomendados() {
    this.productoService.obtenerRecomendados().subscribe({
      next: (res) => {
        this.productos = res.productos;
        this.productosFiltrados = this.productos;
        this.hacerScroll()
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }

  obtenerProductos() {
    this.productoService.obtenerTodos().subscribe({
      next: (res) => {
        this.productos = res.productos;
        this.productosFiltrados = this.productos;
        this.hacerScroll()
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
        this.productosFiltrados = this.productos;
        this.hacerScroll();
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
        this.productosFiltrados = this.productos;
        this.hacerScroll();
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
            this.productosFiltrados = this.productos;
            this.hacerScroll();
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
        this.productosFiltrados = this.productos;
        this.hacerScroll();
      },
      error: (err) => {
        console.error('Error al obtener productos:', err);
      },
    });
  }
  filtrar(productosFiltrados: any){
    this.productosFiltrados=productosFiltrados
  }
}
