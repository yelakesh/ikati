import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from "../../../../components/header/header.component";
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editdatospersonales',
  imports: [HeaderComponent, RouterLink, CommonModule, FormsModule],
  templateUrl: './editdatospersonales.component.html',
  styleUrls: ['./editdatospersonales.component.css']
})
export class EditdatospersonalesComponent implements OnInit {

  usuario: any = {}
  modificado: boolean = false
  tieneSegundoApe: boolean = false


  constructor(private router: Router, private usuarioService: UsuarioService) { }



  ngOnInit() {
    this.cargarDatosUsuario();

  }

  anadirSegundoApe() {
    this.tieneSegundoApe = true
  }

  async guardarCambios() {

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

            if (this.usuario.apellido2 != '') {
              this.tieneSegundoApe = true
            }


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

  modificar() {
    if (this.formularioValido()) {
      this.usuarioService.modificarPorUsuario(this.usuario).subscribe({
        next: (respuesta) => {

          this.modificado = true;
        },
        error: (err) => {
          console.log(err);
          alert(err.error.mensaje);
        },
      });
    }
  }

  formularioValido() {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].required && inputs[i].value == '') {
        alert('Debe rellenar todos los campos obligatorios');
        inputs[i].focus();
        return false;
      }
      if (inputs[i].type == 'email' && !inputs[i].validity.valid) {
        alert('Email incorrecto');
        inputs[i].focus();
        return false;
      }
    }

    return true;
  }
}
