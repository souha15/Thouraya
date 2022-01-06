import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';

@Component({
  selector: 'app-histo-heure-supp',
  templateUrl: './histo-heure-supp.component.html',
  styleUrls: ['./histo-heure-supp.component.css']
})
export class HistoHeureSuppComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,) { }

  ngOnInit(): void {
    this.getCreance();
  }
  //Populate Form 
  factId: number
  fact: DemandeSuppHeure = new DemandeSuppHeure();
  populateForm(facture: DemandeSuppHeure) {
    this.suppheureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }


  factList: DemandeSuppHeure[] = [];
  GfactList: DemandeSuppHeure[] = [];
  getCreance() {
    this.suppheureService.Get().subscribe(res => {
      this.factList = res;
    })

  }
}
