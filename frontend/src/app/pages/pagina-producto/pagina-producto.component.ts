import { Component, Input } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../services/producto.service';
import { CarroService } from '../../services/carro.service';
import { UsuarioService } from '../../services/usuario.service';
import { AvisarStockService } from '../../services/avisarStock.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';




@Component({
  selector: 'app-pagina-producto',
  imports: [HeaderComponent, CommonModule, FormsModule],
  templateUrl: './pagina-producto.component.html',
  styleUrl: './pagina-producto.component.css'
})
export class PaginaProductoComponent {



  constructor(private route: ActivatedRoute, private ProductoService: ProductoService,
    private carroService: CarroService, private usuarioService: UsuarioService,
    private AvisarStockService: AvisarStockService, private snackBar: MatSnackBar) { }

  id_usuario: any
  producto: any
  imagenes: any = []
  valoracion = 0;
  id_variante: any
  variantes: any
  marcas: any
  precio: number = 0
  descuento: any
  precioConDto: number = 0
  varianteSeleccionada: any
  unidades: number = 1
  stock: any
  rolUsuario: any

  CantidadTotalProductos: number = 0

  showVerano = false;
  showVacaciones = false;

 



  productoAlCarro = {
    id_usuario: "",
    id_variante: "",
    cantidad: 0
  }

  datosAvisarStock = {
    id_variante: "",
    emailUsuario: ""
  }


  pageLoad() {
    document.addEventListener("load", this.cambiarPrecio)

  }

  ngOnInit() {

    window.scrollTo(0, 0);
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {    this.cargarProducto(id);

    
    this.carroService.carritoActualizado$.subscribe(() => {
      
      this.cargarProducto(id);
    });
    }

    const usuarioSesion = sessionStorage.getItem('usuario');
    if (usuarioSesion) {

      const usuarioObj = JSON.parse(usuarioSesion)
      this.rolUsuario = usuarioObj.rol

      if (this.rolUsuario != "admin") {
        this.cargarDatosUsuario();
      }

    }
  }



  scrollToDescripcion(event: Event) {
    let etiquetaDestino = document.getElementById('descrip');
    event.preventDefault()
    if (etiquetaDestino) {

      etiquetaDestino.scrollIntoView({ behavior: 'smooth' });
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
            this.productoAlCarro.id_usuario = respuesta.usuario.id;
            this.datosAvisarStock.emailUsuario = respuesta.usuario.email



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

  async cargarProducto(id: string) {
    this.ProductoService.obtenerProductoPorId({ id_producto: id }).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.producto = respuesta.producto.producto;
          this.imagenes = respuesta.producto.imagenes;
          this.variantes = respuesta.producto.variantes;

          
          
          

          this.valoracion = 100 - (this.producto.valoracion * 20);

          this.precio = this.variantes[0].precio
          this.varianteSeleccionada = this.variantes[0].valor_variacion
          this.stock = this.variantes[0].stock
          this.precioConDto = this.precioConDescuento(this.variantes[0].precio)
          this.descuento = this.darFormatoDescuento()
          this.productoAlCarro.id_variante = this.variantes[0].id
          this.datosAvisarStock.id_variante = this.variantes[0].id





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

    if (this.producto.descuento != 0) {

      this.precio = this.variantes[select.value].precio - this.precioConDto
    }
    this.stock = this.variantes[select.value].stock
    this.precio = this.variantes[select.value].precio
    this.varianteSeleccionada = this.variantes[select.value].valor_variacion
    this.stock = this.variantes[select.value].stock
    this.productoAlCarro.id_variante = this.variantes[select.value].id
    this.datosAvisarStock.id_variante = this.variantes[select.value].id
    this.unidades = 1



  }

  sumarUno() {
    this.unidades++
  }

  restarUno() {

    if (this.unidades > 1) {
      this.unidades--
    }
  }
  precioConDescuento(price: string) {

    const precio = parseFloat(price)
    const dto = parseFloat(this.producto.descuento)


    const descuentoCalculado = precio * (dto / 100)


    const resultado = this.precioConDto = precio - descuentoCalculado

    return Math.floor(resultado * 100) / 100

  }

  darFormatoDescuento() {
    const d = parseFloat(this.producto.descuento)

    const descuentoFormateado = Math.floor(d) + "%"


    return descuentoFormateado
  }

  get puedeComprar(): boolean {
    return (this.stock != 0)
  }

  async aLaCesta() {

    this.productoAlCarro.cantidad = this.unidades
    this.stock -= this.unidades;
    this.unidades = this.unidades > this.stock ? this.stock : this.unidades;
    this.carroService.anadiraCarro(this.productoAlCarro).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {


          this.carroService.obtenerProductosCarritoPorIdUsuario({ id_usuario: this.productoAlCarro.id_usuario }).subscribe({

            next: (res) => {
              if (res.ok) {
                this.carroService.notificarActualizacionCarrito()
                this.snackBar.open('Producto añadido al carrito', 'Cerrar', {
                  duration: 3000,
                  panelClass: ['custom-snackbar'] 
                });

                const productos = res.productos 
               
                

                this.CantidadTotalProductos = 0

                for (const producto of productos) {

                  for (const variante of producto.variantes) {

                    this.CantidadTotalProductos += parseInt(variante.cantidad)

                  }

                  
                }
                

                this.carroService.setCantidad(this.CantidadTotalProductos)

              }
            }
          })
        }

      },
      error: (error) => {

        console.error('Error al cargar el producto:', error);
      },
    });
  }

  async avisarStock() {

    this.AvisarStockService.anadiraAvisar(this.datosAvisarStock).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          alert(respuesta.mensaje)

        }


      },
      error: (error) => {

        alert(error.error.mensaje);
      },
    });
  }

   toggleVerano() {
    this.showVerano = !this.showVerano;
  }

  toggleVacaciones() {
    this.showVacaciones = !this.showVacaciones;
  }

  copiarAlPortapapeles(codigo: string) {
  navigator.clipboard.writeText(codigo);
  this.snackBar.open('Cupón copiado al Portapapeles', 'Cerrar', {
            duration: 3000,
            panelClass: []
          });
}

}

