import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { ResidenceService } from '../../shared/Services/User Services/residence.service';
import { Residence } from '../../shared/Models/User Services/residence.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-residence-add',
  templateUrl: './residence-add.component.html',
  styleUrls: ['./residence-add.component.css']
})
export class ResidenceAddComponent implements OnInit {

  constructor(private residenceService: ResidenceService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService,
 ) { }

  ngOnInit(): void {
    this.getUserConnected();

  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  bureau: string;
  frontiere: string
  datefin: string;
  rs: Residence = new Residence();
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.bureau = res.mention;
      this.frontiere = res.paysetude;
      this.datefin = res.unite;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب تجديد إقامة من الموظف  " + res.fullName
      this.notif.serviceName = "طلب تجديد إقامة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 6;

      this.UserService.GetRhDepartement().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })

    })

  }

  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {

      this.isValidFormSubmitted = true
   
    this.rs.datenereg = this.date;
    this.rs.numBureau = this.bureau;
    this.rs.idUserCreator = this.UserIdConnected;
    this.rs.creatorName = this.UserNameConnected;
    this.rs.numfrontiere = this.frontiere;
    this.rs.datefin = this.datefin
    this.rs.etat ="في الانتظار"
    this.rs.etatdir ="في الانتظار"
    this.rs.etatrh = "في الانتظار"
    this.residenceService.Add(this.rs).subscribe(
      res => {
        this.notifService.Add(this.notif).subscribe(res => {

          form.resetForm();
          this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
        })
      },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }
    )
    }
  }
}
