import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AdministracionComponent } from "./administracion/administracion.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AdministracionComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ikati_prueba';
}
