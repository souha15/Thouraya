import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../../shared/Services/Finance/facture.service';
import { Facture } from '../../../shared/Models/Finance/facture.model';
import { CreanceFinaciereService } from '../../../shared/Services/Finance/creance-finaciere.service';
import { CreanceFinanciere } from '../../../shared/Models/Finance/creance-financiere.model';

@Component({
  selector: 'app-main-ready-payement',
  templateUrl: './main-ready-payement.component.html',
  styleUrls: ['./main-ready-payement.component.css']
})
export class MainReadyPayementComponent implements OnInit {

  constructor(private factureService: FactureService,
    private creanceSerice: CreanceFinaciereService) { }

  ngOnInit(): void {
    this.getFactLis();
  }

  nbfacture: number = 0;
  factList: Facture[] = [];
  FiltredFactLis: Facture[] = [];
  nbcr: number = 0;
  nbtot: number;
  crList: CreanceFinanciere[] = []
  fcrList: CreanceFinanciere[] = []
  getFactLis() {
    this.factureService.Get().subscribe(res => {
      this.factList = res
      this.FiltredFactLis = this.factList.filter(item => item.attribut2 == "جاهزة للصرف")

      this.nbfacture = this.FiltredFactLis.length;
      this.nbtot = this.nbfacture;
    })

    this.creanceSerice.Get().subscribe(res => {
      this.crList = res;
      this.fcrList = this.crList.filter(item => item.attribut2 == "جاهزة للصرف");
      this.nbcr = this.fcrList.length;
      this.nbtot = this.nbtot + this.nbcr
    })
  }
}
