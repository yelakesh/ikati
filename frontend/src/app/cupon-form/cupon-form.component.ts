
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../servicios/cupon.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-cupon-form',
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './cupon-form.component.html',
  styleUrl: './cupon-form.component.css'
})
export class CuponFormComponent {

  constructor(private router: Router, private CuponService: CuponService) { }

  tiposDescuento = [
    { valor: 'porcentaje', texto: 'Porcentaje' },
    { valor: 'fijo', texto: 'Fijo' }
  ];
  cupon = {
    codigo: '',
    activo: 0,
    descuento: 0,
    tipo_descuento: '',
    fecha_expiracion: '',
  };
  @Input() modo: string = '';

  completarDatosCupon() {
    this.cupon.activo = 0
    this.cupon.descuento = 0
    this.cupon.tipo_descuento = ""
    console.log(this.cupon.fecha_expiracion)
    this.cupon.fecha_expiracion = ''



    this.CuponService.obtenerPorCodigo(this.cupon).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.cupon.codigo = respuesta.cupon.codigo
          this.cupon.activo = respuesta.cupon.activo
          this.cupon.descuento = respuesta.cupon.descuento
          this.cupon.tipo_descuento = respuesta.cupon.tipo_descuento
          this.cupon.fecha_expiracion = respuesta.cupon.fecha_expiracion

          console.log(respuesta.cupon.fecha_expiracion)


        }
      },
      error: () => {
        alert('Cupón no encontrado');
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.cupon = {
        codigo: '',
        activo: 0,
        descuento: 0,
        tipo_descuento: '',
        fecha_expiracion: ''

      };

    }
  }

  nuevoCupon() {
    this.CuponService.crearCupon(this.cupon).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }

  modificar() {
    this.CuponService.modificarPorCodigo(this.cupon).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje)
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })
  }

  eliminar() {
    this.CuponService.eliminarPorCodigo(this.cupon).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
      },
      error: (err) => {
        console.log(err)
        alert(err.error.mensaje)
      }
    })

  }
}
