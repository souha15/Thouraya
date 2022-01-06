import { Component, OnInit } from '@angular/core';
import { AllMaintenanceService } from '../../../shared/Services/AllMaintenance/all-maintenance.service';
import { AllMaintenance } from '../../../shared/Models/AllMaintenance/all-maintenance.model';

@Component({
  selector: 'app-histo-all-maintenance',
  templateUrl: './histo-all-maintenance.component.html',
  styleUrls: ['./histo-all-maintenance.component.css']
})
export class HistoAllMaintenanceComponent implements OnInit {

  constructor(private demService: AllMaintenanceService,) { }

  ngOnInit(): void {
    this.GetList();
  }

  p: Number = 1;
  count: Number = 5;
  //Get Dem List
  demList2: AllMaintenance[] = [];
  demList: AllMaintenance[] = [];
  GetList() {
    this.demService.Get().subscribe(res => {
      this.demList = res;
    })
  }
  dem: AllMaintenance = new AllMaintenance();
  populateForm(dem: AllMaintenance) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);

  }
}
