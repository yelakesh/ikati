import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdministracionComponent } from './administracion/administracion.component';
import { HomeComponent } from './pages/home/home.component';
import { adminGuard } from './guards/admin.guard';
import { ServiciosComponent } from "./pages/servicios/servicios.component";
import { OfertasComponent } from "./pages/ofertas/ofertas.component";
import { RegistroComponent } from "./registro/registro.component";
import { RegistroExitoComponent } from "./components/registro-exito/registro-exito.component";
import { LogoutComponent } from "./components/logout/logout.component";
import { CambiarPassAdminComponent } from './components/cambiar-pass-admin/cambiar-pass-admin.component';
import { GestionCuentasComponent } from "./pages/gestion-cuentas/gestion-cuentas.component";
import { PerfilComponent } from "./pages/perfil/perfil.component";
import { EditpasswordComponent } from "./pages/perfil/contrasena-card/editpassword/editpassword.component";
import { PaginaProductoComponent } from "./pages/pagina-producto/pagina-producto.component";


export const routes: Routes = [

    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: "login", component: LoginComponent },
    { path: "administracion", component: AdministracionComponent, canActivate: [adminGuard] },
    { path: "home", component: HomeComponent, data: { breadcrumb: 'Inicio' } },
    { path: "servicios", component: ServiciosComponent, data: { breadcrumb: 'Servicios' } },
    { path: "ofertas", component: OfertasComponent, data: { breadcrumb: 'Ofertas' } },
    { path: "registro", component: RegistroComponent, data: { breadcrumb: 'Registro' } },
    { path: 'registro-exito', component: RegistroExitoComponent },
    { path: 'logout', component: LogoutComponent },
    { path: 'cambiar-pass-admin', component: CambiarPassAdminComponent, data: { breadcrumb: 'Cambiar Contrasena' } },
    { path: 'gestion-cuentas', component: GestionCuentasComponent, data: { breadcrumb: 'Gestion Cuentas' } },
    {
        path: 'perfil',
        component: PerfilComponent, data: { breadcrumb: "Mi perfil" }

    },
    { path: 'editpassword', component: EditpasswordComponent },
    { path: 'pagina-producto/:id', component: PaginaProductoComponent, data: { breadcrumb: 'Producto' } }


];
