import { Component, OnInit } from '@angular/core';
import { EvenementService } from '../../shared/Services/Evenements/evenement.service';
import { Evenement } from '../../shared/Models/Evenements/evenement.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  constructor(private eventService: EvenementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getEventsList();
    this.getUserConnected();
  }

  p: Number = 1;
  count: Number = 5;
  EvList: Evenement[] = [];

  getEventsList() {
    this.eventService.List().subscribe(res => {
      this.EvList = res
      console.log(this.EvList.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime()));
      return this.EvList.sort((a, b) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    })

  }

  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR") {
            this.testrole = true;
          } else { this.testrole = false; }
        })
      })
    })

  }


  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.eventService.Delete(Id)
        .subscribe(res => {
          this.getEventsList();
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
