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
  selector: 'app-home-stockage',
  templateUrl: './home-stockage.component.html',
  styleUrls: ['./home-stockage.component.css']
})
export class HomeStockageComponent implements OnInit {

  constructor(private BenService: GestBenService,
    private toastr: ToastrService,
    private stockService: StockService,
    private payDirecteService: PayDirecteService,
    private TypeStockageService: TypeStockageService,
    private OrdrePayService: OrdrePayStockageService,
    private BenOrdreService: BenPayStockOrdreService, ) { }

  ngOnInit(): void {
  }


  //Search

  private selectedLink: string = "day";
  search: string;
  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "day") {
      this.search = "day"
    }

    if (this.selectedLink == "month") {
      this.search = "month"
    }

    if (this.selectedLink == "year") {
      this.search = "year"
    }

    if (this.selectedLink == "ben") {
      this.search = "ben"
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }



  //getMonth
  month: string;
  getMonth(event) {
    this.month = event.target.value; 
  }

  //Search By Month
  tot: number = 0;
  SarchByMonth() {
    if (this.OrdrePay) {
    this.BenOrdreService.ListBenPayStockOrdre().subscribe(res => {
      this.odreListBenF = res

      this.odreListBenF.forEach(item => {
        var d1 = item.dateenreg.split("/").reverse().join("-");
        var date1 = new Date(d1)
        var dd = date1.getMonth() + 1
        console.log(dd)
        if (this.month == dd.toString()) {
          this.odreListBen.push(item)
          this.tot = this.tot + +item.quatite
        }
      })
    })
    }

    if (this.Directe) {
      this.payDirecteService.ListPayDirecte().subscribe(res => {
        this.ListPay1 = res
        this.ListPay1.forEach(item => {
          var d1 = item.dateenreg.split("/").reverse().join("-");
          var date1 = new Date(d1)
          var dd = date1.getMonth() + 1
      
          if (this.month == dd.toString()) {
            this.ListPay.push(item)
            this.tot = this.tot + +item.quantite
          }
        })
      })
    }

  }

  //get day
  day: string;
  getDay(event) {
    this.day = event.target.value

  }

  //Search by Day

  SearchByDay() {
    if (this.OrdrePay) {
      this.BenOrdreService.ListBenPayStockOrdre().subscribe(res => {
        this.odreListBenF = res

        this.odreListBenF.forEach(item => {
          var d1 = item.dateenreg.split("/").reverse().join("-");
          var d2 = this.day.split("/").reverse().join("/");
          if (d1 == d2) {
            this.odreListBen.push(item)
            this.tot = this.tot + +item.quatite
          }
        })
      })
    }
    if (this.Directe) {
      this.payDirecteService.ListPayDirecte().subscribe(res => {
        this.ListPay1 = res
        this.ListPay = this.ListPay1.filter(item => item.cin == this.cin)
        this.ListPay1.forEach(item => {
          var d1 = item.dateenreg.split("/").reverse().join("-");
          var d2 = this.day.split("/").reverse().join("/");
          if (d1 == d2) {
            this.ListPay.push(item)
            this.tot = this.tot + +item.quantite
          }
        })
    
      })
    }
  }

  //getYear
  year: string;
  getYear(event) {
    this.year = event.target.value;
  }

  //search By Year

  SearchByYear() {
    if (this.OrdrePay) {
    this.BenOrdreService.ListBenPayStockOrdre().subscribe(res => {
      this.odreListBenF = res

      this.odreListBenF.forEach(item => {
      
        var d1 = item.dateenreg.split("/").reverse().join("-");
        var date1 = new Date(d1)
        if (this.year == date1.getFullYear().toString()) {
          this.odreListBen.push(item)
          this.tot = this.tot + +item.quatite
        }
      })
    })
    }
    if (this.Directe) {
      this.payDirecteService.ListPayDirecte().subscribe(res => {
        this.ListPay1 = res
        this.ListPay1.forEach(item => {
          var d1 = item.dateenreg.split("/").reverse().join("-");
          var date1 = new Date(d1)
          if (this.year == date1.getFullYear().toString()) {
            this.ListPay.push(item)
            this.tot = this.tot + +item.quantite
          }
        })
      })
    }
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
