import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class AvisarStockService {

      private apiUrl = `${environment.apiUrl}/avisarStock`;

  constructor(private http: HttpClient) {}

  anadiraAvisar(objAvisarStock: object): Observable<any> {
    return this.http.post(this.apiUrl + '/anadiraAvisar', objAvisarStock);
  }

}