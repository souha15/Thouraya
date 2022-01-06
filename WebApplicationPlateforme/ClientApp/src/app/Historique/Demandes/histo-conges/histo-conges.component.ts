import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { Conge } from '../../../shared/Models/RH/conge.model';

@Component({
  selector: 'app-histo-conges',
  templateUrl: './histo-conges.component.html',
  styleUrls: ['./histo-conges.component.css']
})
export class HistoCongesComponent implements OnInit {

  constructor(private congeService: CongeService,) { }

  ngOnInit(): void {
    this.CongeList()
  }

  p: Number = 1;
  count: Number = 5;

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  filtredCongeList2: Conge[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
      //this.filtredCongeList = this.filtredCongeList2.filter(item => item.attribut6 == "إعتماد بخصم" || item.attribut6 =="إعتماد بغير خصم")
    })
  }


  per: Conge = new Conge();

  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }
}
