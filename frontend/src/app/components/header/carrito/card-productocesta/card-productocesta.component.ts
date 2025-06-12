import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";
import { CarroService } from '../../../../services/carro.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-card-productocesta',
  imports: [CommonModule],
  templateUrl: './card-productocesta.component.html',
  styleUrl: './card-productocesta.component.css'
})
export class CardProductocestaComponent implements OnInit {

  constructor(private CarroService: CarroService, private snackBar: MatSnackBar) { }

  @Input() producto: any
  @Input() variante: any
  @Output() pasarPrecioFinal = new EventEmitter<number>()


  nombreProducto: string = ""
  miniatura: string = ""
  cantidad: number = 0
  nombreVariante: string = ""
  descuento: string = ""
  precio: string = ""
  precioConDto: any
  tieneDto: boolean = false
  precioFinal: number = 0
  id_variante: number = 0
  importeTotal: number = 0



  ngOnInit(): void {

    this.cargarProductos()
  }

  cargarProductos() {
    this.descuento = this.producto.producto.producto.descuento
    this.precio = this.variante.precio

    this.miniatura = this.producto.producto.imagenes[0].nombre
    this.nombreProducto = this.producto.producto.producto.nombre
    this.nombreVariante = this.variante.valor_variacion
    this.id_variante = this.variante.id
    this.cantidad = parseInt(this.variante.cantidad)
    this.precioConDto = this.asignarPrecio()
    this.precioFinal = (this.asignarPrecio() * this.cantidad)
    this.pasarPrecioFinal.emit(this.precioFinal)



  }

  asignarPrecio() {

    const precio = parseFloat(this.precio)
    const dto = parseFloat(this.descuento)

    if (dto != 0) {
      const descuentoCalculado = precio * (dto / 100)


      const resultado = precio - descuentoCalculado




      this.tieneDto = true

      return (Math.floor(resultado * 100) / 100)

    } else {
      return parseFloat(this.precio)
    }

  }

  borrarProductoCarrito() {
    const idVariante = this.id_variante
    const cantidad = this.cantidad   

    this.CarroService.eliminarDeCarro({ id_variante: idVariante, unidades: cantidad }).subscribe({

      next: (respuesta) => {
        if (respuesta.ok) {
          this.snackBar.open('Producto eliminado de la cesta', 'Cerrar', {
            duration: 3000,
            panelClass: []
          });

          this.CarroService.notificarActualizacionCarrito()



        }
      },
      error: (error) => {
        console.error('Error cargando datos:', error);
        alert('No se pudo eliminar el producto del carrito');
      }
    })


  }


}


