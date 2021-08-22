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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-edit-stockage',
  templateUrl: './edit-stockage.component.html',
  styleUrls: ['./edit-stockage.component.css']
})
export class EditStockageComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private stockageService: StockageService,
    private stockService: StockService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private TypeStockageService: TypeStockageService,
    private typeStockService: TypeStockService,
      private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getStockageType();
    this.getStockList();
    this.getUserConnected();
    this.getTypeStock();
  }

  //get the id in Url

  Id: number;
  stockage: Stockage = new Stockage();
  tyStock: TypeStockage[] = [];
  tyStockst: TypeStockage[] = [];
  exist: boolean = false;

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
 
      this.stockageService.GetById(this.Id).subscribe(res => {
        this.stockage = res
        this.nomstock = this.stockage.nomstock
      })
    });

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
      this.stocklist = res
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

  getStockageType() {
    this.TypeStockageService.ListTypeStockage().subscribe(res => {
      this.tyStock = res
      this.tyStockst = this.tyStock.filter(item => item.idstockage == this.stockage.id)
      if (this.tyStockst.length != 0) {
        this.exist = true;
      } else {
        this.exist = false;
      }
    })
  }
  del11(Id) {
    this.TypeStockageService.DeleteTypeStockage(Id).subscribe(res => {
      this.getStockageType();
    })
  }

  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();


  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {

      this.isValidFormSubmitted = true;
      this.stockage.dateenreg = this.date;
      this.stockage.idUserCreator = this.UserIdConnected;
      this.stockage.userNameCreator = this.UserNameConnected;

      this.stockageService.PutObservableE(this.stockage).subscribe(res => {


        //Add Type


        if (this.exist) {
          for (let i = 0; i < this.tyStockst.length; i++) {

            this.stock = this.tyStockst[i]
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
        })
    }
  }

}
