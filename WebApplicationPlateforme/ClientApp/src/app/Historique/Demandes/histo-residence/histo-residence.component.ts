import { Component, OnInit } from '@angular/core';
import { ResidenceService } from '../../../shared/Services/User Services/residence.service';
import { Residence } from '../../../shared/Models/User Services/residence.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-residence',
  templateUrl: './histo-residence.component.html',
  styleUrls: ['./histo-residence.component.css']
})
export class HistoResidenceComponent implements OnInit {

  constructor(private residenceService: ResidenceService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.CongeList();
  }
  openInNewTab(url) {
    window.open(url, '_blank').focus();
  }
  p: Number = 1;
  count: Number = 5;
  congeList: Residence[] = [];
  dem: Residence = new Residence();
  filtredCongeList: Residence[] = [];
  CongeList() {
    this.residenceService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }
  rslt: any;
  populateForm(conge: Residence) {
    this.residenceService.formData = Object.assign({}, conge)
    this.dem = Object.assign({}, conge)
    this.residenceService.GetHistorique(this.dem.id).subscribe(res => {
      this.rslt = res.attribut6

    })

  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  updateRecord(form: NgForm) {
    this.dem.datedir = this.date;
    this.dem.etat = this.etat;
    this.dem.etatdir = this.etat;
    this.residenceService.PutObservableE(this.dem).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.CongeList();
      form.resetForm();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.residenceService.Delete(id)
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
}
