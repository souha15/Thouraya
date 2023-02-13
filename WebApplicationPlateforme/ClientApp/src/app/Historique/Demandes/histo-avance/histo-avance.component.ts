import { Component, OnInit } from '@angular/core';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-avance',
  templateUrl: './histo-avance.component.html',
  styleUrls: ['./histo-avance.component.css']
})
export class HistoAvanceComponent implements OnInit {
  filter;

  constructor(private avanceService: AvanceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getDep();
  }

  p: Number = 1;
  count: Number = 5;

  factList: Avance[] = [];
  getDep() {
    this.avanceService.Get().subscribe(res => {
      this.factList = res;
    })
  }

  factId: number
  fact: Avance = new Avance();
  etatok: boolean;

  rslt: string;
  populateForm(facture: Avance) {
    this.avanceService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.avanceService.GetHistorique(this.fact.id).subscribe(res => {
      this.rslt = res.attribut6

    })

  }

  raisonRefus: string;
  raison(event) {
    this.raisonRefus = event.target.value;
  }
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  date = new Date().toLocaleDateString();
  accept() {

    this.fact.attribut2 = "موافقة"
    this.fact.dateetab = this.date;
    this.avanceService.PutObservableE(this.fact).subscribe(res => {
        this.getDep();
        this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
      this.msg = "تم  قبول الطلب بنجاح"
      this.succ = true;
      this.failed = false;

    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
        this.failed = true;
        this.succ = false;
        this.msg = "لم يتم  قبول الطلب"
      })

  }
  refuse() {
    if (this.raisonRefus != null) {
      this.fact.raisonRefusC = this.raisonRefus;
      this.fact.attribut2 = "رفض"
      this.fact.dateetab = this.date;
      this.avanceService.PutObservableE(this.fact).subscribe(res => {
        this.getDep();
        this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
        this.succ = true;
        this.failed = false;
        this.msg = "تم  رفض الطلب بنجاح"
      },
        err => {
          this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
          this.msg = "لم يتم رفض الطلب "
          this.failed = true;
          this.succ = false;
        })
    } else {
      this.toastr.error('اكتب سبب الرفض ', ' فشل');
      this.msg = "اكتب سبب الرفض"
      this.failed = true;
      this.succ = false;
    }
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.avanceService.Delete(id)
        .subscribe(res => {
          this.getDep();
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
