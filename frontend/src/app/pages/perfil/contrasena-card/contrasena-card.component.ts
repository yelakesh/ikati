import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contrasena-card',
  imports: [RouterLink],
  templateUrl: './contrasena-card.component.html',
  styleUrl: './contrasena-card.component.css'
})
export class ContrasenaCardComponent {
@Input() usuario: any
}
