import { Component, OnInit } from '@angular/core';
import { RepairRequestService } from '../../../shared/Services/voiture/repair-request.service';
import { RepairRequest } from '../../../shared/Models/voiture/repair-request.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-maintenance-voiture',
  templateUrl: './histo-maintenance-voiture.component.html',
  styleUrls: ['./histo-maintenance-voiture.component.css']
})
export class HistoMaintenanceVoitureComponent implements OnInit {

  constructor(private recpService: RepairRequestService,
    private toastr: ToastrService) { }

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

  getBack() {
    this.fact.etat = "معتمدة"
    this.fact.etatdir = "معتمدة"
    this.recpService.PutObservableE(this.fact).subscribe(res => {
      this.getrecpList();
      this.toastr.success("تم إعتماد طلب صيانة السيارة بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم إعتماد طلب صيانة السيارة', ' فشل');
      })


  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.recpService.Delete(id)
        .subscribe(res => {
          this.getrecpList();
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
