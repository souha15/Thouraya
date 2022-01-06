import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { Equipement } from '../../../shared/Models/RH/equipement.model';

@Component({
  selector: 'app-histo-equi',
  templateUrl: './histo-equi.component.html',
  styleUrls: ['./histo-equi.component.css']
})
export class HistoEquiComponent implements OnInit {

  constructor(private congeService: EquipementService,) { }

  ngOnInit(): void {
    this.CongeList();
  }
  p: Number = 1;
  count: Number = 5;
  //Get Conge Demand Lis

  congeList: Equipement[] = [];
  filtredCongeList: Equipement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: Equipement = new Equipement();
  populateForm(conge: Equipement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)


  }

}
