import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PointageService } from '../../shared/Services/Pointage/pointage.service';
import { Pointage } from '../../shared/Models/Pointage/pointage.model';

@Component({
  selector: 'app-pointage-presence-add',
  templateUrl: './pointage-presence-add.component.html',
  styleUrls: ['./pointage-presence-add.component.css']
})
export class PointagePresenceAddComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private PointageService: PointageService) { }

  code: number;
  min = 10935;
  max = 99999;
  ngOnInit(): void {
    this.getUserConnected();
    this.getPointage();
    this.code = Math.floor(Math.random() * (this.max - this.min)) + this.min;
  }


  plist: Pointage[] = [];
  plist2: Pointage[] = [];
  fulldate = new Date().toLocaleDateString();
  btnshow: boolean = true;
  tableshow: boolean = false;
  pointer: boolean = false;
  getPointage() {
    this.PointageService.Get().subscribe(res => {
      this.plist2 = res
      this.plist = this.plist2.filter(item => item.idUserCreator == this.UserIdConnected && item.datePresence == this.date)
      if (this.plist.length == 0) {
        this.tableshow = false;
        this.pointer = true;
        this.btnshow = true;
      } else {
        this.tableshow = true;
        this.btnshow = false;

      }
    })
  }
  codesaisie: number;
  captchacode(event) {
    this.codesaisie = +event.target.value;
  }
  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  dirId: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.dirId = res.attribut1;
    })

  }

 
 // date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', hour12: false, minute: '2-digit', second: '2-digit' })
  date = new Date().toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })
  timeHour: number;
  timeMinute: number;
  month: number;
  day: number;
  year: number;
  Time =new Date().toLocaleTimeString(undefined, { hour: '2-digit', hour12: false, minute: '2-digit' });
  point: Pointage = new Pointage();

  onSubmit(form: NgForm) {
    if (this.codesaisie == this.code) {
      //this.timeHour = this.date.getHours();
      //this.timeMinute = this.date.getMinutes();
      //this.month = this.date.getMonth() + 1;
      //this.day = this.date.getDay();
      //this.year = this.date.getFullYear();
     
      this.point.datePresence = this.date;
      this.point.timePresence = this.Time
      this.day = +this.date.substr(0, 2)
      this.month = +this.date.substr(3, 2)
      this.year = +this.date.substr(6, 4)

      this.point.code = this.codesaisie.toString();
      if (this.month == 1) {
        this.point.attribut2 = "يناير"
      } else if (this.month == 2) {
        this.point.attribut2 = "فبراير"
      } else if (this.month == 3) {
        this.point.attribut2 = "مارس"
      } else if (this.month == 4) {
        this.point.attribut2 = "إبريل"
      } else if (this.month == 5) {
        this.point.attribut2 = "مايو"
      } else if (this.month == 6) {
        this.point.attribut2 = "يونيو"
      } else if (this.month == 7) {
        this.point.attribut2 = "يوليو"
      } else if (this.month == 8) {
        this.point.attribut2 = "أغسطس"
      } else if (this.month == 9) {
        this.point.attribut2 = "سبتمبر"
      } else if (this.month == 10) {
        this.point.attribut2 = "أكتوبر"
      } else if (this.month == 11) {
        this.point.attribut2 = "نوفمبر"
      } else {
        this.point.attribut2 = "ديسمبر"
      }

      this.point.attribut3 = this.year.toString();
      this.point.mois = this.month.toString();
      this.point.userNameCreator = this.UserNameConnected;
      this.point.idUserCreator = this.UserIdConnected;
      this.point.attribut6 = this.dirId
 
      this.PointageService.Add(this.point).subscribe(res => {
        this.btnshow = false;
        this.toastr.success(" تم تسجيل الحضور بنجاح ")
        this.tableshow = true;
      },
        err => {
          this.toastr.error("فشل في تسجيل الحضور")
        })
    } else {
      this.tableshow = false;
      this.toastr.error("تثبت من الرمز")
      this.code = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    }
  }
}
