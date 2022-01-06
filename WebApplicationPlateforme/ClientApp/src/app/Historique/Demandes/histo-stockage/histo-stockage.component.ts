import { Component, OnInit } from '@angular/core';
import { OrdrePayStockageService } from '../../../shared/Services/Gsetion Stock/ordre-pay-stockage.service';
import { OrdrePayStockage } from '../../../shared/Models/Gestion Stock/ordre-pay-stockage.model';
import { BenPayStockOrdreService } from '../../../shared/Services/Gsetion Stock/ben-pay-stock-ordre.service';
import { BenPayStockOrdre } from '../../../shared/Models/Gestion Stock/ben-pay-stock-ordre.model';
import { TypeStockage } from '../../../shared/Models/Gestion Stock/type-stockage.model';
import { TypeStockageService } from '../../../shared/Services/Gsetion Stock/type-stockage.service';

@Component({
  selector: 'app-histo-stockage',
  templateUrl: './histo-stockage.component.html',
  styleUrls: ['./histo-stockage.component.css']
})
export class HistoStockageComponent implements OnInit {

  constructor(private OrdrePayService: OrdrePayStockageService,
    private BenOrdreService: BenPayStockOrdreService,
    private TypeStockageService: TypeStockageService, ) { }

  ngOnInit(): void {
    this.getList();
  }
  p: Number = 1;
  count: Number = 5;
  
  ListStockageA: OrdrePayStockage[] = [];
  getList() {
    this.OrdrePayService.ListOrdrePayStockage().subscribe(res => {
      this.ListStockageA = res

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
}
