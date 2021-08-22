import { Component, OnInit } from '@angular/core';
import { Tache } from '../../../shared/Models/Taches/tache.model';
import { Observable } from 'rxjs';
import { TacheService } from '../../../shared/Services/Taches/tache.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-task-list-admin',
  templateUrl: './task-list-admin.component.html',
  styleUrls: ['./task-list-admin.component.css']
})
export class TaskListAdminComponent implements OnInit {


  constructor(private TacheService: TacheService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.filtredDataTache();
  }

  p: Number = 1;
  count: Number = 5;

  

  tacheliste: Tache[] = [];
  filtredtachelist: Tache[] = [];
  nbclose: number = 0;
  nbnew: number = 0;
  nbcurrent: number = 0;
  nbretard: number = 0;
  filtredDataTache() {
    this.TacheService.ListTache().subscribe(res => {
      this.filtredtachelist = res

      console.log(this.filtredtachelist.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
      return this.filtredtachelist.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    });


  }

  //sorting
  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  //delete
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.TacheService.DeleteTache(Id)
        .subscribe(res => {
          this.filtredDataTache();
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
