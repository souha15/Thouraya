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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-details-ordre-pay',
  templateUrl: './details-ordre-pay.component.html',
  styleUrls: ['./details-ordre-pay.component.css']
})
export class DetailsOrdrePayComponent implements OnInit {


  private routeSub: Subscription;

  constructor(private OrdrePayService: OrdrePayStockageService,
    private UserService: UserServiceService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private stockService: StockService,
    private benService: GestBenService,
    private TypeStockageService: TypeStockageService,
    private settingsService: SettingsBenService,
    private BenOrdreService: BenPayStockOrdreService,) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  //get the id in Url

  Id: number;
  st: OrdrePayStockage = new OrdrePayStockage();
  odreListBen: BenPayStockOrdre[] = [];
  odreListBenF: BenPayStockOrdre[] = [];
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.OrdrePayService.GetById(this.Id).subscribe(res => {
        this.st = res
        this.BenOrdreService.ListBenPayStockOrdre().subscribe(res => {
          this.odreListBenF = res
          this.odreListBen = this.odreListBenF.filter(item => item.idOrdrePayStockage == this.Id)
        })
      })
    })


  }
}
