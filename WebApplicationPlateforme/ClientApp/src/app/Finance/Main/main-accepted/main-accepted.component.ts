import { Component, OnInit } from '@angular/core';
import { FactureService } from '../../../shared/Services/Finance/facture.service';
import { Facture } from '../../../shared/Models/Finance/facture.model';
import { CreanceFinaciereService } from '../../../shared/Services/Finance/creance-finaciere.service';
import { CreanceFinanciere } from '../../../shared/Models/Finance/creance-financiere.model';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { RepairRequest } from '../../../shared/Models/voiture/repair-request.model';
import { RepairRequestService } from '../../../shared/Services/voiture/repair-request.service';

@Component({
  selector: 'app-main-accepted',
  templateUrl: './main-accepted.component.html',
  styleUrls: ['./main-accepted.component.css']
})
export class MainAcceptedComponent implements OnInit {

  constructor(private factureService: FactureService,
    private creanceSerice: CreanceFinaciereService,
    private avnceServic: AvanceService,
    private carsService: RepairRequestService,) { }

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
  nbav: number = 0;
  nbfacture: number = 0;
  nbcr: number = 0;
  nbtot: number;
  nbcars: number = 0;

  getFactLis() {
    this.factureService.Get().subscribe(res => {
      this.factList = res
      this.FiltredFactLis = this.factList.filter(item => item.attribut2 == "معتمدة")

      this.nbfacture = this.FiltredFactLis.length;
      this.nbtot = this.nbfacture;

    })

    this.creanceSerice.Get().subscribe(res => {
      this.crList = res;
      this.fcrList = this.crList.filter(item => item.attribut2 == "معتمدة");
      this.nbcr = this.fcrList.length;
      this.nbtot = this.nbtot + this.nbcr
    })

    this.avnceServic.Get().subscribe(res => {
      this.avList = res
      this.favList = this.avList.filter(item => item.attribut2 == "معتمدة")
      this.nbav = this.favList.length
      this.nbtot = this.nbtot + this.nbav
    })


    this.carsService.Get().subscribe(res => {
      this.carsList = res
      this.FcarsList = this.carsList.filter(item => item.etat == "معتمدة")
      this.nbcars = this.FcarsList.length
      this.nbtot = this.nbtot + this.nbcars
    })
  }
}
