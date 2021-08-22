import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../../shared/Services/Finance/facture.service';
import { Facture } from '../../../shared/Models/Finance/facture.model';
import { CreanceFinaciereService } from '../../../shared/Services/Finance/creance-finaciere.service';
import { CreanceFinanciere } from '../../../shared/Models/Finance/creance-financiere.model';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { RepairRequest } from '../../../shared/Models/voiture/repair-request.model';
import { RepairRequestService } from '../../../shared/Services/voiture/repair-request.service';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';

@Component({
  selector: 'app-main-not-accepted',
  templateUrl: './main-not-accepted.component.html',
  styleUrls: ['./main-not-accepted.component.css']
})
export class MainNotAcceptedComponent implements OnInit {

  constructor(private factureService: FactureService,
    private creanceSerice: CreanceFinaciereService,
    private avnceServic: AvanceService,
    private carsService: RepairRequestService,
    private demService: DemPayChequeService) { }

  ngOnInit(): void {
    this.getFactLis();
  }

  crList: CreanceFinanciere[] = [];
  fcrList: CreanceFinanciere[] = [];
  factList: Facture[] = [];
  FiltredFactLis: Facture[] = [];
  carsList: RepairRequest[] = [];
  FcarsList: RepairRequest[] = [];
  favList: Avance[] = [];
  avList: Avance[] = [];
  chlis: DemPayCheque[] = [];
  chlisf: DemPayCheque[] = [];
  nbav: number = 0;
  nbfacture: number = 0;
  nbcr: number = 0;
  nbtot: number;
  nbcars: number = 0;
  nbcheque:number = 0 
  getFactLis() {
    this.factureService.Get().subscribe(res => {
      this.factList = res
      this.FiltredFactLis = this.factList.filter(item => item.attribut2 == "غير معتمدة")

      this.nbfacture = this.FiltredFactLis.length;
      this.nbtot = this.nbfacture
    })

    this.creanceSerice.Get().subscribe(res => {
      this.crList = res;
      this.fcrList = this.crList.filter(item => item.attribut2 == "غير معتمدة");
      this.nbcr = this.fcrList.length;
  
      this.nbtot = this.nbtot + this.nbcr
    })

    this.avnceServic.Get().subscribe(res => {
      this.avList = res
      this.favList = this.avList.filter(item => item.attribut2 == "في الإنتظار")
      this.nbav = this.favList.length
      this.nbtot = this.nbtot + this.nbav
    })


    this.carsService.Get().subscribe(res => {
      this.carsList = res
      this.FcarsList = this.carsList.filter(item => item.etat == "في الإنتظار")
      this.nbcars = this.FcarsList.length
      this.nbtot = this.nbtot + this.nbcars
    })

    this.demService.Get().subscribe(res => {
      this.chlisf = res
      this.chlis = this.chlisf.filter(item => item.etatgeneral == "في الإنتظار")
      this.nbcheque = this.chlis.length
      this.nbtot = this.nbtot + this.nbcheque
    })
  }
}
