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
  p: Number = 1;
  count: Number = 5;
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
  rslt: any;
  populateForm(facture: NewFormation) {
    this.formationService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.formationService.GetFormationHistorique(this.fact.id).subscribe(res => {
      this.rslt = res.attribut6

    })
  }
  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etat = "موافق"
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


}
