import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../../services/producto.service';
import { TipoProductoService } from '../../services/tipo_producto.service';
import { TipoVarianteService } from '../../services/tipo_variante.service';
import { TipoFiltroService } from '../../services/tipo_filtro.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { AnimalInputComponent } from "./inputs/animal/animal-input.component";
import { MarcaInputComponent } from "./inputs/marca/marca-input.component";

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CKEditorModule,
    AnimalInputComponent,
    MarcaInputComponent
  ],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent {
  constructor(
    private productoService: ProductoService,
    private tipoProductoService: TipoProductoService,
    private tipoVarianteService: TipoVarianteService,
    private tipoFiltroService: TipoFiltroService
  ) { }

  public Editor: any = ClassicEditor;

  @Input() modo: string = '';
  soloLectura = this.modo == 'eliminar' ? true : false;

  nombreTipo_Producto = '';
  nombreTipo_Variante = '';

  producto = {
    id_producto: 0,
    nombre: '',
    descripcion: '',
    activo: 1,
    id_animal: 0,
    id_marca: 0,
    id_tipo_producto: 0,
    descuento: 0,
    valoracion: 0,
  };

  id_tipo_variante = 0;
  variantes = [
    { id_tipo_variante: 0, valor_variacion: '', precio: 0, stock: 0 },
  ];

  filtros = [{ id_filtro: 0, valor: '', nombre: '' }];

  imagenes = [{ file: null as null | File, base64: '' }];

  productosSelect: { id_producto: number; nombre: string }[] = [];
  productosFiltrados: { id_producto: number; nombre: string }[] = [];

  tipos_productoSelect: { id: number; tipo: string }[] = [];
  tipos_productoFiltrados: { id: number; tipo: string }[] = [];

  tipos_variantesSelect: { id: number; tipo: string }[] = [];
  tipos_variantesFiltrados: { id: number; tipo: string }[] = [];

  filtrosSelect: { id: number; nombre: string }[] = [];
  filtrosFiltrados: { id: number; nombre: string }[] = [];


  displayProducto(producto: any): string {
    return producto && producto.nombre ? producto.nombre : '';
  }
  async ngOnInit(): Promise<void> {
    await this.cargarNombres();
    await this.cargarTipos_Producto();
    await this.cargarTipos_Variante();
    await this.cargarTipos_Filtro();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.vaciarInputs();
    }
  }

  nuevoFiltro() {
    this.filtros.push({
      id_filtro: 0,
      valor: '',
      nombre: '',
    });
    this.filtrarTipos_Filtro(this.filtros.length - 1);
    console.log(this.filtros);
  }

  eliminarFiltro(i: number) {
    this.filtros.splice(i, 1);
  }

  nuevaVariante() {
    this.variantes.push({
      id_tipo_variante: 0,
      valor_variacion: '',
      precio: 0,
      stock: 0,
    });
  }

  eliminarVariante(i: number) {
    this.variantes.splice(i, 1);
  }

  nuevaImagen() {
    this.imagenes.push({ file: null, base64: '' });
  }

  eliminarImagen(i: number) {
    this.imagenes.splice(i, 1);
  }

  async completarDatos() {
    (this.producto.descripcion = ''),
      (this.producto.activo = 1),
      (this.producto.id_animal = 0),
      (this.producto.id_marca = 0),
      (this.producto.id_tipo_producto = 0),
      (this.producto.descuento = 0),
      (this.producto.valoracion = 0),
      (this.id_tipo_variante = 0),
      (this.variantes = [
        {
          id_tipo_variante: 0,
          valor_variacion: '',
          precio: 0,
          stock: 0,
        },
      ]);
    this.filtros = [
      {
        valor: '',
        id_filtro: 0,
        nombre: '',
      },
    ];
    this.imagenes = [];
    if (this.producto.nombre != '') {
      this.productoService.obtenerProductoPorId(this.producto).subscribe({
        next: async (respuesta) => {
          if (respuesta.ok) {
            (this.producto.descripcion = respuesta.producto.descripcion),
              (this.producto.activo = respuesta.producto.activo),
              (this.producto.id_animal = respuesta.producto.id_animal),
              (this.producto.id_marca = respuesta.producto.id_marca),
              (this.producto.id_tipo_producto = respuesta.producto.id_tipo),
              (this.producto.descuento = respuesta.producto.descuento),
              (this.producto.valoracion = respuesta.producto.valoracion);

            this.id_tipo_variante = respuesta.variantes[0].id_variacion;
            this.variantes = respuesta.variantes;
            this.filtros = respuesta.filtros;
            this.obtenerTipos_Producto();
            this.obtenerTipos_Variante();
            this.obtenerTipos_Filtro();

            for (const imagen of respuesta.imagenes) {
              if (imagen.nombre) {
                fetch(
                  'http://localhost:3000/imagenesProductos/' + imagen.nombre
                )
                  .then((response) => response.blob())
                  .then(async (blob) => {
                    const file = new File([blob], imagen.nombre, {
                      type: blob.type,
                    });
                    this.imagenes.push({
                      file: file,
                      base64: '',
                    });
                    await this.aBase64(file, this.imagenes.length - 1);
                  });
              } else {
                this.imagenes.push({
                  file: null,
                  base64: '',
                });
              }
            }
          }
        },
        error: () => {
          alert('Producto no encontrado');
        },
      });
    }
  }

  vaciarInputs() {
    this.producto = {
      id_producto: 0,
      nombre: '',
      descripcion: '',
      activo: 1,
      id_animal: 0,
      id_marca: 0,
      id_tipo_producto: 0,
      descuento: 0,
      valoracion: 0,
    };
    this.nombreTipo_Producto = '';
    this.nombreTipo_Variante = '';

    this.variantes = [
      {
        id_tipo_variante: 0,
        valor_variacion: '',
        precio: 0,
        stock: 0,
      },
    ];

    this.filtros = [
      {
        valor: '',
        id_filtro: 0,
        nombre: '',
      },
    ];
    this.imagenes = [{ file: null, base64: '' }];
    this.productosFiltrados=this.productosSelect
    this.filtrarTipos_Producto();
  }

  async registrar() {
    if (this.formularioValido()) {
      const formData = new FormData();

      formData.append('producto', JSON.stringify(this.producto));
      formData.append('filtros', JSON.stringify(this.filtros));
      formData.append('variantes', JSON.stringify(this.variantes));
      formData.append(
        'id_tipo_variante',
        JSON.stringify(this.id_tipo_variante)
      );

      this.imagenes.forEach((img) => {
        if (img.file) {
          formData.append('imagenes', img.file);
        }
      });

      this.productoService.registrarProductoCompleto(formData).subscribe({
        next: (respuesta) => {
          alert(respuesta.mensaje);
          this.cargarNombres();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });
    }
  }

  formularioValido() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].required && inputs[i].value == '') {
        alert('Debe rellenar todos los campos obligatorios');
        inputs[i].focus();
        return false;
      }
    }
    return true;
  }

  validarInput(event: any, tipo: string) {
    let valor = event.target.value + '';
    let tecla = event.key;
    let patron;

    switch (tipo) {
      case '0':
        patron = new RegExp(/^\d+$/);

        if (!patron.test(valor + tecla) && tecla.length === 1) {
          event.preventDefault();
        } else if (valor == '0') {
          event.target.value = '';
        }

        break;

      case '1':
        patron = new RegExp(/^\d+\.?\d?$/);

        if (!patron.test(valor + tecla) && tecla.length === 1 && tecla != '.') {
          event.preventDefault();
        } else if (valor === '0' && tecla != '.') {
          event.target.value = '';
        }
        break;

      case '2':
        patron = new RegExp(/^\d+\.?\d{0,2}$/);
        if (!patron.test(valor + tecla) && tecla.length === 1 && tecla != '.') {
          event.preventDefault();
        } else if (valor === '0' && tecla != '.') {
          event.target.value = '';
        }

        break;

      default:
        break;
    }
  }

  async guardarImagen(event: any, i: number) {
    let img = event.target.files[0];
    await this.aBase64(img, i);
    this.imagenes[i].file = img;
  }

  async aBase64(img: any, i: number) {
    const lector = new FileReader();

    lector.onload = () => {
      const base64 = lector.result as string;

      this.imagenes[i].base64 = base64;
    };

    lector.onerror = (error) => {
      console.error('Error al convertir a base64:', error);
    };

    lector.readAsDataURL(img);
  }

  modificar() {
    if (this.formularioValido()) {
      const formData = new FormData();

      formData.append('producto', JSON.stringify(this.producto));
      formData.append(
        'id_tipo_variante',
        JSON.stringify(this.id_tipo_variante)
      );
      formData.append('filtros', JSON.stringify(this.filtros));
      formData.append('variantes', JSON.stringify(this.variantes));

      this.imagenes.forEach((img) => {
        if (img.file) {
          formData.append('imagenes', img.file);
        }
      });

      this.productoService.modificarProducto(formData).subscribe({
        next: (respuesta) => {
          alert(respuesta.mensaje);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });
    }
  }

  eliminar() {
    this.productoService.eliminarProducto(this.producto).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
        this.vaciarInputs();
        this.cargarNombres();
      },
      error: (err) => {
        console.log(err);
        alert(err.error.mensaje);
      },
    });
  }

  async cargarNombres() {
    this.productosSelect = [];
    this.productoService.obtenerNombres().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.productos.forEach((p: { id_producto: number; nombre: string }) => {
            this.productosSelect.push({ id_producto: p.id_producto, nombre: p.nombre });
          });
        }
      },
      error: () => {
        alert('Error al cargar nombres');
      },
    });
    this.productosFiltrados = this.productosSelect;
  }

  cambiarId(id: number) {
    this.producto.id_producto = id;
  }

  filtrarProductos() {
    if (this.producto.nombre == '') {
      this.vaciarInputs();
    }
    this.productosFiltrados = this.productosSelect.filter((f) =>
      f.nombre.toLowerCase().includes(this.producto.nombre.toLowerCase())
    );
  }


  filtrarTipos_Producto() {
    this.tipos_productoFiltrados = this.tipos_productoSelect.filter((f) =>
      f.tipo.toLowerCase().includes(this.nombreTipo_Producto.toLowerCase())
    );
  }

  obtenerTipos_Producto() {
    const tipo = this.tipos_productoSelect.find(
      (m) => m.id === this.producto.id_tipo_producto
    );
    if (tipo) {
      this.nombreTipo_Producto = tipo?.tipo;
    }
  }

  async cargarTipos_Producto() {
    this.tipos_productoSelect = [];
    this.tipoProductoService.obtenerTodos().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.tipo_Producto.forEach(
            async (m: { id: number; tipo: string }) => {
              this.tipos_productoSelect.push({
                id: m.id,
                tipo: m.tipo,
              });
            }
          );
        }
        this.tipos_productoFiltrados = this.tipos_productoSelect;
      },
      error: () => {
        alert('Error en la carga de los tipos');
      },
    });
  }

  filtrarTipos_Variante() {
    this.tipos_variantesFiltrados = this.tipos_variantesSelect.filter((f) =>
      f.tipo.toLowerCase().includes(this.nombreTipo_Variante.toLowerCase())
    );
  }

  obtenerTipos_Variante() {
    const tipo = this.tipos_variantesSelect.find(
      (m) => m.id === this.id_tipo_variante
    );

    if (tipo) {
      this.nombreTipo_Variante = tipo?.tipo;
    }
  }

  async cargarTipos_Variante() {
    this.tipos_variantesSelect = [];
    this.tipoVarianteService.obtenerTodos().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.tipo_variante.forEach(
            async (m: { id: number; tipo: string }) => {
              this.tipos_variantesSelect.push({
                id: m.id,
                tipo: m.tipo,
              });
            }
          );
        }
        this.tipos_variantesFiltrados = this.tipos_variantesSelect;
      },
      error: () => {
        alert('Error en la carga de los tipos de variante');
      },
    });
  }

  filtrarTipos_Filtro(i: number) {
    this.filtrosFiltrados = this.filtrosSelect.filter((f) =>
      f.nombre.toLowerCase().includes(this.filtros[i].nombre.toLowerCase())
    );
  }

  obtenerTipos_Filtro() {
    for (let i = 0; i < this.filtros.length; i++) {
      const tipo = this.filtrosSelect.find(
        (m) => m.id === this.filtros[i].id_filtro
      );

      if (tipo) {
        this.filtros[i].nombre = tipo?.nombre;
      }
    }
  }

  async cargarTipos_Filtro() {
    this.filtrosSelect = [];
    this.tipoFiltroService.obtenerTodos().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.tipo_filtro.forEach(
            async (m: { id: number; nombre: string }) => {
              this.filtrosSelect.push({
                id: m.id,
                nombre: m.nombre,
              });
            }
          );
        }
        this.filtrosFiltrados = this.filtrosSelect;
      },
      error: () => {
        alert('Error en la carga de los tipos de variante');
      },
    });
  }

  trackByIndex(index: number, item: any): any {
    return index;
  }

  cambiarIdAnimal($event: number) {
    this.producto.id_animal = $event;
  }
  cambiarIdMarca($event: number) {
    this.producto.id_marca = $event;
  }

}
