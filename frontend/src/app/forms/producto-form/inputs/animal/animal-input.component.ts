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
import { AnimalService } from '../../../../services/animal.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

@Component({
  selector: 'app-animal-input',
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  templateUrl: './animal-input.component.html',
  styleUrl: './animal-input.component.css',
})
export class AnimalInputComponent {
  constructor(private animalService: AnimalService) {}

  @Input() modo!: string;
  @Input() id_animal_padre: number = 0;
  @Output() IdAnimal = new EventEmitter<number>();

  animalesSelect: { id: number; nombre: string }[] = [];
  animalesFiltrados: { id: number; nombre: string }[] = [];
  nombreAnimal = '';

  async ngOnInit(): Promise<void> {
    await this.cargar();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['modo']) {
      this.id_animal_padre = 0;
      this.nombreAnimal = '';
    }
    if (changes['id_animal_padre']) {
      if (this.id_animal_padre == 0) {
        this.nombreAnimal = '';
      } else {
        this.obtenerNombre();
      }
    }
  }

  cambiarIdAnimal(id: number) {
    this.id_animal_padre = id;
    this.IdAnimal.emit(id);
  }

  async cargar() {
    this.animalesSelect = [];
    this.animalService.obtenerAnimales().subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          respuesta.animales.forEach((a: { id: number; nombre: string }) => {
            this.animalesSelect.push({ id: a.id, nombre: a.nombre });
          });
        }
        this.animalesFiltrados = this.animalesSelect;
      },
      error: () => {
        alert('Error en la carga de animales');
      },
    });
  }

  obtenerNombre() {
    const animal = this.animalesSelect.find(
      (a) => a.id === this.id_animal_padre
    );
    if (animal) {
      this.nombreAnimal = animal?.nombre;
    }
  }

  filtrar() {
    this.animalesFiltrados = this.animalesSelect.filter((f) =>
      f.nombre.toLowerCase().includes(this.nombreAnimal.toLowerCase())
    );
  }
}
