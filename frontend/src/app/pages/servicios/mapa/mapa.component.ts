import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { servicioService } from '../../../services/servicio.service';
import { ICONOS_SERVICIO, TIPOS_SERVICIO } from './mapa-constants/mapa.constant';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  imports: [FormsModule, CommonModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export class MapaComponent implements AfterViewInit {

   TIPOS_SERVICIO = TIPOS_SERVICIO;

  private mapa!: L.Map;
  codPostal: string = '';
  tipoSeleccionado: number = 0;
  servicios: any[] = [];
  private grupoMarcadores: L.LayerGroup = L.layerGroup();

  constructor(private http: HttpClient, private servicioService: servicioService) {}

  ngAfterViewInit(): void {
    this.initMap();
    this.cargarServicios();
  }

  private initMap(): void {
    this.mapa = L.map('map').setView([40.416775, -3.703790], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.mapa);

    this.grupoMarcadores.addTo(this.mapa);
  }

  private cargarServicios(): void {
    this.servicioService.obtenerTodos().subscribe({
      next: (res) => {
        if (res.ok) {
          this.servicios = res.servicios[0];
          this.filtrarMarcadores();
        } else {
          console.warn("No se encontraron servicios");
        }
      },
      error: (err) => {
        console.error("Error al obtener servicios:", err);
      }
    });
  }

  filtrarMarcadores(): void {
    this.grupoMarcadores.clearLayers();

    this.servicios
      .filter(servicio => this.tipoSeleccionado === 0 || servicio.id_tipo === this.tipoSeleccionado)
      .forEach(servicio => {

        const icono = ICONOS_SERVICIO[servicio.id_tipo];
        
        const marcador = L.marker([servicio.latitud, servicio.longitud], { icon: icono })
          .bindPopup(`
            <b>${servicio.nombre}</b><br>
            ${servicio.direccion}<br>
            <a href="${servicio.web}" target="_blank">${servicio.web}</a>
          `);

        this.grupoMarcadores.addLayer(marcador);
      });
  }

  buscarPorCodPostal(): void {
    if (!this.codPostal.trim()) return;

    const url = `https://nominatim.openstreetmap.org/search?format=json&postalcode=${this.codPostal}&country=spain`;

    this.http.get<any[]>(url).subscribe(resultados => {
      if (resultados.length > 0) {
        const { lat, lon } = resultados[0];
        this.mapa.setView([parseFloat(lat), parseFloat(lon)], 14);
      } else {
        alert('No se encontró ninguna ubicación para ese código postal.');
      }
    });
  }
}
