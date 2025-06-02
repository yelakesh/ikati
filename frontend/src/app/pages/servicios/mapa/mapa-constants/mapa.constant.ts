import * as L from 'leaflet';

export const ICONOS_SERVICIO: Record<number, L.Icon> = {
  1: L.icon({
    iconUrl: 'imagenes/pines/pin_vet.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  }),
  2: L.icon({
    iconUrl: 'imagenes/pines/pin_pelu.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  }),
  3: L.icon({
    iconUrl: 'imagenes/pines/pin_guar.png',
    iconSize: [50, 50],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
  }),
};

export const TIPOS_SERVICIO = [
  { id: 0, nombre: 'Todos' },
  { id: 1, nombre: 'Veterinaria' },
  { id: 2, nombre: 'Peluquería' },
  { id: 3, nombre: 'Guardería' }
];
