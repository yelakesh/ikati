import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-direccion-envio-card',
  imports: [RouterLink],
  templateUrl: './direccion-envio-card.component.html',
  styleUrl: './direccion-envio-card.component.css'
})
export class DireccionEnvioCardComponent {

  @Input() usuario: any
  @Input() direccion: any
}
