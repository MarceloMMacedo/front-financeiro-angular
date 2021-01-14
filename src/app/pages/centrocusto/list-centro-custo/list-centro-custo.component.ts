import { Component, OnInit } from '@angular/core';
import { CentroCusto } from '../../../models/centro-custo';
import { StorageService } from '../../../services/storage.service';
import { Router } from '@angular/router';
import { CentroCustoService } from '../../../services/centro-custo.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CurrencyMaskInputMode } from 'ngx-currency';

@Component({
  selector: 'app-list-centro-custo',
  templateUrl: './list-centro-custo.component.html',
  styleUrls: ['./list-centro-custo.component.css']
})
export class ListCentroCustoComponent implements OnInit {

  searchValue = '';
  visible = false;
  centrocusto: CentroCusto;
  centrocustos: CentroCusto[] = [] as CentroCusto[];
  listOfDisplaycentrocusto = [] as CentroCusto[];
  customCurrencyMaskConfig = {
    align: "right",
    allowNegative: true,
    allowZero: true,
    decimal: ",",
    precision: 2,
    prefix: "R$ ",
    suffix: "",
    thousands: ".",
    nullable: true,
    min: null,
    max: null,
    inputMode: CurrencyMaskInputMode.FINANCIAL
  };
  constructor(
    public storage: StorageService,
    private router: Router,
    private centroCustoService: CentroCustoService,
    private spinner: NgxSpinnerService,
    private modalService: NgbModal
  ) {

  }
  ngOnInit(): void {
    this.centroCustoService.getAll().subscribe(
      rest => {
        setTimeout(() => {
           this.centrocustos = rest;
           this.listOfDisplaycentrocusto=rest;}
          , 100);
      }
    )
   // this.listOfDisplaycentrocusto = [...this.centrocusto];
  }


  searchEntry$: Subject<string> = new Subject<string>();

  debounceTimeSearch() {
    this.searchEntry$.next(this.searchValue);
    this.searchEntry$
      .pipe(debounceTime(700))
      .subscribe((s) => {
        console.log(s);
        this.search();
      })
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplaycentrocusto = this.centrocustos.filter((item: CentroCusto) => item.name.toUpperCase().indexOf(this.searchValue.toUpperCase()) !== -1);
  }

  newcentrocusto(content) {
    this.centrocusto = {} as CentroCusto;
    this.centrocusto.saldo=0;
    this.centrocusto.saldoDisponivel=0
    this.centrocusto.saldoPagar=0;
    this.centrocusto.saldoReceber=0;

    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        //console.log(`Closed with: ${result}`);
        this.savenew();
      }, (reason) => {
        //console.log(`Dismissed ${reason}`);
      });

  }
   savenew() {
    this.centroCustoService.insert(this.centrocusto).subscribe(
      rest=>{

        this.centrocusto.id=parseFloat( rest.body);
        this.centrocustos.push(this.centrocusto);
        this.search();
      }
  );

  }

  editcentrocusto(b:CentroCusto,content) {
    this.centrocusto = b;
    this.modalService.open(content, { centered: true }).result.then(
      (result) => {
        this.save();
      }, (reason) => {
      });

  }
  async save() {
    this.centroCustoService.save(this.centrocusto) ;

  }
  printview() {
    this.spinner.show();
    setTimeout(() => {



    this.centroCustoService.getview().subscribe(
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
