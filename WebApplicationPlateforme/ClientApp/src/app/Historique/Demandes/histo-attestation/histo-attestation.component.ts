import { Component, OnInit } from '@angular/core';
import { DemandeAttestationTravailService } from '../../../shared/Services/ServiceRh/demande-attestation-travail.service';
import { DemandeAttestationTravail } from '../../../shared/Models/ServiceRh/demande-attestation-travail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-attestation',
  templateUrl: './histo-attestation.component.html',
  styleUrls: ['./histo-attestation.component.css']
})
export class HistoAttestationComponent implements OnInit {
  filter;
  constructor(private atService: DemandeAttestationTravailService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getCreance();
  }

  p: Number = 1;
  count: Number = 5;

  factList: DemandeAttestationTravail[] = [];
  GfactList: DemandeAttestationTravail[] = [];

  getCreance() {
    this.atService.Get().subscribe(res => {
      this.factList = res;
    })

  }

  //Populate Form 
  factId: number
  fact: DemandeAttestationTravail = new DemandeAttestationTravail();
  populateForm(facture: DemandeAttestationTravail) {
    this.atService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  reason: string;
  getRefuseRaison(event) {
    this.reason = event.target.value;
  }
  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etat = "موافقة"
    this.atService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }
  refuse() {
    this.fact.etat = "رفض"
    this.fact.attribut6 = this.reason

    this.atService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.atService.Delete(id)
        .subscribe(res => {
          this.getCreance();
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
