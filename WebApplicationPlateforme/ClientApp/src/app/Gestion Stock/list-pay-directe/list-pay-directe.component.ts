import { Component, OnInit } from '@angular/core';
import { PayDirecteService } from '../../shared/Services/Gsetion Stock/pay-directe.service';
import { ToastrService } from 'ngx-toastr';
import { PayDirecte } from '../../shared/Models/Gestion Stock/pay-directe.model';

@Component({
  selector: 'app-list-pay-directe',
  templateUrl: './list-pay-directe.component.html',
  styleUrls: ['./list-pay-directe.component.css']
})
export class ListPayDirecteComponent implements OnInit {

  constructor(private payDirecteService: PayDirecteService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getListPay();
  }

  p: Number = 1;
  count: Number = 5;
  ListPay: PayDirecte[] = [];
  getListPay() {
    this.payDirecteService.ListPayDirecte().subscribe(res => {
      this.ListPay = res
    })
  }

  //Delete
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.payDirecteService.DeletePayDirecte(Id)
        .subscribe(res => {
          this.getListPay();
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
