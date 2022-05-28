import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../shared/Services/User Services/demission.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Demissioon } from '../../shared/Models/User Services/demissioon.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-demission-add',
  templateUrl: './demission-add.component.html',
  styleUrls: ['./demission-add.component.css']
})
export class DemissionAddComponent implements OnInit {

  constructor(private demService: DemissionService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService,
    private adminService: AdministrationService,) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dirID: string;
  adminId: number = 28;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب إستقالة  من الموظف  " + res.fullName
      this.notif.serviceName = "طلب إستقالة "
      this.notif.readUnread = "0";
      this.notif.serviceId = 1;
      this.notif.userReceiverId = "32618446-df21-4ca1-b366-f639f41a7a7c";
      this.notif.userReceiverName = "د. محمد بن إبراهيم عوض الصواط ";
    })

  }

  dem: Demissioon = new Demissioon();
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.dem.idUserCreator = this.UserIdConnected;
    this.dem.creatorName = this.UserNameConnected;
    this.dem.datenereg = this.date;
    this.dem.etat = "في الانتظار";
    this.dem.etatdir = "في الانتظار";
    this.dem.etatrh = "في الانتظار";
    this.dem.attribut3 = "في الانتظار";
    this.demService.Add(this.dem).subscribe(
      res => {

        this.notifService.Add(this.notif).subscribe(res => {

          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        })
      },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }
        )
  }
}
