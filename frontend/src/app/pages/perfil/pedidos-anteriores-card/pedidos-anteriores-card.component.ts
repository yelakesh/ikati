import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-pedidos-anteriores-card',
  imports: [],
  templateUrl: './pedidos-anteriores-card.component.html',
  styleUrl: './pedidos-anteriores-card.component.css'
})
export class PedidosAnterioresCardComponent {
  @Input() usuario: any
}
