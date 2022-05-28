import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../../shared/Services/User Services/demission.service';
import { Demissioon } from '../../../shared/Models/User Services/demissioon.model';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { switchAll } from 'rxjs/operators';

@Component({
  selector: 'app-histo-demission',
  templateUrl: './histo-demission.component.html',
  styleUrls: ['./histo-demission.component.css']
})
export class HistoDemissionComponent implements OnInit {

  constructor(private demService: DemissionService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.CongeList();
  }

  //Get Conge Demand Lis

  congeList: Demissioon[] = [];
  dem: Demissioon = new Demissioon();
  filtredCongeList: Demissioon[] = [];
  CongeList() {
    this.demService.Get().subscribe(res => {
      this.filtredCongeList = res
    })
  }
  val: string;
  test0: boolean = false;
  test50: boolean = false;
  test100: boolean = false;
  per: Demissioon = new Demissioon();
  populateForm(conge: Demissioon) {
    this.demService.formData = Object.assign({}, conge);
    this.per = Object.assign({}, conge);

    if (this.per.etatrh == 'موافق' && this.per.etatdir == "موافق") {
      this.val = "100%"
      this.test100 = true;
      this.test50 = false;
      this.test0 = false;

    } else if (this.per.etat == "موافق") {
      this.val = "100%"
      this.test100 = true;
      this.test50 = false;
      this.test0 = false;
    }
    else if (this.per.etatdir == 'في الانتظار' && this.per.etatrh == "في الانتظار" && this.per.etat =="في الانتظار") {
      this.val = "0%"
      this.test100 = false;
      this.test50 = false;
      this.test0 = true;
    }

    else if (this.per.etatdir == "موافق" && this.per.etatrh == "في الانتظار" && this.per.etat == "في الانتظار") {
      this.val = "50%"
      console.log("3" + this.val)
      this.test100 = false;
      this.test50 = true;
      this.test0 = false;
    }

  }
  p: Number = 1;
  count: Number = 5;

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  updateRecord(form: NgForm) {

    this.per.etat = this.etat;
    this.demService.PutObservableE(this.per).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.CongeList();
        form.resetForm();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      })

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demService.Delete(id)
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
