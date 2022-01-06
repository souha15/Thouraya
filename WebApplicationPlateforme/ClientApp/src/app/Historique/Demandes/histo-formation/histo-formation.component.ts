import { Component, OnInit } from '@angular/core';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';
import { NewFormation } from '../../../shared/Models/ServiceRh/new-formation.model';

@Component({
  selector: 'app-histo-formation',
  templateUrl: './histo-formation.component.html',
  styleUrls: ['./histo-formation.component.css']
})
export class HistoFormationComponent implements OnInit {

  constructor(private formationService: NewFormationService, ) { }

  ngOnInit(): void {
    this.getCreance();
  }

  factList: NewFormation[] = [];
  GfactList: NewFormation[] = [];

  getCreance() {
    this.formationService.Get().subscribe(res => {
      this.factList = res;

    })

  }

  //Populate Form 
  factId: number
  fact: NewFormation = new NewFormation();
  populateForm(facture: NewFormation) {
    this.formationService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

}
