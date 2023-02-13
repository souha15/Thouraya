import { Component, OnInit } from '@angular/core';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

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
  p: Number = 1;
  count: Number = 5;
  factId: number
  fact: CrationTravailDemande = new CrationTravailDemande();
  rslt: string;
  populateForm(facture: CrationTravailDemande) {
    this.ctService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.ctService.GetHistorique(this.fact.id).subscribe(res => {
      this.rslt = res.attribut6

    })
  }
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  date = new Date().toLocaleDateString();
  updateRecord(form: NgForm) {
    this.ctService.PutObservableE(this.fact).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      form.resetForm();
      this.getCreance();

      this.msg = "  تم التحديث بنجاح"

      this.succ = true;
      this.failed = false;
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
        this.msg = "  فشل عند التحديث"

        this.failed = true;
        this.succ = false;
      }


    )
  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

}
