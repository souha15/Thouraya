import { Component, OnInit } from '@angular/core';
import { CommunsService } from '../../../shared/Services/Decisions/communs.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Commun } from '../../../shared/Models/Decisions/commun.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-attetion-lis',
  templateUrl: './attetion-lis.component.html',
  styleUrls: ['./attetion-lis.component.css']
})
export class AttetionLisComponent implements OnInit {


  constructor(private decService: CommunsService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getList();
  }

  c: Number = 1;
  count: Number = 5;
  DecList: Commun[] = []
  DecList1: Commun[] = []
  getList() {
    this.decService.List().subscribe(res => {
      this.DecList1 = res
      this.DecList = this.DecList1.filter(item => item.typeDecint == 2)
    })
  }


  /** Delete **/
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.decService.Delete(Id)
        .subscribe(res => {
          this.getList();
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
