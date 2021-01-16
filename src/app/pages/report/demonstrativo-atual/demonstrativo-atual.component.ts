import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.movimentoFinanceiroService.reportdemostrativofinancerio().subscribe(
      rest=>{
        this.demostrativoFinancerio=rest;
      }
    )
  }
  printview() {
    this.spinner.show();
    setTimeout(() => {
    this.movimentoFinanceiroService.viewpddemonstrativosintetico().subscribe(
      (response) => {
        console.log(response);
        const file = new Blob([response], { type: 'application/pdf' });

        console.log(file);
        const fileURL = URL.createObjectURL(file);

        console.log(fileURL);
        window.open(fileURL);


      });
      this.spinner.hide();
    }, 1000);
  }

  printvieexercicio(exercicio) {
    this.spinner.show();
    setTimeout(() => {
    this.movimentoFinanceiroService.viewpddemonstrativosinteticoexercicio(exercicio).subscribe(
      (response) => {
        console.log(response);
        const file = new Blob([response], { type: 'application/pdf' });

        console.log(file);
        const fileURL = URL.createObjectURL(file);

        console.log(fileURL);
        window.open(fileURL);

        this.spinner.hide();
      });
    }, 1000);
  }
  printvieperiodo(exercicio,mes) {
    this.spinner.show();
    setTimeout(() => {
    this.movimentoFinanceiroService.getviewsinteticoperiodo(exercicio,mes).subscribe(
      (response) => {
        console.log(response);
        const file = new Blob([response], { type: 'application/pdf' });

        console.log(file);
        const fileURL = URL.createObjectURL(file);

        console.log(fileURL);
        window.open(fileURL);

        this.spinner.hide();
      });

    }, 1000);
  }
}
