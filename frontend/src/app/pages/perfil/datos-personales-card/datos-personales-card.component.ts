import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-datos-personales-card',
  imports: [RouterLink],
  templateUrl: './datos-personales-card.component.html',
  styleUrls: ['./datos-personales-card.component.css']

})
export class DatosPersonalesCardComponent {

  @Input() usuario: any

}


