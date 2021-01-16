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

  constructor(   public http: HttpClient,
    public storage: StorageService,
    private utilService: UtilsService,
    private spinner: NgxSpinnerService) { }


  getAll(): Observable<ResumoMovimentoFinaneiro> {
    return this.http.get<ResumoMovimentoFinaneiro>(`${API_CONFIG.repormovimentofinanceiro}`);
  }

  getview(): any {
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
      // 'responseType'  : 'blob' as 'json'        //This also worked
    };
    return this.http.get<any>(`${API_CONFIG.repormovimentofinanceiro}/printdemonstrativo`, httpOptions);
  }
  reportdemostrativofinancerio():Observable<ReportDemostrativoFinancerio[]>{
    return this.http.get<ReportDemostrativoFinancerio[]>(`${API_CONFIG.repormovimentofinanceiro}/reportdemostrativofinancerio`);


  }
}
