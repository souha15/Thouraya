import { Component, OnInit } from '@angular/core';
import { OrdrePayStockageService } from '../../shared/Services/Gsetion Stock/ordre-pay-stockage.service';
import { ToastrService } from 'ngx-toastr';
import { OrdrePayStockage } from '../../shared/Models/Gestion Stock/ordre-pay-stockage.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { StockService } from '../../shared/Services/Gsetion Stock/stock.service';
import { Stock } from '../../shared/Models/Gestion Stock/stock.model';
import { TypeStockage } from '../../shared/Models/Gestion Stock/type-stockage.model';
import { TypeStockageService } from '../../shared/Services/Gsetion Stock/type-stockage.service';
import { GestBenService } from '../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../shared/Models/GestBen/gest-ben.model';
import { BenPayStockOrdreService } from '../../shared/Services/Gsetion Stock/ben-pay-stock-ordre.service';
import { BenPayStockOrdre } from '../../shared/Models/Gestion Stock/ben-pay-stock-ordre.model';
import { SettingsBenService } from '../../shared/Services/GestBen/settings-ben.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
@Component({
  selector: 'app-add-ordre-pay',
  templateUrl: './add-ordre-pay.component.html',
  styleUrls: ['./add-ordre-pay.component.css']
})
export class AddOrdrePayComponent implements OnInit {

  constructor(private OrdrePayService: OrdrePayStockageService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private stockService: StockService,
    private benService: GestBenService,
    private TypeStockageService: TypeStockageService,
    private settingsService: SettingsBenService,
    private BenOrdreService: BenPayStockOrdreService) { }


