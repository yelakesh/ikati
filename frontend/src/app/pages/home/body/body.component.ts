import { Component } from '@angular/core';
import { GridProductosComponent } from "./grid-productos/grid-productos.component";

@Component({
  selector: 'app-body',
  imports: [GridProductosComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
