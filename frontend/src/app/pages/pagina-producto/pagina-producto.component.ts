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
  variantes: any
  marcas: any
  precio: number = 0
  descuento: any
  precioConDto: number = 0
  varianteSeleccionada: any
  unidades: any = null
  stock: any


  pageLoad() {
    document.addEventListener("load", this.cambiarPrecio)
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarProducto(id);

    }


  }



  scrollToDescripcion(event: Event) {
    let etiquetaDestino = document.getElementById('descrip');
    event.preventDefault()
    if (etiquetaDestino) {

      etiquetaDestino.scrollIntoView({ behavior: 'smooth' });
    }
  }



  async cargarProducto(id: string) {
    this.ProductoService.obtenerProductoPorId({ id }).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.producto = respuesta.producto;
          this.imagenes = respuesta.imagenes
          this.variantes = respuesta.variantes

          this.valoracion = 100 - (this.producto.valoracion * 20);

          this.precio = this.variantes[0].precio
          this.varianteSeleccionada = this.variantes[0].valor_variacion
          this.stock = this.variantes[0].stock
          this.precioConDto = this.precioConDescuento(this.variantes[0].precio)
          this.descuento = this.darFormatoDescuento()
        


          console.log(this.precioConDto)

        }

      },
      error: (error) => {

        console.error('Error al cargar el producto:', error);
      },
    });
  }
  cambiarPrecio() {
    let select: any = document.getElementById("selectOpciones")

    this.precioConDto = this.precioConDescuento(this.variantes[select.value].precio)
    console.log(this.precioConDto)
    if (this.producto.descuento != 0) {

      this.precio = this.variantes[select.value].precio - this.precioConDto
    }
    this.precio = this.variantes[select.value].precio
    this.varianteSeleccionada = this.variantes[select.value].valor_variacion
    this.stock = this.variantes[select.value].stock



  }

  sumarUno() {
    let numUnidades: any = document.getElementById("cantidad")

    if (numUnidades) {
      numUnidades.value++
      this.unidades = numUnidades.value

    }
  }
  restarUno() {
    let numUnidades: any = document.getElementById("cantidad")

    if (numUnidades.value > 1) {
      numUnidades.value--
      this.unidades = numUnidades.value

    }
  }
  precioConDescuento(price: string) {

    const precio = parseFloat(price)
    const dto = parseFloat(this.producto.descuento)

    console.log(precio, dto)
    const descuentoCalculado = precio * (dto / 100)

    console.log(descuentoCalculado)
    const resultado= this.precioConDto = precio - descuentoCalculado

    return Math.floor(resultado*100)/100

  }

  darFormatoDescuento(){
    const d= parseFloat(this.producto.descuento)

    const descuentoFormateado=Math.floor(d)+"%"

    console.log(descuentoFormateado)
    return descuentoFormateado
  }
}

