import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { AnimalService } from '../../services/animal.service';
import { TipoProductoService } from '../../services/tipo_producto.service';
import { HeaderGridService } from '../../services/header-grid.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  usuario!: Observable<any>;
  open = false;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private animalService: AnimalService,
    private tiposervice: TipoProductoService,
    private header_grid: HeaderGridService
  ) {}

  showBanner = true;
  animales: {
    id: number;
    nombre: string;
    tipos: { id: number; tipo: string }[];
  }[] = [];

  ngOnInit() {
    this.usuario = this.usuarioService.usuario;
    this.cargarAnimales();
  }

  logOut() {
    this.usuarioService.logOut();
    this.router.navigate(['/logout']);
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
                tipos: await this.cargarTipos({ id: a.id, tipo: a.nombre }),
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
    id: number;
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

  filtrarPorAnimal(objAnimal: object) {
    this.header_grid.porAnimal$.next(objAnimal);
  }

  filtrarPorAnimalYTipo(objAnimal: object, objTipo: object) {
    this.header_grid.porAnimalYTipo$.next({objAnimal, objTipo});
  }
}

