import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-carrito',
  imports:[CommonModule],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  @Input() visible = false;
  @Output() cerrado = new EventEmitter<void>();

  toogleCarrito() {
    this.cerrado.emit();
  }
}

