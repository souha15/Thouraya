import { Component, OnInit } from '@angular/core';
import { ResidenceService } from '../../../shared/Services/User Services/residence.service';
import { Residence } from '../../../shared/Models/User Services/residence.model';

@Component({
  selector: 'app-histo-residence',
  templateUrl: './histo-residence.component.html',
  styleUrls: ['./histo-residence.component.css']
})
export class HistoResidenceComponent implements OnInit {

  constructor(private residenceService: ResidenceService,) { }

  ngOnInit(): void {
    this.CongeList();
  }
  openInNewTab(url) {
    window.open(url, '_blank').focus();
  }
  p: Number = 1;
  count: Number = 5;
  congeList: Residence[] = [];
  dem: Residence = new Residence();
  filtredCongeList: Residence[] = [];
  CongeList() {
    this.residenceService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  populateForm(conge: Residence) {
    this.residenceService.formData = Object.assign({}, conge)
    this.dem = Object.assign({}, conge)

  }
}
