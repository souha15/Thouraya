import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { PayDirecteService } from '../../shared/Services/Gsetion Stock/pay-directe.service';
import { PayDirecte } from '../../shared/Models/Gestion Stock/pay-directe.model';
import { GestBenService } from '../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../shared/Models/GestBen/gest-ben.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { StockageService } from '../../shared/Services/Gsetion Stock/stockage.service';
import { Stockage } from '../../shared/Models/Gestion Stock/stockage.model';
import { TypeStockService } from '../../shared/Services/Gsetion Stock/type-stock.service';
import { TypeStockageService } from '../../shared/Services/Gsetion Stock/type-stockage.service';
import { StockService } from '../../shared/Services/Gsetion Stock/stock.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Stock } from '../../shared/Models/Gestion Stock/stock.model';
import { TypeStock } from '../../shared/Models/Gestion Stock/type-stock.model';
import { TypeStockage } from '../../shared/Models/Gestion Stock/type-stockage.model';

@Component({
  selector: 'app-e-dit-pay-directe',
  templateUrl: './e-dit-pay-directe.component.html',
  styleUrls: ['./e-dit-pay-directe.component.css']
})
export class EDitPayDirecteComponent implements OnInit {


  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private benService: GestBenService,
    private PayDirecteService: PayDirecteService,
    private stockageService: StockageService,
    private toastr: ToastrService,
    private typeStockService: TypeStockService,
    private TypeStockageService: TypeStockageService,
    private stockService: StockService,
    private UserService: UserServiceService,) { }

  BenList: GestBen[] = [];
  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();

    this.benService.ListGestBen().subscribe(res => {
      this.BenList = res
      let i = 0;
      this.BenList.forEach(item => {

        this.cities.push({ id: item.id, text: item.nomprenom });
      })
    })
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      searchPlaceholderText: 'بحث',
      allowSearchFilter: true
    };

    this.getStockList();
    this.typestockget();
  }

  //Get Stock List

  stocklist: Stock[] = [];

  getStockList() {
    this.stockService.ListStock().subscribe(res => {
      this.stocklist = res
    })
  }

  //get Type Stock
  typestockget() {

      this.TypeStockageService.ListTypeStockage().subscribe(res => {
        this.typeStockList = res;

      })
  }

  //Selcted DropDown


  ShowFilter = false;
  limitSelection = false;
  cities = [];
  selectedItems = [];
  dropdownSettings: any = {};
  selecteditems = [];
  IdBen: number;
  BenData: GestBen = new GestBen();
  onItemSelect(item: any) {
    this.selecteditems.push({ id: item.id, text: item.text });
    this.IdBen = this.selecteditems[0].id;
    this.benService.GetById(this.IdBen).subscribe(res => {
      this.BenData = res
      this.pay.idBen = this.IdBen;
      this.pay.nomBen = res.nomprenom;
      this.pay.cin = res.numCin;
      this.pay.numBen = res.id.toString();
      this.pay.nom = res.nomprenom;
      this.pay.nat = res.natio;
      this.pay.tel = res.tel;
    })

  }

  allselecteditems = [];
  onSelectAll(items: any) {
    this.allselecteditems.push(items);
  }

  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
  }

  public onFilterChange(item: any) {
    console.log(item);
  }
  handleLimitSelection() {
    if (this.limitSelection) {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
      this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
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
  //get the id in Url

  Id: number;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.PayDirecteService.GetById(this.Id).subscribe(res => {
        this.pay = res

      })
    })


  }

  //GetStockageList
  stockageList: Stockage[] = [];
  getStockageList() {
    this.stockageService.ListStockage().subscribe(res => {
      this.stockageList = res;
    })
  }

  //Get Stock Data

  stock: Stock = new Stock();

  getStockData(event) {
    this.stockService.GetById(+event.target.value).subscribe(res => {
      this.stock = res;
      this.pay.nomStock = res.nom
    })
  }

  //Get TypeStock
  typeStockList: TypeStockage[] = [];
  typeStockListF: TypeStockage[] = [];
  getTypeStock() {
    console.log(this.stock.id)
    this.TypeStockageService.ListTypeStockage().subscribe(res => {
      this.typeStockListF = res;
      this.typeStockList = this.typeStockListF.filter(item => item.idstock == this.stock.id)
      console.log(this.typeStockList)
      console.log(this.typeStockListF)
    })
  }

  //Calcul Qt
  redorgreen: boolean = false;
  calculqt(event) {
    this.quantiteC = +this.typeStock.quantite - +event.target.value;
    this.typeStock.quantite = this.quantiteC.toString();
    if (this.quantiteC >= 0) {
      this.redorgreen = true;
    } else {
      this.redorgreen = false;
    }
  }
  //Get TypeStock Data

  typeStock: TypeStockage = new TypeStockage();
  TestQt: boolean = false;
  quantiteC: number = 0;
  quantiteC1: number = 0;
  getTypeStockData(event) {
    if (event.target.value != null) {
      this.TestQt = true

      this.TypeStockageService.GetById(+event.target.value).subscribe(res => {
        this.typeStock = res;
        this.pay.type = res.type
        this.quantiteC = +res.quantite
        if (this.quantiteC >= 0) {
          this.redorgreen = true;
        } else {
          this.redorgreen = false;
        }

      })
    } else {
      this.TestQt = false;
    }

  }
  //OnSubmit

  pay: PayDirecte = new PayDirecte();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {
    if (form.invalid && this.quantiteC >= 0) {

      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")
    }
    else {
      this.isValidFormSubmitted = true;

      this.PayDirecteService.PutObservableE(this.pay).subscribe(res => {



        //Calcul Quantite
        this.typeStock.quantite = this.quantiteC.toString();
        //edit Type
        this.TypeStockageService.PutObservableE(this.typeStock).subscribe(res => {

        })

        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        this.selecteditems = [];
        form.resetForm();
      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
        }
      )
    }
  }

}
