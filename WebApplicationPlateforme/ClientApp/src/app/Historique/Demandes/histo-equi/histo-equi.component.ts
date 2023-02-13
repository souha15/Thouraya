import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { Equipement } from '../../../shared/Models/RH/equipement.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-equi',
  templateUrl: './histo-equi.component.html',
  styleUrls: ['./histo-equi.component.css']
})
export class HistoEquiComponent implements OnInit {

  constructor(private congeService: EquipementService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.CongeList();

  }
  p: Number = 1;
  count: Number = 5;
  //Get Conge Demand Lis

  congeList: Equipement[] = [];
  filtredCongeList: Equipement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  per: Equipement = new Equipement();
  rslt: any;
  populateForm(conge: Equipement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)

    this.congeService.GetEquipementHistorique(this.per.id).subscribe(res => {
      this.rslt = res.attribut6

    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  conge: Equipement = new Equipement();
  date = new Date().toLocaleDateString();

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  updateRecord(form: NgForm) {
    this.conge = Object.assign(this.conge, form.value);
    this.conge.datedir = this.date;
    this.congeService.PutObservableE(this.conge).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      form.resetForm();
        this.CongeList();
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

  

}
