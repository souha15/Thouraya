import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../../shared/Services/User Services/demission.service';
import { Demissioon } from '../../../shared/Models/User Services/demissioon.model';

@Component({
  selector: 'app-histo-demission',
  templateUrl: './histo-demission.component.html',
  styleUrls: ['./histo-demission.component.css']
})
export class HistoDemissionComponent implements OnInit {

  constructor(private demService: DemissionService,) { }

  ngOnInit(): void {
    this.CongeList();
  }

  //Get Conge Demand Lis

  congeList: Demissioon[] = [];
  dem: Demissioon = new Demissioon();
  filtredCongeList: Demissioon[] = [];
  CongeList() {
    this.demService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: Demissioon = new Demissioon();
  populateForm(conge: Demissioon) {
    this.demService.formData = Object.assign({}, conge)
    this.per = Object.assign({}, conge)

  }
  p: Number = 1;
  count: Number = 5;
}
