import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contrasena-card',
  imports: [],
  templateUrl: './contrasena-card.component.html',
  styleUrl: './contrasena-card.component.css'
})
export class ContrasenaCardComponent {
@Input() usuario: any
}
