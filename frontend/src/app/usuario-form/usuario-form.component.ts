import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-usuario-form',
  standalone:true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css'
})
export class UsuarioFormComponent {

  
  usuario = {
    usuario:'',
    contrasena: '',
    nombre: '',
    apellido1:'',
    apellido2:'',
    email:'',
    telefono:'',
    cp:'',
    direccion:''

  };
  @Input() modo: string = '';

  completarDatosUsuario() {
    let nuevoUsuario={
      usuario:'A',
    contrasena: 'B',
    nombre: 'C',
    apellido1:'D',
    apellido2:'E',
    email:'F',
    telefono:'G',
    cp:'H',
    direccion:'I'

    }

    this.usuario=nuevoUsuario

}
  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.usuario = {
        usuario:'',
        contrasena: '',
        nombre: '',
        apellido1:'',
        apellido2:'',
        email:'',
        telefono:'',
        cp:'',
        direccion:''
    
      };

    }
  }

  
}
