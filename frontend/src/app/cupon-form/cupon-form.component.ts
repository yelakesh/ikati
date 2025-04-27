
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CuponService } from '../servicios/cupon.service';
import { HttpClientModule} from '@angular/common/http';
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
    fecha_expiracion: null,
  };
  @Input() modo: string = '';

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
}
