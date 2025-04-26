import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministracionComponent } from './administracion/administracion.component';


export const routes: Routes = [
    
    {path:"login", component:LoginComponent},
    {path:"", component:AdministracionComponent}

];
