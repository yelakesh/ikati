import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ProductoService } from '../../../services/producto.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CarroService } from '../../../services/carro.service';
import { FormsModule } from '@angular/forms';

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

  id_usuario: any
  productosCarro: any 
  cantidadProductos: number = 0
  rolUsuario: any

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

      this.CarroService.obtenerProductosCarritoPorIdUsuario({id_usuario: this.id_usuario}).subscribe({
        next: (respuesta) => {
          if (respuesta.ok) {
            
            this.productosCarro =respuesta.productos
            this.cantidadProductos = this.productosCarro.length

            console.log(this.cantidadProductos);
            
            

            
            

            



          }

        },
        error: (error) => {

          console.error('Error al cargar el producto:', error);
        },
      });
    }

  }




