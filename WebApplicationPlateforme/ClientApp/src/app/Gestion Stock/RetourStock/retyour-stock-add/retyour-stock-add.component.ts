import { Component, OnInit } from '@angular/core';
import { StockageService } from '../../../shared/Services/Gsetion Stock/stockage.service';
import { StockService } from '../../../shared/Services/Gsetion Stock/stock.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TypeStockService } from '../../../shared/Services/Gsetion Stock/type-stock.service';
import { TypeStockageService } from '../../../shared/Services/Gsetion Stock/type-stockage.service';
import { RetourStockService } from '../../../shared/Services/Gsetion Stock/retour-stock.service';
import { TypeStock } from '../../../shared/Models/Gestion Stock/type-stock.model';
import { Stock } from '../../../shared/Models/Gestion Stock/stock.model';
import { NgForm } from '@angular/forms';
import { RetourStock } from '../../../shared/Models/Gestion Stock/retour-stock.model';
import { Stockage } from '../../../shared/Models/Gestion Stock/stockage.model';
import { TypeStockage } from '../../../shared/Models/Gestion Stock/type-stockage.model';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-retyour-stock-add',
  templateUrl: './retyour-stock-add.component.html',
  styleUrls: ['./retyour-stock-add.component.css']
})
export class RetyourStockAddComponent implements OnInit {

  constructor(private stockageService: StockageService,
    private stockService: StockService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private TypeStockageService: TypeStockageService,
    private typeStockService: TypeStockService,
    private RetourStockService: RetourStockService,
    private benService: GestBenService,) { }

  ngOnInit(): void {
    this.getStyockageList()
    this.getUserConnected();
    this.getBenList();
    this.getUsersList();
    this.getBenList();
  }
  //Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  //Get Type Ben

  TypeBen: string;
  Ben: boolean = false;
  employee; boolean = false;
  getTypeBen(event) {
    this.TypeBen = event.target.value
    if (this.TypeBen == "خارجي") {
      this.Ben = true;
      this.employee = false;
    } else {
      this.Ben = false;
    }

    if (this.TypeBen == "موظف") {
      this.employee = true;
      this.Ben = false;
    } else {
      this.employee = false;
    }
  }


  BenList: GestBen[] = [];
  getBenList() {
    this.benService.ListGestBen().subscribe(res => {
      this.BenList = res
    })
  }

  UsersList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList=res
    })
  }
  //Get Stock List

  stocklist: Stock[] = [];
  stocklist2: Stock[] = [];

  getStockList() {
    this.stockService.ListStock().subscribe(res => {
      this.stocklist2 = res
    })
  }


  //GetStockageList
  stockageList: Stockage[] = [];
  stockageList2: Stockage[] = [];
  getStyockageList() {
    this.stockageService.ListStockage().subscribe(res => {
      this.stockageList2 = res
      this.stockageList = this.stockageList2.filter(item => item.attribut6 == "تسترجع")
    })
  }

  //Get TypeStock

  typeStockList: TypeStockage[] = [];
  typeStockList2: TypeStockage[] = [];
  getStockData(event) {

    this.TypeStockageService.ListTypeStockage().subscribe(res => {
      this.typeStockList2 = res
      this.typeStockList = this.typeStockList2.filter(item => item.idstockage == +event.target.value && item.attribut6 == "تسترجع")
    })
  }
  getStockName(event) {
    this.stockageService.GetById(+event.target.value).subscribe(res => {

      this.Retstockage.nomstock = res.nomstock

    })
  }
  getTypeStockName(event) {
    this.TypeStockageService.GetById(+event.target.value).subscribe(res => {

      this.Retstockage.typestock = res.type


    })
  }


  Retstockage: RetourStock = new RetourStock();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  Id: number;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {

      this.isValidFormSubmitted = true;
      this.Retstockage.dateenreg = this.date;
      this.Retstockage.idUserCreator = this.UserIdConnected;
      this.Retstockage.userNameCreator = this.UserNameConnected;

      this.RetourStockService.CreateRetourStock(this.Retstockage).subscribe(res => {
        form.resetForm();

        this.toastr.success("تم التسجيل بنجاح", "نجاح");

      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
        })
    }
  }
}
