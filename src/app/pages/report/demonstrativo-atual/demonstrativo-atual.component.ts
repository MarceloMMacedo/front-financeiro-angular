import { Component, OnInit } from '@angular/core';
import { ReportDemostrativoFinancerio } from 'src/app/models/report/report-demostrativo-financerio';
import { ReporMovimentoFinanceiroService } from 'src/app/services/repor-movimento-financeiro.service';

@Component({
  selector: 'app-demonstrativo-atual',
  templateUrl: './demonstrativo-atual.component.html',
  styleUrls: ['./demonstrativo-atual.component.css'],
  styles:[
    `
  `
  ]
})
export class DemonstrativoAtualComponent implements OnInit {
  demostrativoFinancerio:ReportDemostrativoFinancerio[];
  constructor(
    private movimentoFinanceiroService:ReporMovimentoFinanceiroService,
  ) { }

  ngOnInit(): void {
    this.movimentoFinanceiroService.reportdemostrativofinancerio().subscribe(
      rest=>{
        this.demostrativoFinancerio=rest;
      }
    )
  }

}
