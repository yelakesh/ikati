import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { AdministracionComponent } from "./administracion/administracion.component";
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { MatTabsModule } from '@angular/material/tabs';




@Component({
  selector: 'app-root',
  imports: [MatTabsModule,RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ikati_prueba';
}
