import { Component, OnInit } from '@angular/core';
import { DemandeVoitureService } from '../../../shared/Services/DemandeVoiture/demande-voiture.service';
import { DemandeVoiture } from '../../../shared/Models/DemandeVoiture/demande-voiture.model';

@Component({
  selector: 'app-histo-voiture',
  templateUrl: './histo-voiture.component.html',
  styleUrls: ['./histo-voiture.component.css']
})
export class HistoVoitureComponent implements OnInit {

  constructor(private demService: DemandeVoitureService,) { }

  ngOnInit(): void {
    this.getDemList();
  }

  p: Number = 1;
  count: Number = 5;

  List: DemandeVoiture[] = []


  getDemList() {
    this.demService.Get().subscribe(res => {
      this.List = res
    })
  }
  dem: DemandeVoiture = new DemandeVoiture();
  populateForm(dem: DemandeVoiture) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);
  }
}
