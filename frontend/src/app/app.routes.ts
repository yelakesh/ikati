import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { RegistroComponent } from './registro/registro.component';


export const routes: Routes = [
    
    {path:"login", component:LoginComponent},
    {path:"administracion", component:AdministracionComponent},
    {path:"registro", component:RegistroComponent}

];
