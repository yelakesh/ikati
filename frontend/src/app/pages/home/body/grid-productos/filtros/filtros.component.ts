import {
  ChangeDetectionStrategy,
  Component,
  computed,
  EventEmitter,
  Input,
  input,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { TipoProductoService } from '../../../../../services/tipo_producto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeaderGridService } from '../../../../../services/header-grid.service';
import { MarcaService } from '../../../../../services/marca.service';
import { TipoFiltroService } from '../../../../../services/tipo_filtro.service';
import { FiltrosService } from '../../../../../services/filtros.service';
import { interval, Observable } from 'rxjs';

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
  constructor(
    private route: ActivatedRoute,
    private marcaService: MarcaService,
    private tipoProductoService: TipoProductoService,
    private filtrosService: FiltrosService
  ) {}

  @Input() productos: any = [];
  @Output() productosChange = new EventEmitter<object[]>();

  filtrosTotales?:
    | [
        {
          tipoFiltro: string;
          filtros: [
            { id: number; filtro: string; check: boolean; productos: [number] }
          ];
        }
      ]
    | any;
  marcas:
    | [{ id: number; marca: string; check: boolean; productos: [number] }]
    | any;
  tipos:
    | [{ id: number; tipo: string; check: boolean; productos: [number] }]
    | any;
  oferta?: { oferta: 'En oferta'; check: boolean };
  valoracion: number = 0;
  accion: string | null = '';
  animal: string | null = '';
  tipo: string | null = '';

  ngOnInit(): void {
    this.route.paramMap.subscribe(async () => {
      this.accion = this.route.snapshot.paramMap.get('accion');
      this.animal =
        this.accion == 'animal' || this.accion == 'animal_tipo'
          ? this.route.snapshot.paramMap.get('filtro1')
          : null;
      this.tipo =
        this.accion == 'animal_tipo'
          ? this.route.snapshot.paramMap.get('filtro2')
          : null;

      if (this.animal) {
        await this.cargarMarcasPorAnimal();
      }
      if (!this.tipo && this.animal) {
        await this.cargarTiposPorAnimal();
        await this.cargarFiltrosPorAnimal();
      }
      if (this.tipo) {
        await this.cargarFiltrosPorAnimalYTipo();
      }
    });
  }

  async cargarMarcasPorAnimal() {
    this.marcas = [];
    this.marcaService
      .obtenerFiltroPorAnimal({ idAnimal: this.animal })
      .subscribe({
        next: (respuesta) => {
          if (respuesta.ok) {
            respuesta.marcas.forEach(
              (a: {
                id_marca: number;
                nombre: string;
                id_producto: number;
              }) => {
                const marcaEncontrada = this.marcas.find(
                  (m: { id: number }) => {
                    return m.id == a.id_marca;
                  }
                );
                if (marcaEncontrada) {
                  marcaEncontrada.productos.push(a.id_producto);
                } else {
                  this.marcas.push({
                    id: a.id_marca,
                    marca: a.nombre,
                    check: false,
                    productos: [a.id_producto],
                  });
                }
              }
            );
          }
        },
        error: () => {
          alert('Error en la carga de marcas');
        },
      });
  }

  async cargarTiposPorAnimal() {
    this.tipos = [];
    this.tipoProductoService
      .obtenerFiltroPorIdAnimal({ idAnimal: this.animal })
      .subscribe({
        next: (respuesta) => {
          if (respuesta.ok) {
            respuesta.tipo_Producto.forEach(
              (a: { id: number; id_producto: number; tipo: string }) => {
                const tipoEncontrado = this.tipos.find((m: { id: number }) => {
                  return m.id == a.id;
                });

                if (tipoEncontrado) {
                  tipoEncontrado.productos.push(a.id_producto);
                } else {
                  this.tipos.push({
                    id: a.id,
                    tipo: a.tipo,
                    check: false,
                    productos: [a.id_producto],
                  });
                }
              }
            );
          }
        },
      });
  }

  async cargarFiltrosPorAnimal() {
    this.filtrosTotales = [];
    this.filtrosService.obtenerPorAnimal({ idAnimal: this.animal }).subscribe({
      next: (respuesta) => {
        respuesta.filtros.forEach(
          (a: {
            nombre: string;
            id: number;
            valor: string;
            id_producto: number;
          }) => {
            const tipoExistente = this.filtrosTotales.find(
              (f: { tipoFiltro: any }) => f.tipoFiltro === a.nombre
            );

            if (tipoExistente) {
              if (
                !tipoExistente.filtros.find(
                  (f: { filtro: any }) => f.filtro === a.valor
                )
              ) {
                tipoExistente.filtros.push({
                  id: a.id,
                  filtro: a.valor,
                  check: false,
                  productos: [a.id_producto],
                });
              } else {
                tipoExistente.filtros
                  .find((f: { filtro: any }) => f.filtro === a.valor)
                  .productos.push(a.id_producto);
              }
            } else {
              this.filtrosTotales.push({
                tipoFiltro: a.nombre,
                filtros: [
                  {
                    id: a.id,
                    filtro: a.valor,
                    check: false,
                    productos: [a.id_producto],
                  },
                ],
              });
            }
          }
        );
      },
    });
  }

  async cargarFiltrosPorAnimalYTipo() {
    this.filtrosTotales = [];
    this.filtrosService
      .obtenerPorAnimalYTipo({ idAnimal: this.animal, idTipo: this.tipo })
      .subscribe({
        next: (respuesta) => {
          respuesta.filtros.forEach(
            (a: {
              nombre: string;
              id: number;
              valor: string;
              id_producto: number;
            }) => {
              const tipoExistente = this.filtrosTotales.find(
                (f: { tipoFiltro: any }) => f.tipoFiltro === a.nombre
              );

              if (tipoExistente) {
                if (
                  !tipoExistente.filtros.find(
                    (f: { filtro: any }) => f.filtro === a.valor
                  )
                ) {
                  tipoExistente.filtros.push({
                    id: a.id,
                    filtro: a.valor,
                    check: false,
                    productos: [a.id_producto],
                  });
                } else {
                  tipoExistente.filtros
                    .find((f: { filtro: any }) => f.filtro === a.valor)
                    .productos.push(a.id_producto);
                }
              } else {
                this.filtrosTotales.push({
                  tipoFiltro: a.nombre,
                  filtros: [
                    {
                      id: a.id,
                      filtro: a.valor,
                      check: false,
                      productos: [a.id_producto],
                    },
                  ],
                });
              }
            }
          );
        },
      });
  }

  filtrar() {
    let productosFiltrados: any[] = [];

    for (let i = 0; i < this.productos.length; i++) {
      let valido = true;
      this.marcas.forEach((marca: { check: any; productos: any[] }) => {
        if (marca.check) {
          if (
            marca.productos.indexOf(this.productos[i].producto.id_producto) ==
            -1
          ) {
            valido = false;
          }
        }
      });

      this.tipos.forEach((tipo: { check: any; productos: string | any[] }) => {
        if (tipo.check) {
          if (
            tipo.productos.indexOf(this.productos[i].producto.id_producto) == -1
          ) {
            valido = false;
          }
        }
      });

      if (this.productos[i].producto.valoracion < this.valoracion) {
        valido = false;
      }

      this.filtrosTotales.forEach((f: { filtros: any[]; }) => {
        f.filtros.forEach((filtro) => {
          if (filtro.check) {
            if (
              filtro.productos.indexOf(
                this.productos[i].producto.id_producto
              ) == -1
            ) {
              valido = false;
            }
          }
        });
      });

      if (valido) {
        productosFiltrados.push(this.productos[i]);
      }
    }

    this.productosChange.emit(productosFiltrados);
  }
}
