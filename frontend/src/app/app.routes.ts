import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './guards/admin.guard';
import { ServiciosComponent } from "./pages/servicios/servicios.component";


export const routes: Routes = [
    
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    {path:"login", component:LoginComponent},
    {path:"administracion", component:AdministracionComponent, canActivate:[adminGuard]},
    {path:"home", component:HomeComponent, data: { breadcrumb: 'Inicio' }},
    {path:"servicios", component:ServiciosComponent, data: { breadcrumb: 'Servicios' }}

];
