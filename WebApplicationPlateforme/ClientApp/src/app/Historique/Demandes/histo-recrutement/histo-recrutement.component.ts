import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../../../shared/Services/Rh/recrutement.service';
import { Recrutement } from '../../../shared/Models/RH/recrutement.model';

@Component({
  selector: 'app-histo-recrutement',
  templateUrl: './histo-recrutement.component.html',
  styleUrls: ['./histo-recrutement.component.css']
})
export class HistoRecrutementComponent implements OnInit {

  constructor(private congeService: RecrutementService,) { }

  ngOnInit(): void {
    this.CongeList();
  }
  p: Number = 1;
  count: Number = 5;
  congeList: Recrutement[] = [];
  filtredCongeList: Recrutement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: Recrutement = new Recrutement();

  populateForm(conge: Recrutement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }


}
