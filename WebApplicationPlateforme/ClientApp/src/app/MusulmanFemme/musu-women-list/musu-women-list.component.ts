import { Component, OnInit } from '@angular/core';
import { MusulmanService } from '../../shared/Services/NvMusulman/musulman.service';
import { ToastrService } from 'ngx-toastr';
import { Musulman } from '../../shared/Models/NvMusulman/musulman.model';
import { MusuWomenService } from '../../shared/Services/NewServicesForDawa/musu-women.service';

@Component({
  selector: 'app-musu-women-list',
  templateUrl: './musu-women-list.component.html',
  styleUrls: ['./musu-women-list.component.css']
})
export class MusuWomenListComponent implements OnInit {


  constructor(private musService: MusuWomenService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getList()
  }
  c: Number = 1;

  count: Number = 5;
  /* Create Musulman */

  mus: Musulman[] = []
  getList() {
    this.musService.List().subscribe(res => {
      this.mus = res
    });


  }

  /** Delete **/
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.musService.Delete(Id)
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
