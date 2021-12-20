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


  plist: Pointage = new Pointage();
  fulldate = new Date().toLocaleDateString();
  btnshow: boolean = true;
  tableshow: boolean = false;
  pointer: boolean = false;
  getPointage() {
    this.PointageService.GetByDate(this.UserIdConnected).subscribe(res => {
      this.plist = res
      if (this.plist == null) {
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
      console.log(this.UserIdConnected)
      this.PointageService.GetByDate(this.UserIdConnected).subscribe(res => {
        this.point1 = res
        if (this.point1 == null) {
          this.tableshow = false;
          this.pointer = true;
          this.btnshow = true;
        } else {
          this.tableshow = true;
          this.btnshow = false;

        }
      })
    })

  }

  getData() {

    this.PointageService.GetByDate(this.UserIdConnected).subscribe(res => {
      this.point1 = res

    })
  }

  point1: Pointage = new Pointage();
  point: Pointage = new Pointage();
  onSubmit(form: NgForm) {


    if (this.codesaisie == this.code) {

      //this.point.code = this.codesaisie.toString();
      this.point.userNameCreator = this.UserNameConnected;
      this.point.idUserCreator = this.UserIdConnected;
      this.point.attribut6 = this.dirId
      this.PointageService.Add(this.point).subscribe(res => {
        this.getData();
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
