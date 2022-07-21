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
  test0: boolean = false;
  test50: boolean = false;
  test75: boolean = false;
  test100: boolean = false;
  val: string;
  populateForm(facture: Avance) {
    this.avanceService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

    if (this.fact.etatD == "في الإنتظار" && this.fact.etatC == "في الإنتظار" && this.fact.etatetab == "في الانتظار") {
      this.test0 = true;
      this.test50= false;
      this.test75 = false;
      this.test100 = false;
      this.val="0%";
    }
 
    else if (this.fact.etatD == "موافقة" && this.fact.etatC == "في الإنتظار" && this.fact.etatetab == "في الإنتظار") {
      this.test0 = false;
      this.test50 = true;
      this.test75 = false;
      this.test100 = false;
      this.val = "50%";
    }
    else if (this.fact.etatetab == "موافقة" && this.fact.etatD == "موافقة" && this.fact.etatC == "في الإنتظار") {
      this.test0 = false;
      this.test50 = false;
      this.test75 = true;
      this.test100 = false;
      this.val = "75%";
    }
    else if ((this.fact.etatC == "موافقة" && this.fact.etatD == "موافقة" && this.fact.etatetab == "موافقة") || this.fact.attribut2 =="موافقة") {
      this.test0 = false;
      this.test50 = false;
      this.test75 = false;
      this.test100 = true;
      this.val = "100%";
    }



  }

  raisonRefus: string;
  raison(event) {
    this.raisonRefus = event.target.value;
  }

  date = new Date().toLocaleDateString();
  accept() {

    this.fact.attribut2 = "موافقة"
    this.fact.dateetab = this.date;
    this.avanceService.PutObservableE(this.fact).subscribe(res => {
        this.getDep();
        this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
   

    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
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
      },
        err => {
          this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
        })
    } else {
      this.toastr.error('اكتب سبب الرفض ', ' فشل');
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
