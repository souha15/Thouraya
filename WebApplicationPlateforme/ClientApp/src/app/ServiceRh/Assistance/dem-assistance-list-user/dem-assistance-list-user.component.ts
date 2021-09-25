import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../shared/Services/ServiceRh/assistance.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Assistance } from '../../../shared/Models/ServiceRh/assistance.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dem-assistance-list-user',
  templateUrl: './dem-assistance-list-user.component.html',
  styleUrls: ['./dem-assistance-list-user.component.css']
})
export class DemAssistanceListUserComponent implements OnInit {

  constructor(private assistanceService: AssistanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getAsList();
  }


  // Get User Connected

  UserIdConnected: string;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;

   
    })


  }

  assistanceList: Assistance[] = [];
  assistanceList1: Assistance[] = [];
  getAsList() {
    this.assistanceService.Get().subscribe(res => {
      this.assistanceList1 = res
      this.assistanceList = this.assistanceList1.filter(item => item.idUserCreator == this.UserIdConnected)
    })
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.assistanceService.Delete(Id)
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
