import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Input,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProductoService } from '../services/producto.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.css',
})
export class ProductoFormComponent {
  constructor(
    private router: Router,
    private productoService: ProductoService
  ) {}

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

  variantes = [
    {
      valor_variacion: '',
      precio: 0,
      stock: 0,
    },
  ];

  filtros = [
    {
      filtro: '',
      valor: '',
    },
  ];
  imagenes = [
    {
      file: null as null | File,
      base64: '',
    },
  ];

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
  @Input() modo: string = '';

  completarDatosProducto() {
    (this.producto.descripcion = ''),
      (this.producto.activo = 1),
      (this.producto.animal = ''),
      (this.producto.marca = ''),
      (this.producto.tipo = ''),
      (this.producto.descuento = 0),
      (this.producto.valoracion = 0);
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
            fetch('http://localhost:4200/imagenes/productos/' + imagen.url)
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
          }
        }
      },
      error: () => {
        alert('Producto no encontrado');
      },
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
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
  }

  registrarProductoCompleto() {
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
}
