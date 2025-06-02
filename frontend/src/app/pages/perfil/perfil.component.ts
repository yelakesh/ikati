// perfil.component.ts
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { BreadcrumbComponent } from '../../shared/breadcrumb/breadcrumb.component';
import { DatosPersonalesCardComponent } from "./datos-personales-card/datos-personales-card.component";
import { ContrasenaCardComponent } from "./contrasena-card/contrasena-card.component";
import { DireccionEnvioCardComponent } from "./direccion-envio-card/direccion-envio-card.component";
import { PedidosAnterioresCardComponent } from "./pedidos-anteriores-card/pedidos-anteriores-card.component";

@Component({
  selector: 'app-perfil',
  imports:[HeaderComponent,BreadcrumbComponent, DatosPersonalesCardComponent, ContrasenaCardComponent,DireccionEnvioCardComponent,PedidosAnterioresCardComponent],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent implements OnInit {
  usuario: any = {}; 

  constructor(private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    const usuarioGuardado = sessionStorage.getItem('usuario'); 
    
    
    if (usuarioGuardado) {

      const usuarioObj = JSON.parse(usuarioGuardado)
      const nombreUsu = usuarioObj.usuario

      this.usuarioService.obtenerPorUsuario({ usuario: nombreUsu }).subscribe({
        next: (respuesta) => {
          if (respuesta.ok) {
            this.usuario = respuesta.usuario;
            
            
          }
        },
        error: (error) => {
          console.error('Error cargando datos:', error);
          alert('No se pudieron cargar los datos del perfil');
        }
      });
    } else {
      alert('Usuario no autenticado');
      
    }
  }


}
