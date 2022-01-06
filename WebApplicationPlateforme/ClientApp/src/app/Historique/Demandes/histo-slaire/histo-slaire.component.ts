import { Component, OnInit } from '@angular/core';
import { DemandeSalarialeService } from '../../../shared/Services/Rh/demande-salariale.service';
import { DemandeSalariale } from '../../../shared/Models/RH/demande-salariale.model';

@Component({
  selector: 'app-histo-slaire',
  templateUrl: './histo-slaire.component.html',
  styleUrls: ['./histo-slaire.component.css']
})
export class HistoSlaireComponent implements OnInit {

  constructor(private congeService: DemandeSalarialeService,) { }

  ngOnInit(): void {
    this.CongeList();
  }
  p: Number = 1;
  count: Number = 5;

  congeList: DemandeSalariale[] = [];
  filtredCongeList: DemandeSalariale[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.etat == "في الانتظار")
    })
  }

  per: DemandeSalariale = new DemandeSalariale();

  populateForm(conge: DemandeSalariale) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }
}
