import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-datos-personales-card',
  imports: [],
  templateUrl: './datos-personales-card.component.html',
  styleUrl: './datos-personales-card.component.css'
})
export class DatosPersonalesCardComponent {

  @Input() usuario: any
}
