import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarcaService } from '../../../../services/marca.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-marca-input',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
  ],
  templateUrl: './marca-input.component.html',
  styleUrl: './marca-input.component.css',
})
export class MarcaInputComponent {
  constructor(private marcaService: MarcaService) {}

  @Input() modo!: string;
  @Input() id_marca_padre: number = 0;
  @Output() IdMarca = new EventEmitter<number>();

  marcasSelect: { id: number; nombre: string }[] = [];
  marcasFiltrados: { id: number; nombre: string }[] = [];
  nombreMarca = '';

  async ngOnInit(): Promise<void> {
    await this.cargar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.id_marca_padre = 0;
      this.nombreMarca = '';
    }
    if (changes['id_marca_padre']) {
      if (this.id_marca_padre == 0) {
        this.nombreMarca = '';
      } else {
        this.obtenerNombre();
      }
    }
  }

  cambiarIdMarca(id: number) {
    this.id_marca_padre = id;
    this.IdMarca.emit(id);
  }

  async cargar() {
    this.marcasSelect = [];
    this.marcaService.obtenerTodas().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.marcas.forEach((a: { id: number; nombre: string }) => {
            this.marcasSelect.push({ id: a.id, nombre: a.nombre });
          });
        }
        this.marcasFiltrados = this.marcasSelect;
      },
      error: () => {
        alert('Error en la carga de marcas');
      },
    });
  }

  obtenerNombre() {
    const marca = this.marcasSelect.find(
      (a) => a.id === this.id_marca_padre
    );
    if (marca) {
      this.nombreMarca = marca?.nombre;
    }
  }

  filtrar() {
    this.marcasFiltrados = this.marcasSelect.filter((f) =>
      f.nombre.toLowerCase().includes(this.nombreMarca.toLowerCase())
    );
  }
}
