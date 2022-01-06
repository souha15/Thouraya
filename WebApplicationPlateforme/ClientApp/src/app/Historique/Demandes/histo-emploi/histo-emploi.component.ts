import { Component, OnInit } from '@angular/core';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';

@Component({
  selector: 'app-histo-emploi',
  templateUrl: './histo-emploi.component.html',
  styleUrls: ['./histo-emploi.component.css']
})
export class HistoEmploiComponent implements OnInit {

  constructor(private ctService: CreationTravailDemandeService) { }

  ngOnInit(): void {
    this.getCreance();
  }
  factList: CrationTravailDemande[] = [];
  GfactList: CrationTravailDemande[] = [];

  getCreance() {
    this.ctService.Get().subscribe(res => {
      this.factList = res;

    })

  }

  factId: number
  fact: CrationTravailDemande = new CrationTravailDemande();
  populateForm(facture: CrationTravailDemande) {
    this.ctService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

}
