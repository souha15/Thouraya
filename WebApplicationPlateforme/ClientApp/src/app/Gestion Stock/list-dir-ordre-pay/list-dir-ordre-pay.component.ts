import { Component, OnInit } from '@angular/core';
import { OrdrePayStockageService } from '../../shared/Services/Gsetion Stock/ordre-pay-stockage.service';
import { OrdrePayStockage } from '../../shared/Models/Gestion Stock/ordre-pay-stockage.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { TypeStockageService } from '../../shared/Services/Gsetion Stock/type-stockage.service';
import { TypeStockage } from '../../shared/Models/Gestion Stock/type-stockage.model';
import { BenPayStockOrdreService } from '../../shared/Services/Gsetion Stock/ben-pay-stock-ordre.service';
import { BenPayStockOrdre } from '../../shared/Models/Gestion Stock/ben-pay-stock-ordre.model';
import { Type } from '@angular/compiler';

@Component({
  selector: 'app-list-dir-ordre-pay',
  templateUrl: './list-dir-ordre-pay.component.html',
  styleUrls: ['./list-dir-ordre-pay.component.css']
})
export class ListDirOrdrePayComponent implements OnInit {


  constructor(private OrdrePayService: OrdrePayStockageService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private TypeStockageService: TypeStockageService,
    private BenOrdreService: BenPayStockOrdreService
  ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getList();
  }


  p: Number = 1;
  count: Number = 5;
  allist: boolean =true;
  //Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  newT: boolean = false
  new() {
    this.newT = true;
    this.acceptedT = false;
    this.closedT = false;
    this.allist = false;


  }

  acceptedT: boolean = false
  accepted() {
    this.newT = false;
    this.acceptedT = true;
    this.closedT = false;
    this.allist = false;

  }

  closedT: boolean = false
  closed() {
    this.newT = false;
    this.acceptedT = false;
    this.closedT = true;
    this.allist = false;
  }

  ListStockageA: OrdrePayStockage[] = [];
  ListStockage: OrdrePayStockage[] = [];
  ListStockageAccepted: OrdrePayStockage[] = [];
  ListStockageClosed: OrdrePayStockage[] = [];
  ListStockageNew: OrdrePayStockage[] = [];
  nb1: number = 0;
  nb2: number = 0;
  nb3: number = 0;
  getList() {
    this.OrdrePayService.ListOrdrePayStockage().subscribe(res => {
      this.ListStockageA = res
      this.ListStockage = this.ListStockageA.filter(item => item.typeOrdre =="للاعتماد")
      this.ListStockageNew = this.ListStockage.filter(item => item.etatOrdre == "في الإنتظار")
      this.nb1 = this.ListStockageNew.length;
      this.ListStockageClosed = this.ListStockage.filter(item => item.etatOrdre == "مغلقة")
      this.nb2 = this.ListStockageClosed.length;
      this.ListStockageAccepted = this.ListStockage.filter(item => item.etatOrdre == "معتمدة")
      this.nb3 = this.ListStockageAccepted.length;
    })
  }

  orPay: OrdrePayStockage = new OrdrePayStockage()
  BenStock: BenPayStockOrdre[] = [];
  BenStockF: BenPayStockOrdre[] = [];
  tot: number = 0;
  typeStock: number;
  populateForm(ev: OrdrePayStockage) {
    this.orPay = Object.assign({}, ev)

    this.BenOrdreService.ListBenPayStockOrdre().subscribe(res => {
      this.BenStockF = res
      this.BenStock = this.BenStockF.filter(item => item.idOrdrePayStockage == this.orPay.id)
      console.log(this.BenStock)
      this.BenStock.forEach(item => {
        this.typeStock = item.attribut1;
        this.tot = this.tot + +item.quatite;
        console.log(this.tot)
      })
      this.getTypeStock(this.typeStock)
    })
  }

  //Get TypeStock
  Stock: TypeStockage = new TypeStockage();

  getTypeStock(Id) {
    this.TypeStockageService.GetById(Id).subscribe(res => {
      this.Stock = res
    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  isValidFormSubmitted: boolean = false;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    }
    else {

      this.isValidFormSubmitted = true;
      this.orPay.idDir = this.UserIdConnected;
      this.orPay.nomDir = this.UserNameConnected;
      this.orPay.dateDir = this.date;
      this.orPay.etatOrdre = this.orPay.etatDir
      if (this.etat == "معتمدة") {
        this.OrdrePayService.PutObservableE(this.orPay).subscribe(res => {
          this.toastr.success("تم التسجيل بنجاح", "نجاح");
          this.getList();
        },
          err => {
            this.toastr.error(" فشل في التسجيل", "فشل")
          })
      } else {
        this.OrdrePayService.PutObservableE(this.orPay).subscribe(res => {
          this.Stock.quantite = (+this.Stock.quantite + this.tot).toString();
          this.TypeStockageService.PutObservableE(this.Stock).subscribe(res => {
            this.toastr.success("تم التسجيل بنجاح", "نجاح");
            this.getList();
          })

        },
          err => {

            this.toastr.error(" فشل في التسجيل","فشل")
          })
      }
     
    }



  }
}
