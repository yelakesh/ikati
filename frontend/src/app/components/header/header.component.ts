import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { AnimalService } from '../../services/animal.service';
import { TipoProductoService } from '../../services/tipo_producto.service';
import { HeaderGridService } from '../../services/header-grid.service';
import { Observable } from 'rxjs';
import { CarritoComponent } from "./carrito/carrito.component";
import { CarroService } from '../../services/carro.service';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, CarritoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit, OnDestroy {
  usuario!: Observable<any>;
  open = false;
  carritoVisible = false;
  menuAbierto: boolean = false;
  cantidadEnCarrito = 0
  private sub: any


  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private animalService: AnimalService,
    private tiposervice: TipoProductoService,
    private header_grid: HeaderGridService,
    private carroService: CarroService

  ) { }

  showBanner = true;
  animales: {
    id: number;
    nombre: string;
    tipos: { id: number; tipo: string }[];
  }[] = [];
  textoBusqueda = ''
  textoBusquedaFormateado = ''

  formatearTexto() {
    this.textoBusquedaFormateado = '%' + (this.textoBusqueda.trim()).replace(' ', '%') + '%'
  }


  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
     this.sub = this.carroService.cantidad$.subscribe(cantidad => {
       this.cantidadEnCarrito = cantidad;
     });
   
    this.cargarAnimales();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
      
  }

  logOut() {
    this.usuarioService.logOut();
    this.router.navigate(['/logout']);
  }

  buscar(evento: any) {
    if (evento.key == 'Enter') {
      this.router.navigate(['/home', 'buscar', this.textoBusquedaFormateado])

    }
  }
  cargarAnimales() {
    this.animalService.obtenerAnimales().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.animales.forEach(
            async (a: { id: number; nombre: string }) => {
              this.animales.push({
                id: a.id,
                nombre: a.nombre,
                tipos: await this.cargarTipos({ idAnimal: a.id, tipo: a.nombre }),
              });
            }
          );
        }
      },
      error: () => {
        alert('Error en la carga de animales');
      },
    });
  }

  async cargarTipos(objAnimal: {
    idAnimal: number;
    tipo: string;
  }): Promise<{ id: number; tipo: string }[]> {
    try {
      const respuesta = await this.tiposervice
        .obtenerPorIdAnimal(objAnimal)
        .toPromise();

      if (respuesta.ok) {
        return respuesta.tipo_Producto;
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error cargando tipos:', error);
      return [];
    }
  }

  toogleCarrito() {
    this.carritoVisible = !this.carritoVisible
  }

  actualizarCantidadCarrito(nuevaCantidad: number) {
    this.cantidadEnCarrito = nuevaCantidad;
  }

  // filtrarPorAnimal(objAnimal: object) {
  //   this.header_grid.porAnimal$.next(objAnimal);
  // }

  // filtrarPorAnimalYTipo(objAnimal: object, objTipo: object) {
  //   this.header_grid.porAnimalYTipo$.next({objAnimal, objTipo});
  // }
}

