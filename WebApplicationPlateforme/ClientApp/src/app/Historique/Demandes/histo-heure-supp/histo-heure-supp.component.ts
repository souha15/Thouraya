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
  test0: boolean = false;
  test50: boolean = false;
  test75: boolean = false;
  test100: boolean = false;
  val: string;
  populateForm(facture: DemandeSuppHeure) {
    this.suppheureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    console.log(this.fact)
    if (this.fact.etat == "موافقة") {
      this.test0 = false;
      this.test50 = false;
      this.test75 = false;
      this.test100 = true;
      this.val = "100%"
    } else if (this.fact.etatdir == "موافقة" && this.fact.etatetab == null && this.fact.etatrh == null) {
      this.test0 = false;
      this.test50 = true;
      this.test75 = false;
      this.test100 = false;
      this.val = "50%"
    } else if (this.fact.etatdir == "موافقة" && this.fact.etatetab == null && this.fact.etatrh == null) {
      this.test0 = false;
      this.test50 = false;
      this.test75 = true;
      this.test100 = false;
      this.val = "75%"
    }

    else if (this.fact.etatdir == "في الإنتظار" && this.fact.etatetab == null && this.fact.etatrh == null) {
      this.test0 = true;
      this.test50 = false;
      this.test75 = false;
      this.test100 = false;
      this.val = "0%"
    }

  }


  factList: DemandeSuppHeure[] = [];
  GfactList: DemandeSuppHeure[] = [];
  getCreance() {
    this.suppheureService.Get().subscribe(res => {
      this.factList = res;
    })

  }


  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etat = "موافقة"
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }

  refuse() {
    this.fact.etat = "رفض"
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
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
