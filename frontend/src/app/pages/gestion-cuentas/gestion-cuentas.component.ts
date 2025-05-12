import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { LoginComponent } from '../../login/login.component';
import { RegistroComponent } from "../../registro/registro.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gestion-cuentas',
  imports: [RouterLink,MatTabsModule, LoginComponent, RegistroComponent],
  templateUrl: './gestion-cuentas.component.html',
  styleUrl: './gestion-cuentas.component.css'
})
export class GestionCuentasComponent {

}
