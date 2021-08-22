import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../shared/Services/User Services/demission.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Demissioon } from '../../shared/Models/User Services/demissioon.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demission-add',
  templateUrl: './demission-add.component.html',
  styleUrls: ['./demission-add.component.css']
})
export class DemissionAddComponent implements OnInit {

  constructor(private demService: DemissionService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  dem: Demissioon = new Demissioon();
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.dem.idUserCreator = this.UserIdConnected;
    this.dem.creatorName = this.UserNameConnected;
    this.dem.datenereg = this.date;
    this.dem.etat = "في الانتظار";
    this.dem.etatdir = "في الانتظار";
    this.dem.etatrh = "في الانتظار";
    this.demService.Add(this.dem).subscribe(
      res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
      },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }
        )
  }
}
