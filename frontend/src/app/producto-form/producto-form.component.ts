import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../services/producto.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent {
  constructor(private productoService: ProductoService) {}

  @Input() modo: string = '';
  soloLectura = this.modo == 'eliminar' ? true : false;

  producto = {
    nombre: '',
    descripcion: '',
    activo: 1,
    animal: '',
    marca: '',
    tipo: '',
    descuento: 0,
    valoracion: 0,
  };

  nombre_variacion = '';

  variantes = [{ valor_variacion: '', precio: 0, stock: 0 }];

  filtros = [{ filtro: '', valor: '' }];

  imagenes = [{ file: null as null | File, base64: '' }];

  nombresSelect: string[] = [];
  nombresFiltrados: string[] = [];

  animalesSelect: string[] = [];
  animalesFiltrados: string[] = [];

  marcasSelect: string[] = [];
  marcasFiltradas: string[] = [];

  tiposSelect: string[] = [];
  tiposFiltrados: string[] = [];

  variantesSelect: string[] = [];
  variantesFiltrados: string[] = [];

  filtrosSelect: string[] = [];
  filtrosFiltrados: string[] = [];

  async ngOnInit(): Promise<void> {
    await this.cargarNombres();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.vaciarInputs();
    }
  }

  nuevoFiltro() {
    this.filtros.push({ filtro: '', valor: '' });
  }

  eliminarFiltro(i: number) {
    this.filtros.splice(i, 1);
  }

  nuevaVariante() {
    this.variantes.push({
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

  completarDatos() {
    (this.producto.descripcion = ''),
      (this.producto.activo = 1),
      (this.producto.animal = ''),
      (this.producto.marca = ''),
      (this.producto.tipo = ''),
      (this.producto.descuento = 0),
      (this.producto.valoracion = 0),
      (this.nombre_variacion = ''),
      (this.variantes = [
        {
          valor_variacion: '',
          precio: 0,
          stock: 0,
        },
      ]);
    this.filtros = [
      {
        filtro: '',
        valor: '',
      },
    ];
    this.imagenes = [];
    if (this.producto.nombre != '') {
      this.productoService.obtenerProductoCompleto(this.producto).subscribe({
        next: (respuesta) => {
          if (respuesta.ok) {
            (this.producto.descripcion = respuesta.producto.descripcion),
              (this.producto.activo = respuesta.producto.activo),
              (this.producto.animal = respuesta.producto.animal),
              (this.producto.marca = respuesta.producto.marca),
              (this.producto.tipo = respuesta.producto.tipo),
              (this.producto.descuento = respuesta.producto.descuento),
              (this.producto.valoracion = respuesta.producto.valoracion);

            this.nombre_variacion = respuesta.nombre_variacion;
            this.variantes = respuesta.variantes;
            this.filtros = respuesta.filtros;

            for (const imagen of respuesta.imagenes) {
              if (imagen.url) {
                fetch('http://localhost:3000/imagenesProductos/' + imagen.url)
                  .then((response) => response.blob())
                  .then(async (blob) => {
                    const file = new File([blob], imagen.url, {
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
      nombre: '',
      descripcion: '',
      activo: 1,
      animal: '',
      marca: '',
      tipo: '',
      descuento: 0,
      valoracion: 0,
    };
    this.nombre_variacion = '';
    this.variantes = [
      {
        valor_variacion: '',
        precio: 0,
        stock: 0,
      },
    ];

    this.filtros = [
      {
        filtro: '',
        valor: '',
      },
    ];
    this.imagenes = [{ file: null, base64: '' }];
  }

  async registrar() {
    if (this.formularioValido()) {
      const formData = new FormData();

      formData.append('producto', JSON.stringify(this.producto));
      formData.append('nombre_variacion', this.nombre_variacion);
      formData.append('filtros', JSON.stringify(this.filtros));
      formData.append('variantes', JSON.stringify(this.variantes));

      this.imagenes.forEach((img) => {
        if (img.file) {
          formData.append('imagenes', img.file);
        }
      });

      this.productoService.registrarProductoCompleto(formData).subscribe({
        next: (respuesta) => {
          alert(respuesta.mensaje);
        },
        error: (err) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });

      await this.cargarNombres();
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
    const formData = new FormData();

    formData.append('producto', JSON.stringify(this.producto));
    formData.append('nombre_variacion', this.nombre_variacion);
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

  eliminar() {
    this.productoService.eliminarProducto(this.producto).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
        this.vaciarInputs();
      },
      error: (err) => {
        console.log(err);
        alert(err.error.mensaje);
      },
    });
    this.cargarNombres;
  }

  async cargarNombres() {
    this.nombresSelect = [];
    this.productoService.obtenerNombres().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.nombres.forEach((n: { nombre: string }) => {
            this.nombresSelect.push(n.nombre);
          });
        }
      },
      error: () => {
        alert('Cupón no encontrado');
      },
    });
    this.nombresFiltrados = this.nombresSelect;
  }

  filtrarNombres() {
    if (this.producto.nombre == '') {
      this.vaciarInputs();
    }
    this.nombresFiltrados = this.nombresSelect.filter((f) =>
      f.toLowerCase().includes(this.producto.nombre.toLowerCase())
    );
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
}
