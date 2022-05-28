import { Component, OnInit } from '@angular/core';
import { AllMaintenanceService } from '../../../shared/Services/AllMaintenance/all-maintenance.service';
import { AllMaintenance } from '../../../shared/Models/AllMaintenance/all-maintenance.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-all-maintenance',
  templateUrl: './histo-all-maintenance.component.html',
  styleUrls: ['./histo-all-maintenance.component.css']
})
export class HistoAllMaintenanceComponent implements OnInit {

  constructor(private demService: AllMaintenanceService,
    private toastr: ToastrService) { }

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

  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demService.Delete(id)
        .subscribe(res => {
          this.GetList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

  }
}
