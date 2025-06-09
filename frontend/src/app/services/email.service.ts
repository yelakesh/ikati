import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  emailRegistro(usuario: string, email: string) {
    emailjs.init({
      publicKey: '8bfO8ErXlSa136U6E',
    });

    const params = {
      name: 'Ikati',
      user_name: usuario,
      email: email,
    };

    emailjs.send('service_mnppien', 'template_dqfcmd2', params);
  }

  avisoStock(producto: string, email: string) {
    emailjs.init({
      publicKey: '8bfO8ErXlSa136U6E',
    });


      const params = {
        name: 'Ikati',
        product_name: producto,
        email: email,
      };

      emailjs.send('service_mnppien', 'template_ehagnv6', params);
    }
  
}
