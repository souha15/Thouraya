import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-heure-supp',
  templateUrl: './histo-heure-supp.component.html',
  styleUrls: ['./histo-heure-supp.component.css']
})
export class HistoHeureSuppComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getCreance();
  }
  //Populate Form 
  factId: number
  fact: DemandeSuppHeure = new DemandeSuppHeure();

  rslt: any;
  populateForm(facture: DemandeSuppHeure) {
    this.suppheureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.suppheureService.GetHistorique(this.fact.id).subscribe(res => {
      this.rslt = res.attribut6

    })

  }

  p: Number = 1;
  count: Number = 5;
  factList: DemandeSuppHeure[] = [];
  GfactList: DemandeSuppHeure[] = [];
  getCreance() {
    this.suppheureService.Get().subscribe(res => {
      this.factList = res;
    })

  }

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etat = "موافقة"
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
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
    this.fact.etat = "رفض"
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
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
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.suppheureService.Delete(id)
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
