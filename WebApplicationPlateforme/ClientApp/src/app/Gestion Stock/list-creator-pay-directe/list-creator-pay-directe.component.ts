import { Component, OnInit } from '@angular/core';
import { GestBenService } from '../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../shared/Models/GestBen/gest-ben.model';
import { ToastrService } from 'ngx-toastr';
import { PayDirecteService } from '../../shared/Services/Gsetion Stock/pay-directe.service';
import { PayDirecte } from '../../shared/Models/Gestion Stock/pay-directe.model';
import { OrdrePayStockageService } from '../../shared/Services/Gsetion Stock/ordre-pay-stockage.service';
import { BenPayStockOrdre } from '../../shared/Models/Gestion Stock/ben-pay-stock-ordre.model';
import { BenPayStockOrdreService } from '../../shared/Services/Gsetion Stock/ben-pay-stock-ordre.service';
import { NgForm } from '@angular/forms';
import { StockService } from '../../shared/Services/Gsetion Stock/stock.service';
import { TypeStockage } from '../../shared/Models/Gestion Stock/type-stockage.model';
import { TypeStockageService } from '../../shared/Services/Gsetion Stock/type-stockage.service';

@Component({
  selector: 'app-list-creator-pay-directe',
  templateUrl: './list-creator-pay-directe.component.html',
  styleUrls: ['./list-creator-pay-directe.component.css']
})
export class ListCreatorPayDirecteComponent implements OnInit {

  constructor(private BenService: GestBenService,
    private toastr: ToastrService,
    private stockService: StockService,
    private payDirecteService: PayDirecteService,
    private TypeStockageService: TypeStockageService,
    private OrdrePayService: OrdrePayStockageService,
    private BenOrdreService: BenPayStockOrdreService, ) { }

  ngOnInit(): void {

  }


  testNom: boolean = false;
  testNom2: boolean = false;
  Ben: GestBen = new GestBen();
  BenList1: GestBen[] = [];
  BenList: GestBen[] = [];
  cin: string;
  nom: string;
  cinSearch(event) {
    this.cin = event.target.value;

  }


  OrdrePay: boolean = false;
  Directe: boolean = false;
  typePay(event) {
    if (event.target.value == "OrdrePay") {
      this.OrdrePay = true;
      this.Directe = false;
    }
    else {
      this.Directe = true;
      this.OrdrePay = false;
    }
  }

  date = new Date().toLocaleDateString();
  p: Number = 1;
  count: Number = 5;
  ListPay: PayDirecte[] = [];
  ListPay1: PayDirecte[] = [];
  odreListBen: BenPayStockOrdre[] = [];
  odreListBenF: BenPayStockOrdre[] = [];
  typeStock: TypeStockage = new TypeStockage();

  Chercher() {
    if (this.OrdrePay) {
      this.BenOrdreService.ListBenPayStockOrdre().subscribe(res => {
        this.odreListBenF = res
        this.odreListBen = this.odreListBenF.filter(item => item.cin == this.cin)

        if (this.odreListBen.length == 0) {
          this.toastr.error(" لا يوجد مستفيد بهذه المعلومات")
        } 
     
      })
    }
    if (this.Directe) {
      this.payDirecteService.ListPayDirecte().subscribe(res => {
        this.ListPay1 = res
        this.ListPay = this.ListPay1.filter(item => item.cin == this.cin)
        if (this.ListPay.length == 0) {
          this.toastr.error(" لا يوجد مستفيد بهذه المعلومات")
        }
      })
    }
  }

}
