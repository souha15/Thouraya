import { Component, OnInit } from '@angular/core';
import { DecisifsService } from '../../../shared/Services/Decisions/decisifs.service';
import { ToastrService } from 'ngx-toastr';
import { Decisif } from '../../../shared/Models/Decisions/decisif.model';

@Component({
  selector: 'app-decisif-list-dir',
  templateUrl: './decisif-list-dir.component.html',
  styleUrls: ['./decisif-list-dir.component.css']
})
export class DecisifListDirComponent implements OnInit {

  constructor(private decService: DecisifsService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getList();
  }

  c: Number = 1;
  count: Number = 5;
  DecList: Decisif[] = []
  DecList1: Decisif[] = []
  getList() {
    this.decService.List().subscribe(res => { 
      this.DecList = res
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
