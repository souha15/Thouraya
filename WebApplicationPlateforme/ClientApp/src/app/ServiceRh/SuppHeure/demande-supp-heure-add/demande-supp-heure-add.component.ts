import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-demande-supp-heure-add',
  templateUrl: './demande-supp-heure-add.component.html',
  styleUrls: ['./demande-supp-heure-add.component.css']
})
export class DemandeSuppHeureAddComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  // Get User Connected


  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sup.idUserCreator = res.id;
      this.sup.userNameCreator = res.fullName;
      if (res.attribut1 != null) {
        this.sup.iddir = res.attribut1;
        this.sup.nomdir = res.directeur;
        this.notif.userReceiverId = res.attribut1;
        this.notif.userReceiverName = res.directeur;
      }
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب ساعات إضافية من الموظف  " + res.fullName
      this.notif.serviceName = "طلب ساعات إضافية"
      this.notif.readUnread = "0";


    })

  }

  sup: DemandeSuppHeure = new DemandeSuppHeure();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.sup.dateenreg = this.date;
      this.sup.etat = "في الإنتظار";
      this.sup.etatdir = "في الإنتظار";
      this.sup.attribut2 = "في الإنتظار";
      this.sup.attribut3 = "في الإنتظار";
      this.suppheureService.Add(this.sup).subscribe(res => {
        this.notif.serviceId = res.id;
        this.notifService.Add(this.notif).subscribe(res => {
        
        form.resetForm();
          this.toastr.success("تم تسجيل  الطلب بنجاح", " تسجيل ");
        })
      },
        err => {
          this.toastr.error("فشل تسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }
}
