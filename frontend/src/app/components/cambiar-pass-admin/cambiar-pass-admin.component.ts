import { Component,ViewChild,Input  } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { AdminFormComponent } from "../../admin-form/admin-form.component";

@Component({
  selector: 'app-cambiar-pass-admin',
  imports: [ HeaderComponent, BreadcrumbComponent, AdminFormComponent],
  templateUrl: './cambiar-pass-admin.component.html',
  styleUrl: './cambiar-pass-admin.component.css'
})
export class CambiarPassAdminComponent {


  @Input() modo: string = '';
  @Input() origen: 'admin' | 'cambiar-pass-admin' = 'cambiar-pass-admin'; 
}
