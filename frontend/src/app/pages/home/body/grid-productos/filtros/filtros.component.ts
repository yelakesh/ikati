import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlider, MatSliderModule } from '@angular/material/slider';
import { TipoProductoService } from '../../../../../services/tipo_producto.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MarcaService } from '../../../../../services/marca.service';
import { FiltrosService } from '../../../../../services/filtros.service';

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
            {
              id: number;
              filtro: string;
              check: boolean;
              productos: [number];
              visible: boolean;
            }
          ];
        }
      ]
    | any;
  marcas:
    | [
        {
          id: number;
          marca: string;
          check: boolean;
          productos: [number];
          visible: boolean;
        }
      ]
    | any;
  tipos:
    | [
        {
          id: number;
          tipo: string;
          check: boolean;
          productos: [number];
          visible: boolean;
        }
      ]
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
                    visible: true,
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
                    visible: true,
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
                  visible: true,
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
                    visible: true,
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

  filtrar(check: string) {
    let productosFiltrados: any[] = [];

    for (let i = 0; i < this.productos.length; i++) {
      let marcaValido = false;
      let tipoValido = false;
      let valoracionValido = false;
      let filtrosValido = true;

      let hayMarcas = false;
      let hayTipos = false;
      let hayFiltros = false;

      this.marcas.forEach((marca: { check: any; productos: any[] }) => {
        if (marca.check) {
          hayMarcas = true;
          if (
            marca.productos.indexOf(this.productos[i].producto.id_producto) !=
            -1
          ) {
            marcaValido = true;
          }
        }
      });
      if (!hayMarcas) {
        marcaValido = true;
      }

      if (this.tipos) {
        this.tipos.forEach(
          (tipo: { check: any; productos: string | any[] }) => {
            if (tipo.check) {
              hayTipos = true;
              if (
                tipo.productos.indexOf(
                  this.productos[i].producto.id_producto
                ) != -1
              ) {
                tipoValido = true;
              }
            }
          }
        );
      }
      if (!hayTipos) {
        tipoValido = true;
      }

      if (this.productos[i].producto.valoracion >= this.valoracion) {
        valoracionValido = true;
      }
      
      this.filtrosTotales.forEach((f: { filtros: any[] }) => {
        hayFiltros = false;
        var filtrosParcial=false;
        
        f.filtros.forEach((filtro) => {
          if (filtro.check) {
            hayFiltros = true;
            if (
              filtro.productos.indexOf(
                this.productos[i].producto.id_producto
              ) != -1
            ) {
              filtrosParcial = true;
            }
          }
        });
        if (!hayFiltros) {
          filtrosParcial = true;
        }
        filtrosValido=filtrosParcial&&filtrosValido
      });
      
      

      if (tipoValido && marcaValido && valoracionValido && filtrosValido) {
        productosFiltrados.push(this.productos[i]);
      }
    }
    this.ocultarFiltros(productosFiltrados, check);
    this.productosChange.emit(productosFiltrados);
  }

  ocultarFiltros(productosFiltrados: any[], check: string) {
    if (check != 'marca') {
      this.marcas.forEach(
        (marca: { visible: boolean; productos: string | any[] }) => {
          marca.visible = false;
          productosFiltrados.forEach((producto) => {
            if (marca.productos.includes(producto.producto.id_producto)) {
              marca.visible = true;
            }
          });
        }
      );
    }

    if (check != 'tipo') {
      this.tipos.forEach(
        (tipo: { visible: boolean; productos: string | any[] }) => {
          tipo.visible = false;
          productosFiltrados.forEach((producto) => {
            if (tipo.productos.includes(producto.producto.id_producto)) {
              tipo.visible = true;
            }
          });
        }
      );
    }

    this.filtrosTotales.forEach(
      (filtroGeneral: { filtros: any[]; tipoFiltro: string }) => {
        if (check != filtroGeneral.tipoFiltro) {
          filtroGeneral.filtros.forEach((filtro) => {
            filtro.visible = false;
            productosFiltrados.forEach((producto) => {
              if (filtro.productos.includes(producto.producto.id_producto)) {
                filtro.visible = true;
              }
            });
          });
        }
      }
    );

    const algunaMarcaSeleccionada = this.marcas.some((m: { check: any; }) => m.check);
    const algunTipoSeleccionado = this.tipos.some((t: { check: any; }) => t.check);
    const algunFiltroSeleccionado = this.filtrosTotales.some((fg: { filtros: any[]; }) =>
      fg.filtros.some((f: { check: any; }) => f.check)
    );

    if (
      !algunaMarcaSeleccionada &&
      !algunTipoSeleccionado &&
      !algunFiltroSeleccionado
    ) {
      this.mostrarTodos();
    }
  }

  mostrarTodos() {
    this.marcas.forEach(
      (marca: { visible: boolean; productos: string | any[] }) => {
        marca.visible = true;
      }
    );

    this.tipos.forEach(
      (tipo: { visible: boolean; productos: string | any[] }) => {
        tipo.visible = true;
      }
    );

    this.filtrosTotales.forEach(
      (filtroGeneral: { filtros: any[]; tipoFiltro: string }) => {
        filtroGeneral.filtros.forEach((filtro) => {
          filtro.visible = true;
        });
      }
    );
  }
}
