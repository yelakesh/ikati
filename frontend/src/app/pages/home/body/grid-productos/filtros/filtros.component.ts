import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { TipoProductoService } from '../../../../../services/tipo_producto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../../../../services/usuario.service';
import { AnimalService } from '../../../../../services/animal.service';
import { HeaderGridService } from '../../../../../services/header-grid.service';
import { MarcaService } from '../../../../../services/marca.service';
import { TipoFiltroService } from '../../../../../services/tipo_filtro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-filtros',
  imports: [
    MatCheckboxModule,
    FormsModule,
    MatSlider,
    MatSliderModule,
    CommonModule,
  ],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css',
})
export class FiltrosComponent {
  filtrosTotales?: [
    { tipoFiltro: string; filtros: [{ filtro: string; check: boolean }] }
  ];
  constructor(
    private route: ActivatedRoute,
    private marcaService: MarcaService,
    private tipoProductoService: TipoProductoService,
  ) {}

  marcas: [{ id: number; marca: string; check: boolean }] | any;
  tipos: [{ tipo: string; check: boolean }] | any;
  oferta?: { oferta: 'En oferta'; check: boolean };
  valoracion?: number;
  accion: string | null = '';
  animal: string | null = '';
  tipo: string | null = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(async () => {
      this.accion = this.route.snapshot.paramMap.get('accion');
      this.animal = this.route.snapshot.paramMap.get('filtro1');
      this.tipo = this.route.snapshot.paramMap.get('filtro2');

      if (this.animal) {
        await this.cargarMarcasPorAnimal({ idAnimal: this.animal });
        
      }
      if(!this.tipo){
        await this.cargarTiposPorAnimal({ idAnimal: this.animal });
      }

    });
  }

  async cargarMarcasPorAnimal(idAnimal: { idAnimal: string | null }) {
    this.marcas = [];
    this.marcaService.obtenerPorAnimal(idAnimal).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.marcas.forEach((a: { id: number; nombre: string }) => {
            this.marcas.push({
              id: a.id,
              marca: a.nombre,
              check: false,
            });
          });
        }
      },
      error: () => {
        alert('Error en la carga de marcas');
      },
    });
  }

  async cargarTiposPorAnimal(idAnimal: object) {
    this.tipos = [];
    this.tipoProductoService.obtenerPorIdAnimal(idAnimal).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.tipo_Producto.forEach((a: { id: number; tipo: string; }) => {
            this.tipos.push({
              tipo: a.tipo,
              check: false,
            });
          });
        }
      },
    });
  }

  filtrar() {}
}
