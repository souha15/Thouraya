import { Component, OnInit } from '@angular/core';
import { RepairRequestService } from '../../../shared/Services/voiture/repair-request.service';
import { RepairRequest } from '../../../shared/Models/voiture/repair-request.model';

@Component({
  selector: 'app-histo-maintenance-voiture',
  templateUrl: './histo-maintenance-voiture.component.html',
  styleUrls: ['./histo-maintenance-voiture.component.css']
})
export class HistoMaintenanceVoitureComponent implements OnInit {

  constructor(private recpService: RepairRequestService,) { }

  ngOnInit(): void {
    this.getrecpList();
  }

  GfactList: RepairRequest[] = [];
  factList: RepairRequest[] = [];
  getrecpList() {
    this.recpService.Get().subscribe(res => {
      this.factList = res
    })
  }

  factId: number;
  fact: RepairRequest = new RepairRequest();
  populateForm(facture: RepairRequest) {
    this.recpService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

  }
}
