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
  selector: 'app-list-ben-pay-stockage',
  templateUrl: './list-ben-pay-stockage.component.html',
  styleUrls: ['./list-ben-pay-stockage.component.css']
})
export class ListBenPayStockageComponent implements OnInit {

  constructor(private BenService: GestBenService,
    private toastr: ToastrService,
    private stockService: StockService,
    private payDirecteService: PayDirecteService,
    private TypeStockageService: TypeStockageService,
    private OrdrePayService: OrdrePayStockageService,
    private BenOrdreService: BenPayStockOrdreService,) { }

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
          } else {
            var d1 = new Date(this.date);
            for (let i = 0; i < this.odreListBen.length; i++) {

              var d2 = new Date(this.odreListBen[i].attribut4);
              if (d1.getDate() <= d2.getDate()) {
                this.odreListBen[i].attribut3 = "غير متأخرة"
              
              } else {
                this.odreListBen[i].attribut3 = "متأخرة"
                this.BenOrdreService.PutObservableE(this.odreListBen[i]).subscribe(res => {

                })

                this.TypeStockageService.GetById(this.odreListBen[i].attribut1).subscribe(res => {
                  this.typeStock = res
                  let qt = +this.typeStock.quantite + +this.odreListBen[i].quatite;
                  this.typeStock.quantite = qt.toString();

                  this.TypeStockageService.PutObservableE(this.typeStock).subscribe(res => {

                  });
                  
                })

          

              }
            }
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

  orPay: BenPayStockOrdre = new BenPayStockOrdre();
  or: boolean = false;
  populateForm2(ev: BenPayStockOrdre) {
    this.orPay = Object.assign({}, ev)
    if (this.orPay.attribut2 == "لم يتم الصرف") {
      this.or = true;
    } else {
      this.or = false;
    }
  }


  onSubmit1(form: NgForm) {
    if (this.or) {
      this.BenOrdreService.PutObservableE(this.orPay).subscribe(res => {
        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        this.Chercher();
      },
        err => {

          this.toastr.error(" فشل في التسجيل", "فشل")
        })
    } else {

      this.toastr.error(" لقد تم الصرف من قبل", "فشل")
    }
  }

  Paydirecte: PayDirecte = new PayDirecte();
  dir: boolean = false;
  populateForm1(ev: PayDirecte) {
    this.Paydirecte = Object.assign({}, ev)
    if (this.Paydirecte.attribut5 == "لم يتم الصرف") {
      this.dir =true
    } else {
      this.dir = false;
    }

  }


  date = new Date().toLocaleDateString();
  isValidFormSubmitted: boolean = false;
  onSubmit(form: NgForm) {
    if (this.dir) {
      this.payDirecteService.PutObservableE(this.Paydirecte).subscribe(res => {
        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        this.Chercher();
      },
        err => {

          this.toastr.error(" فشل في التسجيل", "فشل")
        })
    } else {

      this.toastr.error(" لقد تم الصرف من قبل", "فشل")
    }
  }


}
