import { Component, OnInit } from '@angular/core';
import { StockageService } from '../../shared/Services/Gsetion Stock/stockage.service';
import { Stockage } from '../../shared/Models/Gestion Stock/stockage.model';
import { Stock } from '../../shared/Models/Gestion Stock/stock.model';
import { StockService } from '../../shared/Services/Gsetion Stock/stock.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { TypeStockageService } from '../../shared/Services/Gsetion Stock/type-stockage.service';
import { TypeStockage } from '../../shared/Models/Gestion Stock/type-stockage.model';
import { TypeStockService } from '../../shared/Services/Gsetion Stock/type-stock.service';
import { TypeStock } from '../../shared/Models/Gestion Stock/type-stock.model';

@Component({
  selector: 'app-add-stockage',
  templateUrl: './add-stockage.component.html',
  styleUrls: ['./add-stockage.component.css']
})
export class AddStockageComponent implements OnInit {

  constructor(private stockageService: StockageService,
    private stockService: StockService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private TypeStockageService: TypeStockageService,
    private typeStockService: TypeStockService) { }

  ngOnInit(): void {
    this.getStockList();
    this.getUserConnected();
    this.getTypeStock();
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

  //Get TypeStock
  typeStockList: TypeStock[] = [];
  getTypeStock() {
    this.typeStockService.ListTypeStock().subscribe(res => {
      this.typeStockList = res
    })
  }


  //Get TypeStock Data

  uniteStock: string;
  prixStock: string;
  tot: string;
  totnb: number = 0;
  getTypeStockData(event) {
    this.typeStockService.GetById(+event.target.value).subscribe(res => {
      this.stock.unite = res.unite;
      this.stock.prix = res.prix;
      this.stock.nomstock = this.nomstock
      this.stock.type = res.nom


    })
  }

  //Get tot

  getTot(event) {
    this.stock.nomstock = this.nomstock
    this.totnb = +this.stock.prix * +this.stock.quantite
    this.stock.tot = this.totnb.toString();
  }

  //Get Stock List

  stocklist: Stock[] = [];

  getStockList() {
    this.stockService.ListStock().subscribe(res => {
      this.stocklist =res
    })
  }


  //Get Stock Data
  nomstock: string;
  getStockData(event) {
    this.stockService.GetById(+event.target.value).subscribe(res => {
      this.stockage.respId = res.respId;
      this.stockage.respnom = res.respNom;
      this.stockage.nomstock = res.nom;
      this.stock.nomstock = res.nom
      this.nomstock = res.nom

    })
  }

  // Type Stock

  stock: TypeStockage = new TypeStockage();
  stockList: TypeStockage[] = [];
  stockList2: TypeStockage[] = [];
  i = 0;
  stocktest: boolean;

  addtype() {
    this.stocktest = true;
    console.log(this.stockList[this.i])
    this.stockList[this.i] = this.stock
    this.stock = new TypeStockage();
    this.i = this.i + 1;
  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.stockList.splice(this.stockList.indexOf(dp), 1);
    this.i = this.i - 1
    this.stock = new TypeStockage();
  }

  stockage: Stockage = new Stockage();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  Id: number;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {

      this.isValidFormSubmitted = true;
      this.stockage.dateenreg = this.date;
      this.stockage.idUserCreator = this.UserIdConnected;
      this.stockage.userNameCreator = this.UserNameConnected;

      this.stockageService.CreateStockage(this.stockage).subscribe(res => {
        this.Id = res.id

        //Add Type


        if (this.stocktest) {
          for (let i = 0; i < this.stockList.length; i++) {

            this.stock = this.stockList[i]
            this.stock.idstockage = this.Id;
            this.stock.idstock = this.stockage.stockId;
            this.stock.nomstock = this.stockage.nomstock;
            this.stock.idUserCreator = this.UserIdConnected;
            this.stock.userNameCreator = this.UserNameConnected;
            this.stock.dateenreg = this.date;
            this.TypeStockageService.CreateTypeStockage(this.stock).subscribe(res => {
              this.stockList2[i] = res

            },
              err => {
                this.toastr.error("  فشل في تسجيل	 ", "فشل")
              })
          }
        }

        form.resetForm();
        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        this.stockList.splice(0, this.stockList.length);
        this.stocktest = false;
      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
        } )
    }
  }
}
