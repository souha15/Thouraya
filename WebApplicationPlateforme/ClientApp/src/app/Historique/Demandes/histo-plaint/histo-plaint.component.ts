import { Component, OnInit } from '@angular/core';
import { PlaintService } from '../../../shared/Services/User Services/plaint.service';
import { Plaint } from '../../../shared/Models/User Services/plaint.model';

@Component({
  selector: 'app-histo-plaint',
  templateUrl: './histo-plaint.component.html',
  styleUrls: ['./histo-plaint.component.css']
})
export class HistoPlaintComponent implements OnInit {

  constructor(private plaintService: PlaintService,) { }

  ngOnInit(): void {

    this.CongeList();
  }
  //Get Conge Demand Lis

  congeList: Plaint[] = [];
  dem: Plaint = new Plaint();
  filtredCongeList: Plaint[] = [];
  CongeList() {
    this.plaintService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  p: Number = 1;
  count: Number = 5;

  populateForm(conge: Plaint) {
    this.plaintService.formData = Object.assign({}, conge)
    this.dem = Object.assign({}, conge)

  }
}
