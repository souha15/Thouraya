import { Component, OnInit } from '@angular/core';
import { RecrutementService } from '../../../shared/Services/Rh/recrutement.service';
import { Recrutement } from '../../../shared/Models/RH/recrutement.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-histo-recrutement',
  templateUrl: './histo-recrutement.component.html',
  styleUrls: ['./histo-recrutement.component.css']
})
export class HistoRecrutementComponent implements OnInit {

  constructor(private congeService: RecrutementService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CongeList();
    this.resetForm();
  }
  p: Number = 1;
  count: Number = 5;
  congeList: Recrutement[] = [];
  filtredCongeList: Recrutement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: Recrutement = new Recrutement();

  populateForm(conge: Recrutement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }

  perc: string;

  percentageetat(event) {
    this.perc = event.target.value;
    if (this.perc == "موافق") {
      this.congeService.formData.attribut3 = "100%"
    }
  }
  date = new Date().toLocaleDateString();
  conge: Recrutement = new Recrutement();

  updateRecord(form: NgForm) {
    this.congeService.formData.attribut2 = this.perc;
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
      datedebut: '',
      datefin: '',
      dure: '',
      organisme: '',
      idremplacant: '',
      nomremplacant: '',
      tache: '',
      etatdir: '',
      etatrh: '',
      iddir: '',
      idrh: '',
      nomrh: '',
      nomdir: '',
      dated: '',
      daterh: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }

}
