import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from "../../shared/breadcrumb/breadcrumb.component";
import { BodyComponent } from "../../components/body/body.component";


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, BodyComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
