import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProductoService } from '../../../services/producto.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CarroService } from '../../../services/carro.service';
import { FormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';



@Component({
  selector: 'app-carrito',
  imports: [CommonModule, FormsModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})





export class CarritoComponent implements OnInit {

  constructor(private ProductoService: ProductoService, private CarroService: CarroService, private usuarioService: UsuarioService) { }

  @Input() visible = false;
  @Output() cerrado = new EventEmitter<void>();
  @Output() cantidadProductosChange = new EventEmitter<number>();


  id_usuario: any
  id_producto: any
  producto: any
  productosTablaCarro: any
  cantidadProductos: number = 0
  rolUsuario: any
  imagen: any
  variantes: any

  productoFinal = {

    imagen: "",
    nombreProducto: "",
    varianteProducto: "",
    precio: 0,
    precioConDto: 0,
    cantidad: 0
  }

  arrayProductosFinales: any[] = []

  toogleCarrito() {
    this.cerrado.emit();
  }

  ngOnInit(): void {

    const usuarioSesion = sessionStorage.getItem('usuario');
    if (usuarioSesion) {

      const usuarioObj = JSON.parse(usuarioSesion)
      this.rolUsuario = usuarioObj.rol

      if (this.rolUsuario != "admin") {
        this.cargarDatosUsuario();
      }

    }


  }

  cargarDatosUsuario() {
    const usuarioGuardado = sessionStorage.getItem('usuario');


    if (usuarioGuardado) {

      const usuarioObj = JSON.parse(usuarioGuardado)
      const nombreUsu = usuarioObj.usuario

      this.usuarioService.obtenerPorUsuario({ usuario: nombreUsu }).subscribe({
        next: (respuesta) => {
          if (respuesta.ok) {
            this.id_usuario = respuesta.usuario.id;


            this.traerProductosCarrito()


          }
        },
        error: (error) => {
          console.error('Error cargando datos:', error);
          alert('No se pudieron cargar los datos del perfil');
        }
      });
    } else {
      alert('Usuario no autenticado');

    }
  }


  traerProductosCarrito() {
    this.CarroService.obtenerProductosCarritoPorIdUsuario({ id_usuario: this.id_usuario }).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.productosTablaCarro = respuesta.productos;
          this.cantidadProductos = this.sumarProductos();
          
          this.cantidadProductosChange.emit(this.cantidadProductos);
          this.arrayProductosFinales = [];

         
  }
}
    })
  }

 sumarProductos(){
 
  var cont=0
  
  this.productosTablaCarro.forEach((producto: { variantes: any[]; }) => {
    producto.variantes.forEach((variante: { cantidad: number; }) => {
      cont += variante.cantidad; 
    });

    
   });
   
return cont
  }
    

  // traerProductosCarrito() {



  //   this.CarroService.obtenerProductosCarritoPorIdUsuario({ id_usuario: this.id_usuario }).subscribe({
  //     next: (respuesta) => {
  //       if (respuesta.ok) {

  //         this.productosTablaCarro = respuesta.productos
  //         this.cantidadProductos = this.productosTablaCarro.length
  //         this.arrayProductosFinales = []




  //         for (const item of this.productosTablaCarro) {

  //           this.ProductoService.obtenerVariantePorIdVariante({ id_variante: item.id_variante }).subscribe({
  //             next: (res)=> {
  //               if(res){
  //                const productoFinal ={

  //                 }
  //               }
  //             }
  //           })


  //           this.ProductoService.obtenerProductoPorIdVariante({ id_variante: item.id_variante }).subscribe({
  //             next: (respuestaVariante) => {
  //               if (respuestaVariante) {

  //                 const id_producto = respuestaVariante[0].id_producto

  //                 this.ProductoService.obtenerProductoPorId({ id: id_producto }).subscribe({
  //                   next: (respuestaProducto) => {
  //                     if (respuestaProducto.ok) {

  //                       console.log(respuestaProducto);


  //                       const productoFinal = {
  //                         imagen: respuestaProducto.producto.imagenes[0].nombre,
  //                         nombreProducto: respuestaProducto.producto.producto.nombre,
  //                         varianteProducto: item.variantes,
  //                         precio: 0,
  //                         precioConDto: 0,
  //                         cantidad: 0
  //                       }

  //                       this.arrayProductosFinales.push(productoFinal)

  //                       console.log(this.arrayProductosFinales);

  //                     }
  //                   }
  //                 })

  //               }
  //             }
  //           })
  //         }


  //       }

  //     },
  //     error: (error) => {

  //       console.error('Error al cargar el producto:', error);
  //     },
  //   });
  // }

  // traerProductoPorIdVariante() {
  //   this.ProductoService.obtenerProductoPorIdVariante({ productos: this.productosTablaCarro }).subscribe({
  //     next: (respuesta) => {
  //       if (respuesta.ok) {
  //         const productos = respuesta.productos;

  //         console.log(productos);

  //         let idProd: "";
  //         for (const producto of productos) {

  //           idProd = producto.id_producto;

  //           this.cargarProducto(idProd)
  //         }

  //       }
  //     },
  //     error: (error) => {
  //       console.error('Error al cargar el producto:', error);
  //     },
  //   });
  // }

  // async cargarProducto(id: string) {
  //   this.ProductoService.obtenerProductoPorId({ id_producto: id }).subscribe({
  //     next: (respuesta) => {
  //       if (respuesta.ok) {
  //         this.variantes = respuesta.producto.variantes
  //         this.productoFinal.nombreProducto = respuesta.producto.producto.nombre;
  //         this.productoFinal.imagen = respuesta.producto.imagenes[0].nombre;
  //         this.productoFinal.precio = this.variantes[0].precio
  //         this.productoFinal.varianteProducto = respuesta.producto.variantes[0].valor_variacion
  //         // this.productoFinal.precioConDto = this.precioConDescuento(this.variantes[0].precio)

  //         console.log("respuesta para obtenerProductoPorId",respuesta);
  //         console.log("this.producto final",this.productoFinal);


  //       }

  //     },
  //     error: (error) => {

  //       console.error('Error al cargar el producto:', error);
  //     },
  //   });
  // }

  // precioConDescuento(price: string) {

  //   const precio = parseFloat(price)
  //   const dto = parseFloat(this.producto.descuento)


  //   const descuentoCalculado = precio * (dto / 100)


  //   const resultado = this.productoFinal.precioConDto = precio - descuentoCalculado

  //   return Math.floor(resultado * 100) / 100

  // }




}

