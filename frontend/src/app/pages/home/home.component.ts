import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from "../../shared/breadcrumb/breadcrumb.component";
import { BodyComponent } from "./body/body.component";
import { FooterComponent } from "../../components/footer/footer.component";


@Component({
  selector: 'app-home',
  imports: [HeaderComponent, BodyComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
