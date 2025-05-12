import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductoService } from '../services/producto.service';
import { AnimalService } from '../services/animal.service';
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
  constructor(
    private productoService: ProductoService,
    private animalService: AnimalService
  ) {}

  @Input() modo: string = '';
  soloLectura = this.modo == 'eliminar' ? true : false;

  nombreAnimal = '';

  producto = {
    id: 0,
    nombre: '',
    descripcion: '',
    activo: 1,
    id_animal: '',
    id_marca: '',
    id_tipo: '',
    descuento: 0,
    valoracion: 0,
  };

  id_variacion = '';

  variantes = [{ valor_variacion: '', precio: 0, stock: 0 }];

  filtros = [{ filtro: '', valor: '' }];

  imagenes = [{ file: null as null | File, base64: '' }];

  productosSelect: { id: number; nombre: string }[] = [];
  productosFiltrados: { id: number; nombre: string }[] = [];

  animalesSelect: { id: string; nombre: string }[] = [];
  animalesFiltrados: { id: string; nombre: string }[] = [];

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
    await this.cargarAnimales();
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

  async completarDatos() {
    (this.producto.descripcion = ''),
      (this.producto.activo = 1),
      (this.producto.id_animal = ''),
      (this.producto.id_marca = ''),
      (this.producto.id_tipo = ''),
      (this.producto.descuento = 0),
      (this.producto.valoracion = 0),
      (this.id_variacion = ''),
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
      this.productoService.obtenerProductoPorId(this.producto).subscribe({
        next: async (respuesta) => {
          if (respuesta.ok) {
            (this.producto.descripcion = respuesta.producto.descripcion),
              (this.producto.activo = respuesta.producto.activo),
              (this.producto.id_animal = respuesta.producto.id_animal),
              (this.producto.id_marca = respuesta.producto.id_marca),
              (this.producto.id_tipo = respuesta.producto.id_tipo),
              (this.producto.descuento = respuesta.producto.descuento),
              (this.producto.valoracion = respuesta.producto.valoracion);

            this.id_variacion = respuesta.nombre_variacion;
            this.variantes = respuesta.variantes;
            this.filtros = respuesta.filtros;
            this.obtenerNombreAnimal();

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
      id: 0,
      nombre: '',
      descripcion: '',
      activo: 1,
      id_animal: '',
      id_marca: '',
      id_tipo: '',
      descuento: 0,
      valoracion: 0,
    };
    this.nombreAnimal = '';
    this.id_variacion = '';
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
      formData.append('id_variacion', this.id_variacion);
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
      if (
        inputs[i].required &&
        (inputs[i].value == '' || inputs[i].value == '0')
      ) {
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
      formData.append('nombre_variacion', this.id_variacion);
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
          respuesta.productos.forEach((n: { id: number; nombre: string }) => {
            this.productosSelect.push({ id: n.id, nombre: n.nombre });
          });
        }
      },
      error: () => {
        alert('Cupón no encontrado');
      },
    });
    this.productosFiltrados = this.productosSelect;
  }

  cambiarId(id: number) {
    this.producto.id = id;
  }

  filtrarProductos() {
    if (this.producto.nombre == '') {
      this.vaciarInputs();
    }
    this.productosFiltrados = this.productosSelect.filter((f) =>
      f.nombre.toLowerCase().includes(this.producto.nombre.toLowerCase())
    );
  }

  async cargarAnimales() {
    this.animalesSelect = [];
    this.animalService.obtenerAnimales().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.animales.forEach((a: { id: string; nombre: string }) => {
            this.animalesSelect.push({ id: a.id, nombre: a.nombre });
          });
        }
        this.animalesFiltrados = this.animalesSelect;
      },
      error: () => {
        alert('Error en la carga de animales');
      },
    });
  }

  filtrarAnimales() {
    this.animalesFiltrados = this.animalesSelect.filter((f) =>
      f.nombre.toLowerCase().includes(this.nombreAnimal.toLowerCase())
    );
  }
  obtenerNombreAnimal() {
    const animal = this.animalesSelect.find(
      (a) => a.id === this.producto.id_animal
    );
    if (animal) {
      this.nombreAnimal = animal?.nombre;
    }
  }
}
