import { Component, OnInit } from '@angular/core';
import { PlaintService } from '../../../shared/Services/User Services/plaint.service';
import { Plaint } from '../../../shared/Models/User Services/plaint.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-histo-plaint',
  templateUrl: './histo-plaint.component.html',
  styleUrls: ['./histo-plaint.component.css']
})
export class HistoPlaintComponent implements OnInit {

  constructor(private plaintService: PlaintService,
    private toastr: ToastrService) { }

  ngOnInit(): void {

    this.CongeList();
  }
  //Get Conge Demand Lis

  congeList: Plaint[] = [];
  dem: Plaint = new Plaint();
  filtredCongeList: Plaint[] = [];
  CongeList() {
    this.plaintService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }

  p: Number = 1;
  count: Number = 5;

  populateForm(conge: Plaint) {
    this.plaintService.formData = Object.assign({}, conge)
    this.dem = Object.assign({}, conge)

  }

  isValidFormSubmitted = false;
  path: string;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true
      this.dem.datedir = this.date;

      this.plaintService.PutObservableE(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.CongeList();
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.plaintService.Delete(id)
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
