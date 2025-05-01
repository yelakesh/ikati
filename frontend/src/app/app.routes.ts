import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { HomeComponent } from './pages/home/home.component';


export const routes: Routes = [
    
    { path: '', redirectTo: '/administracion', pathMatch: 'full' },
    {path:"login", component:LoginComponent},
    {path:"administracion", component:AdministracionComponent},
    {path:"home", component:HomeComponent}

];
