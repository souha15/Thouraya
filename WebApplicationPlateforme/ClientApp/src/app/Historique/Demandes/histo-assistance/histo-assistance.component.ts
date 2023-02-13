import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../shared/Services/ServiceRh/assistance.service';
import { Assistance } from '../../../shared/Models/ServiceRh/assistance.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-assistance',
  templateUrl: './histo-assistance.component.html',
  styleUrls: ['./histo-assistance.component.css']
})
export class HistoAssistanceComponent implements OnInit {

  constructor(private assistanceService: AssistanceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAsList();
  }
  assistanceList: Assistance[] = [];

  p: Number = 1;
  count: Number = 5;
  getAsList() {
    this.assistanceService.Get().subscribe(res => {
      this.assistanceList = res
    })
  }
  assis: Assistance = new Assistance();
  populateForm(assistance: Assistance) {
    this.assis = Object.assign({}, assistance);
  }

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  date = new Date().toLocaleDateString();
  accept() {
    this.assis.etat = "موافقة"

    this.assis.datedir = this.date

    this.assistanceService.PutObservableE(this.assis).subscribe(res => {
      this.getAsList();
      this.toastr.success("تم  موافقة الطلب بنجاح", "نجاح");
      this.msg = "تم  قبول الطلب بنجاح"
      this.succ = true;
      this.failed = false;
    },
      err => {
        this.toastr.warning('لم  موافقة الطلب ', ' فشل');
        this.failed = true;
        this.succ = false;
        this.msg = "لم يتم  قبول الطلب"
      })
  }


  refuse() {
    this.assis.etat = "رفض"

    this.assis.datedir = this.date;
    this.assistanceService.PutObservableE(this.assis).subscribe(res => {
      this.getAsList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
      this.succ = true;
      this.failed = false;
      this.msg = "تم  رفض الطلب بنجاح"
    },
      err => {
        this.toastr.warning('لم  ترفض الطلب ', ' فشل');
        this.msg = "لم يتم رفض الطلب "
        this.failed = true;
        this.succ = false;
      })
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.assistanceService.Delete(id)
        .subscribe(res => {
          this.getAsList();
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
