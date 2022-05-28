import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Permission } from '../../../shared/Models/RH/permission.model';
import { NgForm } from '@angular/forms';
import { PermissionService } from '../../../shared/Services/Rh/permission.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.css']
})
export class PermissionAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private permissionService: PermissionUService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
    const datePipe = new DatePipe('en-Us');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');
  }
  today;

  notif: Notif = new Notif();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.per.creatorName = res.fullName;
      this.per.idUserCreator = res.id;
      if (res.attribut1 != null) {
        this.per.iddir = res.attribut1;
        this.per.nomdir = res.directeur
        this.notif.userReceiverId = res.attribut1;
        this.notif.userReceiverName = res.directeur;
      }
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب إذن من الموظف  " + res.fullName
      this.notif.readUnread = "0";


    })

  }

  // Test two Times

  start;
  startTime(event) {
    this.start = event.target.value;
    if (this.end != null) {
      if (this.start > this.end) {
        this.toastr.error("يجب أن يكون وقت البدء أقل من وقت الانتهاء")
      }
    } else {
      this.toastr.error("يجب عليك ملئ وقت الانتهاء")
    }
  }

  end;
  endTime(event) {
    this.end = event.target.value;
    if (this.start != null) {
      if (this.start > this.end) {
        this.toastr.error("يجب أن يكون وقت البدء أقل من وقت الانتهاء")
      }
    } else {
      this.toastr.error("يجب عليك ملئ وقت البداية")
    }
  }


  autre: boolean = false;
  testAutre(event) {
    if (event.target.value =="أخرى") {
      this.autre = true;
    } else {
      this.autre = false; 
    }
  }
  per: PermissionU = new PermissionU();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.per.datenereg = this.date;
    this.per.etatdir = "في الانتظار";
    this.per.etat = "في الانتظار";
    this.per.etatrh = "في الانتظار";
    console.log(form.invalid)
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true
      this.permissionService.Add(this.per).subscribe(
        res => {
          this.notif.serviceId = res.id;
          this.notif.serviceName = "طلب 10-1-2022"
          this.notifService.Add(this.notif).subscribe(res => {

          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            form.resetForm();
          })
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        },
      )

    }
  }
}
