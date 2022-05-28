import { Component, OnInit } from '@angular/core';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-emploi',
  templateUrl: './histo-emploi.component.html',
  styleUrls: ['./histo-emploi.component.css']
})
export class HistoEmploiComponent implements OnInit {

  constructor(private ctService: CreationTravailDemandeService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCreance();
  }
  factList: CrationTravailDemande[] = [];
  GfactList: CrationTravailDemande[] = [];

  getCreance() {
    this.ctService.Get().subscribe(res => {
      this.factList = res;

    })

  }

  factId: number
  fact: CrationTravailDemande = new CrationTravailDemande();
  test0: boolean = false;
  test50: boolean = false;
  test75: boolean = false;
  test100: boolean = false;
  val: string;
  populateForm(facture: CrationTravailDemande) {
    this.ctService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    if (this.fact.etatdg == "في الإنتظار" && this.fact.etatrh == "في الإنتظار" && this.fact.etatdir == "في الإنتظار") {
      this.test0 = true;
      this.test50 = false;
      this.test75 = false;
      this.test100 = false;
      this.val = '0%'
    }
    else if (this.fact.etatrh == "موافقة" && this.fact.etatdg == "موافقة" && this.fact.etatdir == "في الإنتظار") {
      this.test0 = false;
      this.test50 = false;
      this.test75 = true;
      this.test100 = false;
      this.val = '75%'
    }
    else if (this.fact.etatdg == "موافقة" && this.fact.etatrh == "في الإنتظار" && this.fact.etatdir == "في الإنتظار") {
      this.test0 = false;
      this.test50 = true;
      this.test75 = false;
      this.test100 = false;
      this.val = '50%'
    }
    else if ((this.fact.etatdir == "موافقة" && this.fact.etatdg == "موافقة" && this.fact.etatrh == "موافقة") || this.fact.etat =="موافقة") {
      this.test0 = false;
      this.test50 = false;
      this.test75 = false;
      this.test100 = true;
      this.val = '100%'
    }
  }

  date = new Date().toLocaleDateString();
  accept() {
   this.fact.etat = "موافقة"
    this.fact.datedir = this.date;

    this.ctService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }


  refuse() {
    this.fact.etat = "رفض"
    this.ctService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })

  }

  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.ctService.Delete(id)
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
