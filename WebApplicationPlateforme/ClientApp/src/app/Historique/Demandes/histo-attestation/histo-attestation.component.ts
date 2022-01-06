import { Component, OnInit } from '@angular/core';
import { DemandeAttestationTravailService } from '../../../shared/Services/ServiceRh/demande-attestation-travail.service';
import { DemandeAttestationTravail } from '../../../shared/Models/ServiceRh/demande-attestation-travail.model';

@Component({
  selector: 'app-histo-attestation',
  templateUrl: './histo-attestation.component.html',
  styleUrls: ['./histo-attestation.component.css']
})
export class HistoAttestationComponent implements OnInit {

  constructor(private atService: DemandeAttestationTravailService) { }

  ngOnInit(): void {
    this.getCreance();
  }

  p: Number = 1;
  count: Number = 5;

  factList: DemandeAttestationTravail[] = [];
  GfactList: DemandeAttestationTravail[] = [];

  getCreance() {
    this.atService.Get().subscribe(res => {
      this.factList = res;
    })

  }

  //Populate Form 
  factId: number
  fact: DemandeAttestationTravail = new DemandeAttestationTravail();
  populateForm(facture: DemandeAttestationTravail) {
    this.atService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }
}
