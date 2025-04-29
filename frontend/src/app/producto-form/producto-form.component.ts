import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto.service'


@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css'
})
export class ProductoFormComponent {

  constructor(private router: Router, private productoService: ProductoService) { }

  producto = {
    nombre: '',
    descripcion: '',
    miniatura: '',
    animal: '',
    marca: '',
    tipo: '',
    descuento: '',
    valoracion: ''

  }

  nombre_variacion = ''

  variantes = [
    {
      valor_variacion: '',
      precio: '',
      stock: ''
    }
  ]


  imagenes = [{
    url: ''
  }]

  filtros = [
    {
      filtro: '',
      valor: ''
    }
  ]

  nuevoFiltro() {
    this.filtros.push({ filtro: '', valor: '' });
  }

  eliminarFiltro(i: number) {
    this.filtros.splice(i, 1)
  }

  nuevaImagen() {
    this.imagenes.push({ url: '' });
  }

  eliminarImagen(i: number) {
    this.imagenes.splice(i, 1)
  }
  nuevaVariante() {
    this.variantes.push({
      valor_variacion: '',
      precio: '',
      stock: ''
    });
  }

  eliminarVariante(i: number) {
    this.variantes.splice(i, 1)
  }




  @Input() modo: string = '';


  completarDatosProducto() {
    this.producto.descripcion = '',
      this.producto.miniatura = '',
      this.producto.animal = '',
      this.producto.marca = '',
      this.producto.tipo = '',
      this.producto.descuento = '',
      this.producto.valoracion = ''

    this.productoService.obtenerProductoCompleto(this.producto).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.producto.descripcion = respuesta.producto.descripcion,
            this.producto.miniatura = respuesta.producto.miniatura,
            this.producto.animal = respuesta.producto.animal,
            this.producto.marca = respuesta.producto.marca,
            this.producto.tipo = respuesta.producto.tipo,
            this.producto.descuento = respuesta.producto.descuento,
            this.producto.valoracion = respuesta.producto.valoracion

          this.nombre_variacion = respuesta.nombre_variacion
          this.variantes = respuesta.variantes
          this.filtros = respuesta.filtros
          this.imagenes = respuesta.imagenes

        }
      },
      error: () => {
        alert('Producto no encontrado');
      }
    })

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.producto = {
        nombre: '',
        descripcion: '',
        miniatura: '',
        animal: '',
        marca: '',
        tipo: '',
        descuento: '',
        valoracion: ''

      };

    }
  }

  registrarProductoCompleto() {

    let objProducto = Object.assign(this.producto,{nombre_variacion:this.nombre_variacion}, { filtros: this.filtros }, { variantes: this.variantes }, { imagenes: this.imagenes })

    this.productoService.registrarProductoCompleto(objProducto).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }

  /*eliminar() {
    this.usuarioService.eliminarPorUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
 
  }
  modificar() {
    this.usuarioService.modificarPorUsuario(this.usuario).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }
*/

}
