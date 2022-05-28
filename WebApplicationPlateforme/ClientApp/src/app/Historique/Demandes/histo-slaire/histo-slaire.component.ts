import { Component, OnInit } from '@angular/core';
import { DemandeSalarialeService } from '../../../shared/Services/Rh/demande-salariale.service';
import { DemandeSalariale } from '../../../shared/Models/RH/demande-salariale.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-histo-slaire',
  templateUrl: './histo-slaire.component.html',
  styleUrls: ['./histo-slaire.component.css']
})
export class HistoSlaireComponent implements OnInit {

  constructor(private congeService: DemandeSalarialeService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.CongeList();
    this.resetForm();
  }
  p: Number = 1;
  count: Number = 5;

  congeList: DemandeSalariale[] = [];
  filtredCongeList: DemandeSalariale[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: DemandeSalariale = new DemandeSalariale();

  populateForm(conge: DemandeSalariale) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }

  date = new Date().toLocaleDateString();
  conge: DemandeSalariale = new DemandeSalariale();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.congeService.Delete(id)
        .subscribe(res => {
          this.CongeList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

    }

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      type: '',
      date: '',
      langue: '',
      organisme: '',
      attribut1: '',
      attribut2: '',
      dateenreg: '',
      dirnom: '',
      dirid: '',
      etatdate: '',
      etat: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }
}
