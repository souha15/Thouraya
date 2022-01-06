import { Component, OnInit } from '@angular/core';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';

@Component({
  selector: 'app-histo-avance',
  templateUrl: './histo-avance.component.html',
  styleUrls: ['./histo-avance.component.css']
})
export class HistoAvanceComponent implements OnInit {

  constructor(private avanceService: AvanceService) { }

  ngOnInit(): void {
    this.getDep();
  }

  p: Number = 1;
  count: Number = 5;

  factList: Avance[] = [];
  getDep() {
    this.avanceService.Get().subscribe(res => {
      this.factList = res;
    })
  }

  factId: number
  fact: Avance = new Avance();
  etatok: boolean;
  populateForm(facture: Avance) {
    this.avanceService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

  }
}
