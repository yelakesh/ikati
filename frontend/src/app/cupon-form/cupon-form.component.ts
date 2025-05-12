import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CuponService } from '../services/cupon.service';
import { HttpClientModule } from '@angular/common/http';
import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-cupon-form',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cupon-form.component.html',
  styleUrl: './cupon-form.component.css',
})
export class CuponFormComponent {
  constructor(private router: Router, private CuponService: CuponService) {}

  tiposDescuento = [
    { valor: 'porcentaje', texto: 'Porcentaje' },
    { valor: 'fijo', texto: 'Fijo' },
  ];
  cupon = {
    codigo: '',
    activo: 0,
    descuento: 0,
    tipo_descuento: '',
    fecha_expiracion: '',
  };

  cupones: any[] = [];
  cuponesFiltrados: any[] = [];

  @Input() modo: string = '';

  completarDatos() {
    this.vaciarInputs;

    this.CuponService.obtenerPorCodigo(this.cupon).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.cupon.codigo = respuesta.cupon.codigo;
          this.cupon.activo = respuesta.cupon.activo;
          this.cupon.descuento = respuesta.cupon.descuento;
          this.cupon.tipo_descuento = respuesta.cupon.tipo_descuento;
          this.cupon.fecha_expiracion = respuesta.cupon.fecha_expiracion;
        }
      },
      error: () => {
        alert('Cupón no encontrado');
      },
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.cupon = {
        codigo: '',
        activo: 0,
        descuento: 0,
        tipo_descuento: '',
        fecha_expiracion: '',
      };
    }
  }
  ngOnInit(): void {
    this.cargarCupones();
  }

  async nuevoCupon() {
    if (this.formularioValido()) {
      this.CuponService.crearCupon(this.cupon).subscribe({
        next: (respuesta) => {
          alert(respuesta.mensaje);
          this.cargarCupones();
        },
        error: (err) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });
    }
  }

  modificar() {
    if (this.formularioValido()) {
      this.CuponService.modificarPorCodigo(this.cupon).subscribe({
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

  async eliminar() {
    this.CuponService.eliminarPorCodigo(this.cupon).subscribe({
      next: (respuesta) => {
        alert(respuesta.mensaje);
      },
      error: (err) => {
        console.log(err);
        alert(err.error.mensaje);
      },
    });
    this.cargarCupones();
  }

  async cargarCupones() {
    this.CuponService.obtenerTodos().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.cupones = respuesta.cupon;
          this.cuponesFiltrados = this.cupones;
        }
      },
      error: (error) => {
        
      },
    });
  }

  filtrarCupones() {
    if (this.cupon.codigo == '') {
      this.vaciarInputs();
    }
    this.cuponesFiltrados = this.cupones.filter((f) =>
      f.codigo.toLowerCase().includes(this.cupon.codigo.toLowerCase())
    );
  }

  vaciarInputs() {
    this.cupon.activo = 0;
    this.cupon.descuento = 0;
    this.cupon.tipo_descuento = '';
    this.cupon.fecha_expiracion = '';
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
    if (this.cupon.tipo_descuento == '') {
      document.getElementById('selectDTO')?.focus();
      alert('Seleccione el tipo de descuento');
      return false;
    }
    if (this.cupon.fecha_expiracion == '') {
      document.getElementById('fechaFin')?.focus();
      alert('Seleccione una fecha válida');
      return false;
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
}
