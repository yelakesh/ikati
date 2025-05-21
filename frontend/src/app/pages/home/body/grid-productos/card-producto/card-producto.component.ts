import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-producto',
  imports: [RouterLink, CommonModule],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css',
})
export class CardProductoComponent {
  @Input() producto: any;
  precioMin: number = 0;
  precioMax: number = 0;
  valoracion = 0;
  ngOnInit(): void {
    this.calcularPrecios();
    this.valoracion =100-(this.producto.producto.valoracion*20);
  }
  calcularPrecios() {
    this.precioMin = this.producto.variantes[0].precio;
    this.producto.variantes.forEach((variante: any) => {
      if (parseInt(variante.precio) > this.precioMax) {
        this.precioMax = variante.precio;
        //console.log(typeof);
        
      }
      if (parseInt(variante.precio) < this.precioMin) {
        this.precioMin = variante.precio;
      }
    });
  }
}
