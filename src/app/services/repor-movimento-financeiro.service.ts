import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { ReportDemostrativoFinancerio } from '../models/report/report-demostrativo-financerio';
import { ResumoMovimentoFinaneiro } from '../models/report/resumo-movimento-finaneiro';
import { Resumocontas } from '../models/report/resumocontas';
import { StorageService } from './storage.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class ReporMovimentoFinanceiroService {

  constructor(public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService) { }


  getAll(): Observable<ResumoMovimentoFinaneiro> {
    return this.http.get<ResumoMovimentoFinaneiro>(`${API_CONFIG.repormovimentofinanceiro}`);
  }
  reportdemostrativofinancerio(): Observable<ReportDemostrativoFinancerio[]> {
    return this.http.get<ReportDemostrativoFinancerio[]>(`${API_CONFIG.repormovimentofinanceiro}/reportdemostrativofinancerio`);
  }
  getview(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/printdemonstrativo`, httpOptions);
  }
//todos report
  viewpddemonstrativosintetico(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/viewpddemonstrativosintetico`, httpOptions);
  }
  viewpddemonstrativosinteticoexercicio(exercico: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/viewpddemonstrativosinteticoexercicio?exercico=${exercico}`, httpOptions);
  }
  getviewsinteticoperiodo(exercico: number, mes: number): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/printdemonstrativoperiodo?exercico=${exercico}&mes=${mes}`, httpOptions);
  }
}
