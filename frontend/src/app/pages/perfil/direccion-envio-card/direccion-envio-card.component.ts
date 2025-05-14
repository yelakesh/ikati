import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-direccion-envio-card',
  imports: [],
  templateUrl: './direccion-envio-card.component.html',
  styleUrl: './direccion-envio-card.component.css'
})
export class DireccionEnvioCardComponent {

  @Input() usuario: any
  @Input() direccion: any
}
