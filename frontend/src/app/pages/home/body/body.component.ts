import { Component } from '@angular/core';
import { GridProductosComponent } from "./grid-productos/grid-productos.component";
import { SelectorAnimalComponent } from "../../../components/selector-animal/selector-animal.component";

@Component({
  selector: 'app-body',
  imports: [GridProductosComponent, SelectorAnimalComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.css'
})
export class BodyComponent {

}
