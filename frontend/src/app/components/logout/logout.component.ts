import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { HeaderComponent } from '../../components/header/header.component';

import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-logout',
  imports: [RouterLink, HeaderComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

}
