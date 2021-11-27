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
  selector: 'app-retyour-stock-list',
  templateUrl: './retyour-stock-list.component.html',
  styleUrls: ['./retyour-stock-list.component.css']
})
export class RetyourStockListComponent implements OnInit {

  constructor(private stockageService: StockageService,
    private stockService: StockService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private TypeStockageService: TypeStockageService,
    private typeStockService: TypeStockService,
    private RetourStockService: RetourStockService,
    private benService: GestBenService, ) { }

  ngOnInit(): void {
    this.getRetList();
    this.getStyockageList()
    this.getUserConnected();
    this.getBenList();
    this.getUsersList();
    this.getBenList();
  }

  RetList: RetourStock[] = [];
  getRetList() {
    this.RetourStockService.ListRetourStock().subscribe(res => {
      this.RetList = res;
    })
  }

  p: Number = 1;
  count: Number = 5;
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {

      this.RetourStockService.DeleteRetourStock(Id)
        .subscribe(res => {
          this.getRetList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
  populateForm(conge: RetourStock) {
    this.RetourStockService.formData = Object.assign({}, conge)
    this.Retstockage = Object.assign({}, conge);
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
      this.UsersList = res
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
      this.RetourStockService.PutObservableE(this.Retstockage).subscribe(res => {
        this.getRetList();
        form.resetForm();
        this.toastr.success("تم التسجيل بنجاح", "نجاح");

      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
        })
    }
  }
}
