import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { FooterComponent } from './components/footer/footer.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  imports: [MatTabsModule, RouterOutlet, RouterModule, FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ikati_prueba';

  mostrarFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.mostrarFooter = event.urlAfterRedirects !== '/administracion';
        console.log(event.urlAfterRedirects);
        
      });
  }
}
