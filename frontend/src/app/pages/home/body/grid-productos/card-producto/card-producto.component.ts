import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-producto',
  imports: [],
  templateUrl: './card-producto.component.html',
  styleUrl: './card-producto.component.css',
})
export class CardProductoComponent {
  @Input() producto: any;
  
}
