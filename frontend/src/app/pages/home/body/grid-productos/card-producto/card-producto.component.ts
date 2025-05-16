import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  imports: [],
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
      if (variante.precio > this.precioMax) {
        this.precioMax = variante.precio;
      }
      if (variante.precio < this.precioMin) {
        this.precioMin = variante.precio;
      }
    });
  }
}
