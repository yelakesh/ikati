import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/usuario.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {

  usuario!: Observable<any>;
  open = false;

  constructor(private router: Router, private usuarioService: UsuarioService) { }

  showBanner = true;


  ngOnInit(){
    this.usuario = this.usuarioService.usuario
  }

  logOut(){

    this.usuarioService.logOut()
    this.router.navigate(['/logout']);
    
  }
}
