import { Component, Input, SimpleChanges } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos-anteriores-card',
  imports: [CommonModule],
  templateUrl: './pedidos-anteriores-card.component.html',
  styleUrl: './pedidos-anteriores-card.component.css',
})
export class PedidosAnterioresCardComponent {
  constructor(private usuarioService: UsuarioService) {}

  @Input() usuario: any;
  compras: any[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['usuario'] && changes['usuario'].currentValue) {
      if (this.usuario.id) {
        this.cargarCompras()
      }
      
    }
  }
  ngOnInit(): void {
  }

  async cargarCompras() {
    this.usuarioService
      .obtenerComprasConProductosPorIdUsuario(this.usuario.id)
      .subscribe({
        next: (res: any) => {
          if (res.ok) {
            this.compras = res.resultado;
            console.log(this.compras);
            
          }
        },
        error: (err) => {},
      });
  }
  
}