  BenList: GestBen[] = [];
  BenListnbFam: GestBen[] = [];
  nball: number = 0;
  ngOnInit(): void {
    this.getSettings();
    this.getUserConnected();
    this.benService.ListGestBen().subscribe(res => {
      this.BenList = res
      this.nball = this.BenList.length;
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
  }


  // get settings tables

  typeben: TbListening[] = [];

  getSettings() {

    //Type Ben

    this.settingsService.GetTBen().subscribe(res => {
      this.typeben = res;
    })

  }

  BenListCateg: GestBen[] = [];
  getTypeBen(event) {
    this.BenListCateg = this.BenList.filter(item => item.datechercheur == event.target.value)
  }

  BenListNbFam: GestBen[] = [];
  getnbFam(event) {
    this.BenListNbFam = this.BenList.filter(item => +item.nbfamille >= +event.target.value)
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
  showBenData: boolean = false;
  onItemSelect(item: any) {
    this.selecteditems.push({ id: item.id, text: item.text });
    this.IdBen = this.selecteditems[0].id;
    if (this.IdBen != null) {
      this.showBenData = true;
    } else {
      this.showBenData = false;
    }

    this.benService.GetById(this.IdBen).subscribe(res => {
      this.BenData = res
      this.benPart.idBen = this.BenData.id;
      console.log(this.benPart.idBen)
      this.benPart.nomBen = this.BenData.nomprenom;
      this.benPart.cin = this.BenData.numCin;
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
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.benPart.idUserCreator = this.UserIdConnected;
      this.benPart.userNameCreator = this.UserNameConnected;
      this.pay.userNameCreator = this.UserNameConnected;
      this.pay.userNameCreator = this.UserNameConnected;
      this.benPart.dateenreg = this.date;
      this.benPart.attribut2 ="غير مستلم"
    })

  }


  // Type Pay

  private selectedLink: string = "directe";

  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "toAccepte") {
      this.pay.typeOrdre = "للاعتماد";
      this.pay.etatDir = "في الإنتظار"
      
    }

    if (this.selectedLink == "directe") {
      this.pay.typeOrdre = "مباشر"
    }


  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }

  //Get Stock Data

  stock: Stock = new Stock();
  nomstock:string
  getStockData(event) {
    this.benPart.idstock = +event.target.value;
    this.stockService.GetById(+event.target.value).subscribe(res => {
      this.stock = res;
      this.benPart.nomStock = res.nom
      this.nomstock = res.nom
      this.pay.nomStock = res.nom;
      this.pay.respId = res.respId;
      this.pay.respNom = res.respNom;
      this.getTypeStock()
    })
  }


  //Type Pay Ev
  part: boolean = false;
  toutBen: boolean = false;
  categ: boolean = false;
  nbfam: boolean = false;
  
  TypePayEv(event) {
    if (event.target.value == "الفئات") {
      this.categ = true
      this.toutBen = false
      this.nbfam = false;
      this.part = false;
    } else {
      this.categ = false;
    }

    if (event.target.value == "عدد افراد الاسرة") {
      this.nbfam = true;
      this.categ = false;
      this.toutBen = false
      this.part = false;
    } else {
      this.nbfam = false;
    }

    if (event.target.value == "كافة المستفيدين") {
      this.toutBen = true
      this.categ = false;
      this.nbfam = false;
      this.part = false;
    } else {
      this.toutBen =false
    }

    if (event.target.value == "فردي") {
      this.part = true;
      this.categ = false;
      this.nbfam = false;
      this.toutBen = false;
    } else {
      this.part = false;
    }
  }
  //Get Stock List

  stocklist: Stock[] = [];

  getStockList() {
    this.stockService.ListStock().subscribe(res => {
      this.stocklist = res
    })
  }


  //Get TypeStock
  typeStockList: TypeStockage[] = [];
  typeStockListF: TypeStockage[] = [];
  getTypeStock() {
    this.TypeStockageService.ListTypeStockage().subscribe(res => {
      this.typeStockListF = res;
      this.typeStockList = this.typeStockListF.filter(item => item.idstock == this.stock.id)

    })
  }

  //Get TypeStock Data

  typeStock: TypeStockage = new TypeStockage();
  tyStock: string;
  quantiteC1: number = 0;
  TestQt: boolean = false;
  getTypeStockData(event) {
    if (event.target.value != null) {
      this.TestQt = true

      this.TypeStockageService.GetById(+event.target.value).subscribe(res => {
        this.typeStock = res;
        this.benPart.typeStock = this.typeStock.type
        this.tyStock = this.typeStock.type
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

  //Ben Ordre Pay
  benPart: BenPayStockOrdre = new BenPayStockOrdre();
  benPartList: BenPayStockOrdre[] = [];
  benPartList2: BenPayStockOrdre[] = [];
  benPartTest: boolean;
  i = 0;
  addBenPart() {
    this.benPartTest = true;
    this.benPartList[0] = this.benPart;

  }


  //all bens
  allbens: BenPayStockOrdre = new BenPayStockOrdre();


  pay: OrdrePayStockage = new OrdrePayStockage();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  IdO: number;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    }
      else {

      this.isValidFormSubmitted = true;

      this.pay.dateenreg = this.date;
      this.pay.idUserCreator = this.UserIdConnected;
      this.pay.userNameCreator = this.UserNameConnected;
      this.pay.etatOrdre ="في الإنتظار"
      this.OrdrePayService.CreateOrdrePayStockage(this.pay).subscribe(res => {
        this.IdO = res.id
        if (this.part && this.benPartTest) {
          this.benPart.idOrdrePayStockage = this.IdO
          this.BenOrdreService.CreateBenPayStockOrdre(this.benPart).subscribe(res => {

            this.typeStock.quantite = this.quantiteC.toString();
            this.TypeStockageService.PutObservableE(this.typeStock).subscribe(res => {

            })
          })
        }


        if (this.toutBen) {
          
          for (let i = 0; i < this.BenList.length; i++) {
            this.allbens.cin = this.BenList[i].numCin;
            this.allbens.idBen = this.BenList[i].id;
            this.allbens.nomBen = this.BenList[i].nomprenom;
            this.allbens.idOrdrePayStockage = this.IdO;
            this.allbens.quatite = this.benPart.quatite;
            this.allbens.nomStock = this.nomstock;
            this.allbens.idstock = this.stock.id;
            this.allbens.typeStock = this.tyStock;
            this.allbens.attribut1 = this.benPart.attribut1
            this.allbens.attribut4 = this.pay.dateFin
            this.allbens.idUserCreator = this.UserIdConnected;
            this.allbens.userNameCreator = this.UserNameConnected;
            this.allbens.dateenreg = this.date;
            this.allbens.attribut2 ="لم يتم الصرف"
            this.BenOrdreService.CreateBenPayStockOrdre(this.allbens).subscribe(res => {
              
              this.typeStock.quantite = this.quantiteC.toString();
              this.TypeStockageService.PutObservableE(this.typeStock).subscribe(res => {

              })
            })
          }
        }

        if (this.categ) {
          for (let i = 0; i < this.BenListCateg.length; i++) {
            this.allbens.cin = this.BenListCateg[i].numCin;
            this.allbens.idBen = this.BenListCateg[i].id;
            this.allbens.nomBen = this.BenListCateg[i].nomprenom;
            this.allbens.idOrdrePayStockage = this.IdO;
            this.allbens.quatite = this.benPart.quatite;
            this.allbens.nomStock = this.nomstock;
            this.allbens.idstock = this.stock.id;
            this.allbens.typeStock = this.tyStock;
            this.allbens.attribut1 = this.benPart.attribut1
            this.allbens.attribut4 = this.pay.dateFin
            this.allbens.idUserCreator = this.UserIdConnected;
            this.allbens.userNameCreator = this.UserNameConnected;
            this.allbens.dateenreg = this.date;
            this.allbens.attribut2 = "غير مستلم"
            this.BenOrdreService.CreateBenPayStockOrdre(this.allbens).subscribe(res => {

              this.typeStock.quantite = this.quantiteC.toString();
              this.TypeStockageService.PutObservableE(this.typeStock).subscribe(res => {

              })
            })
          }
        }

        if (this.nbfam) {
          for (let i = 0; i < this.BenListNbFam.length; i++) {
            this.allbens.cin = this.BenListNbFam[i].numCin;
            this.allbens.idBen = this.BenListNbFam[i].id;
            this.allbens.nomBen = this.BenListNbFam[i].nomprenom;
            this.allbens.idOrdrePayStockage = this.IdO;
            this.allbens.quatite = this.benPart.quatite;
            this.allbens.nomStock = this.nomstock;
            this.allbens.idstock = this.stock.id;
            this.allbens.typeStock = this.tyStock;
            this.allbens.attribut1 = this.benPart.attribut1
            this.allbens.attribut4 = this.pay.dateFin
            this.allbens.idUserCreator = this.UserIdConnected;
            this.allbens.userNameCreator = this.UserNameConnected;
            this.allbens.dateenreg = this.date;
            this.allbens.attribut2 = "غير مستلم"
            this.BenOrdreService.CreateBenPayStockOrdre(this.allbens).subscribe(res => {

              this.typeStock.quantite = this.quantiteC.toString();
              this.TypeStockageService.PutObservableE(this.typeStock).subscribe(res => {

              })
            })
          }
        }

        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        this.selecteditems = [];
        this.benPartList = [];
        this.benPartTest = false;
        this.toutBen = false;
        this.TestQt = false;
        this.redorgreen = false;
        this.BenList = [];
        this.BenListCateg = [];
        this.BenListNbFam = [];
        this.categ = false;
        this.part = false;
        this.nbfam = false;
        form.resetForm();
      },
        err => {
          this.toastr.error(" فشل في التسجيل", "فشل")
        })
    }
  }

  //Calcul Qt
  redorgreen: boolean = false;
  quantiteC: number = 0;
  totqt: number = 0;
  calculqt(event) {
    if (this.part) {
      this.quantiteC = +this.typeStock.quantite - +event.target.value;
      this.typeStock.quantite = this.quantiteC.toString();
      if (this.quantiteC >= 0) {
        this.redorgreen = true;
      } else {
        this.redorgreen = false;
      }
    }

    if (this.toutBen) {
      this.totqt = this.nball * +event.target.value;
      this.quantiteC = +this.typeStock.quantite - this.totqt
      if (this.quantiteC >= 0) {
        this.redorgreen = true;
      } else {
        this.redorgreen = false;
      }
    }

    if (this.categ) {
      this.totqt = this.BenListCateg.length * +event.target.value;
      this.quantiteC = +this.typeStock.quantite - this.totqt
      if (this.quantiteC >= 0) {
        this.redorgreen = true;
      } else {
        this.redorgreen = false;
      }
    }

    if (this.nbfam) {
      this.totqt = this.BenListNbFam.length * +event.target.value;
      this.quantiteC = +this.typeStock.quantite - this.totqt
      if (this.quantiteC >= 0) {
        this.redorgreen = true;
      } else {
        this.redorgreen = false;
      }
    }
  }

}
