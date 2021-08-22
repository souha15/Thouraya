import { Component, OnInit } from '@angular/core';
import { Orphelin } from '../../../shared/Models/Orphelin/orphelin.model';
import { OrphelinService } from '../../../shared/Services/Orphelin/orphelin.service';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orphelin-list',
  templateUrl: './orphelin-list.component.html',
  styleUrls: ['./orphelin-list.component.css']
})
export class OrphelinListComponent implements OnInit {

  constructor(private OrphService: OrphelinService,
  private toastr:ToastrService) { }

  ngOnInit(): void {
    this.ShowListTaches();
  }

  c: Number = 1;
  count: Number = 5;
  allTa
  //Orph list
  orph: Orphelin[] = [];

  ShowListTaches() {

    this.OrphService.Get().subscribe(res => {
      this.orph =res
    })
  }



  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.OrphService.Delete(Id)
        .subscribe(res => {
          this.ShowListTaches();
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
