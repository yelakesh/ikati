import { Component, Input, Output, EventEmitter, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../services/producto.service';
import { UsuarioService } from '../../../services/usuario.service';
import { CarroService } from '../../../services/carro.service';
import { FormsModule } from '@angular/forms';
import { CardProductocestaComponent } from './card-productocesta/card-productocesta.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { CuponService } from '../../../services/cupon.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { NgxPayPalModule } from 'ngx-paypal';

@Component({
  selector: 'app-carrito',
  imports: [
    CommonModule,
    FormsModule,
    CardProductocestaComponent,
    NgxPayPalModule,
  ],
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ transform: 'translateX(100%)', opacity: 0 })
        ),
      ]),
    ]),
    trigger('fadeOverlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [animate('300ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class CarritoComponent implements OnInit {
  constructor(
    private ProductoService: ProductoService,
    private CarroService: CarroService,
    private usuarioService: UsuarioService,
    private cuponService: CuponService,
    private snackBar: MatSnackBar
  ) {}

  public payPalConfig?: IPayPalConfig;

  @Input() visible = false;
  @Output() cerrado = new EventEmitter<void>();
  @Output() cantidadProductosChange = new EventEmitter<number>();

  id_usuario: any;
  id_producto: any;
  producto: any;
  productosTablaCarro: any;
  cantidadProductos: number = 0;
  rolUsuario: any;
  imagen: any;
  variantes: any;
  tengoCupon: boolean = false;
  importeFinal: number = 0;
  codigoCupon: string = '';
  descuento: number = 0;
  tipoDescuento: string = '';
  cuponAplicado: boolean = false;
  id_cupon: number | null = null;

  toogleCarrito() {
    this.importeFinal = 0;
    this.cerrado.emit();
  }

  ngOnInit(): void {
    const usuarioSesion = sessionStorage.getItem('usuario');
    if (usuarioSesion) {
      const usuarioObj = JSON.parse(usuarioSesion);
      this.rolUsuario = usuarioObj.rol;

      if (this.rolUsuario != 'admin') {
        this.cargarDatosUsuario();

        this.CarroService.carritoActualizado$.subscribe(() => {
          this.cargarDatosUsuario();
        });
      }
    }
    setTimeout(() => this.initConfig());
  }

  cargarDatosUsuario() {
    const usuarioGuardado = sessionStorage.getItem('usuario');

    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);
      const nombreUsu = usuarioObj.usuario;

      this.usuarioService.obtenerPorUsuario({ usuario: nombreUsu }).subscribe({
        next: (respuesta) => {
          if (respuesta.ok) {
            this.id_usuario = respuesta.usuario.id;

            this.traerProductosCarrito();
          }
        },
        error: (error) => {
          console.error('Error cargando datos:', error);
          alert('No se pudieron cargar los datos del perfil');
        },
      });
    } else {
      alert('Usuario no autenticado');
    }
  }

  traerProductosCarrito() {
    this.importeFinal = 0;

    this.CarroService.obtenerProductosCarritoPorIdUsuario({
      id_usuario: this.id_usuario,
    }).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.productosTablaCarro = respuesta.productos;

          this.cantidadProductos = this.sumarProductos();
          this.cantidadProductosChange.emit(this.cantidadProductos);
        }
      },
    });
  }

  sumarProductos() {
    var cont = 0;

    this.productosTablaCarro.forEach((producto: { variantes: any[] }) => {
      producto.variantes.forEach((variante: { cantidad: number }) => {
        cont += variante.cantidad;
      });
    });

    return cont;
  }

  mostrarInputCupon() {
    this.tengoCupon = true;
  }

  actualizarTotal(importe: number) {
    setTimeout(() => {
      this.importeFinal += importe;
      this.initConfig()
    }, 0);
  }


  aplicarCupon() {
    const codCupon = this.codigoCupon;

    this.cuponService.aplicarCupon({ codigo: codCupon }).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {
          this.id_cupon = respuesta.cupon.id;
          this.descuento = parseInt(respuesta.cupon.descuento);
          this.tipoDescuento = respuesta.cupon.tipo_descuento;

          if (this.tipoDescuento == 'fijo' && this.importeFinal >= 50) {
            this.importeFinal -= this.descuento;
            this.initConfig()
            this.snackBar.open('Descuento aplicado', 'Cerrar', {
              duration: 3000,
              panelClass: [],
            });
            this.cuponAplicado = true;
          } else {
            this.snackBar.open('No cumples los requisitos', 'Cerrar', {
              duration: 3000,
              panelClass: [],
            });
          }

          if (this.tipoDescuento == 'porcentaje') {
            this.importeFinal = this.precioConDescuento();
            this.cuponAplicado = true;

            this.snackBar.open('Descuento aplicado', 'Cerrar', {
              duration: 3000,
              panelClass: [],
            });
          }
        }
      },
    });
  }

  precioConDescuento() {
    const descuentoCalculado = this.importeFinal * (this.descuento / 100);

    const resultado = this.importeFinal - descuentoCalculado;

    return Math.floor(resultado * 100) / 100;
  }

  pagarPayPal() {
    this.completarCompra()
  }

  private initConfig(): void {
    var precioTotal = this.importeFinal.toFixed(2).toString();

    this.payPalConfig = undefined;

    setTimeout(() => {
      this.payPalConfig = {
        currency: 'EUR',
        clientId:
          'AXhq0GG27x8QAPRF3ycbJj1UrqZs93a5weaVYNx8J7enmSAheKqQWHURjIKCaxCboHOHKhAV33YkRVXP',
        createOrderOnClient: (data) =>
          <ICreateOrderRequest>{
            intent: 'CAPTURE',
            purchase_units: [
              {
                amount: {
                  currency_code: 'EUR',
                  value: precioTotal,
                  breakdown: {
                    item_total: {
                      currency_code: 'EUR',
                      value: precioTotal,
                    },
                  },
                },
                items: [
                  {
                    name: 'Enterprise Subscription',
                    quantity: '1',
                    category: 'DIGITAL_GOODS',
                    unit_amount: {
                      currency_code: 'EUR',
                      value: precioTotal,
                    },
                  },
                ],
              },
            ],
          },
        advanced: {
          commit: 'true',
        },
        style: {
          label: 'paypal',
          layout: 'vertical',
        },
        onApprove: (data, actions) => {
          console.log(
            'onApprove - transaction was approved, but not authorized',
            data,
            actions
          );
          actions.order.get().then((details: any) => {
            console.log(
              'onApprove - you can get full order details inside onApprove: ',
              details
            );
          });
        },
        onClientAuthorization: (data) => {
          this.completarCompra();
          //this.showSuccess = true;
        },
        onCancel: (data, actions) => {
          console.log('OnCancel', data, actions);
          //this.showCancel = true;
        },
        onError: (err) => {
          console.log('OnError', err);
          alert('Ha ocurrido un error con la compra, disculpe las molestias');
        },
        onClick: (data, actions) => {
          console.log('onClick', data, actions);
          //this.resetStatus();
        },
      };
    }, 0);
  }

  completarCompra() {
    var arrayVariantes: any[]=[]
    this.productosTablaCarro.forEach((producto: { variantes: any[]; }) => {
      producto.variantes.forEach((variante: any) => {
        arrayVariantes.push(variante)
      });

    });
    var objCompra = {
      idUsuario: this.id_usuario,
      idCupon: this.id_cupon,
      importe: this.importeFinal,
      variantes: arrayVariantes,
    };
    
    this.CarroService.completarCompra(objCompra).subscribe({
      next: (respuesta) => {
        if (respuesta.ok) {

          this.productosTablaCarro = null;
          this.importeFinal = 0;
          this.cantidadProductos=0
          this.CarroService.notificarActualizacionCarrito();
        }
      },
    });

    
  }
}
