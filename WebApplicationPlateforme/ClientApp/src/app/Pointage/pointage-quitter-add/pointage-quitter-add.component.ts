import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PointageService } from '../../shared/Services/Pointage/pointage.service';
import { Pointage } from '../../shared/Models/Pointage/pointage.model';

@Component({
  selector: 'app-pointage-quitter-add',
  templateUrl: './pointage-quitter-add.component.html',
  styleUrls: ['./pointage-quitter-add.component.css']
})
export class PointageQuitterAddComponent implements OnInit {


  constructor(
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private PointageService: PointageService) { }

  code: number;
  min = 10935;
  max = 99999;
  ngOnInit(): void {
    this.getUserConnected();
    this.getTodayPoint();
    this.code = Math.floor(Math.random() * (this.max - this.min)) + this.min;
  }

  //get Pointage for today
  pList: Pointage[] = [];
  p2List: Pointage[] = [];
  tableshow: boolean = false;
  getTodayPoint() {
    this.PointageService.Get().subscribe(res => {
      this.p2List = res
      this.pList = this.p2List.filter(item => item.idUserCreator == this.UserIdConnected && item.datePresence == this.fulldate);
      if (this.pList.length == 1) {
        this.tableshow = true;
        this.point = this.pList[0]
      } else {
        this.tableshow = false;
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
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  date = new Date();
  fulldate = new Date().toLocaleDateString();
  timeHour: number;
  timeMinute: number;
  month: number;
  day: number;
  year: number;
  point: Pointage = new Pointage();
  btnshow: boolean = true;

  onSubmit(form: NgForm) {
    if (this.codesaisie == this.code && this.tableshow) {
      this.timeHour = this.date.getHours();
      this.timeMinute = this.date.getMinutes();
      this.month = this.date.getMonth() + 1;
      this.day = this.date.getDay();
      this.year = this.date.getFullYear();
      this.point.dateQuitter = this.fulldate;
      this.point.timeQuitter = this.timeHour + ":" + this.timeMinute;
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
      this.PointageService.PutObservableE(this.point).subscribe(res => {
        this.btnshow = false;
        this.toastr.success(" تم تسجيل الإنصراف بنجاح ")
      },
        err => {
          this.toastr.error("فشل في تسجيل الإنصراف")
        })
    } else {
      this.toastr.error("تثبت من الرمز")
      this.code = Math.floor(Math.random() * (this.max - this.min)) + this.min;
    }
  }
}
