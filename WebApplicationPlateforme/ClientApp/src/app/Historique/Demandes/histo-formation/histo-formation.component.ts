import { Component, OnInit } from '@angular/core';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';
import { NewFormation } from '../../../shared/Models/ServiceRh/new-formation.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-formation',
  templateUrl: './histo-formation.component.html',
  styleUrls: ['./histo-formation.component.css']
})
export class HistoFormationComponent implements OnInit {
  filter;
  constructor(private formationService: NewFormationService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getCreance();
  }

  factList: NewFormation[] = [];
  GfactList: NewFormation[] = [];

  getCreance() {
    this.formationService.Get().subscribe(res => {
      this.factList = res;

    })

  }

  //Populate Form 
  factId: number
  fact: NewFormation = new NewFormation();
  test0: boolean = false;
  test50: boolean = false;
  test75: boolean = false;
  test100: boolean = false;
  val: string;
  populateForm(facture: NewFormation) {
    this.formationService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    if (this.fact.etat == "موافقة") {
      this.test0 = false;
      this.test50 = false;
      this.test75 = false;
      this.test100 = true;
      this.val = "100%"
    } else if (this.fact.etatdir == "موافقة" && this.fact.etatc == "في الإنتظار" && this.fact.etatrh == "في الإنتظار") {
      this.test0 = false;
      this.test50 = true;
      this.test75 = false;
      this.test100 = false;
      this.val = "50%"
    } else if (this.fact.etatdir == "موافقة" && this.fact.etatc == "موافقة" && this.fact.etatrh == "في الإنتظار" ) {
      this.test0 = false;
      this.test50 = false;
      this.test75 = true;
      this.test100 = false;
      this.val = "75%"
    }

    else if (this.fact.etatdir == "في الإنتظار" && this.fact.etatc == "في الإنتظار" && this.fact.etatrh == "في الإنتظار") {
      this.test0 = true;
      this.test50 = false;
      this.test75 = false;
      this.test100 = false;
      this.val = "0%"
    }
  }
  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etat = "موافقة"
    this.formationService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }
  refuse() {
    this.fact.etat = "رفض"
    this.formationService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.formationService.Delete(id)
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
