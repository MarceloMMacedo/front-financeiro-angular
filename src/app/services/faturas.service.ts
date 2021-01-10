import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { Contrato } from '../models/contrato';
import { Fatura } from '../models/fatura'; 
import { ListGroupChart } from '../models/reports/list-group-chart';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FaturasService  {

  constructor( public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService, ) {
  } 
  findById( id: string): Observable<Fatura> {
    return this.http.get<Fatura>(`${API_CONFIG.baseUrl}/faturas/${id}`);
  }
  insert(p) {
    return this.http.post(`${API_CONFIG.baseUrl}/faturas`, p, { observe: 'response', responseType: 'text' });
  }
  gerarparcelascontrato(id) {
    return this.http.get<Contrato>(`${API_CONFIG.baseUrl}/faturas/gerarparcelascontrato/${id}`);
  }
  gerarparcelascpagar(id) {
    return this.http.get<Contrato>(`${API_CONFIG.baseUrl}/faturas/gerarparcelascpagar/${id}`);
  }
  getAll(): Observable<Fatura[]> {
    return this.http.get<Fatura[]>(`${API_CONFIG.baseUrl}/faturas`);
  }
  save(p: Fatura) { 
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 10000);
    return this.http.put(`${API_CONFIG.baseUrl}/faturas/${p.id}`, p).subscribe(
      res => {
        this.spinner.hide(); 
      }
    ) 
  }
  resumopagar(id):Observable<ListGroupChart>{
    return this.http.get<ListGroupChart>(`${API_CONFIG.baseUrl}/faturas/resumopagar/${id}`);
  }
  faturaspagaraberta(): Observable<Fatura[]> {
    return this.http.get<Fatura[]>(`${API_CONFIG.baseUrl}/faturas/faturaspagaraberta`);
  }
}
