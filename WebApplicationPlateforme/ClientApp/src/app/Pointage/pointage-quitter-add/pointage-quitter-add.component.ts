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
    
        this.PointageService.GetByDate(this.UserIdConnected).subscribe(res => {
          this.point = res
          if (this.point == null) {
            this.tableshow = false;
            //this.pointer = true;
            this.btnshow = false;
          } else {
            this.tableshow = true;
            this.btnshow = true;

          }
       
    })
    })

  }
  getData() {

    this.PointageService.GetByDate(this.UserIdConnected).subscribe(res => {
      this.point = res

    })
  }
  point: Pointage = new Pointage();
  point1: Pointage = new Pointage();
  btnshow: boolean = true;
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  onSubmit(form: NgForm) {
    if (this.codesaisie == this.code) {

      //this.point.code = this.codesaisie.toString();   
      this.point.userNameCreator = this.UserNameConnected;
      this.point.idUserCreator = this.UserIdConnected;
      this.PointageService.PutObservableE(this.point).subscribe(res => {
        this.toastr.success(" ???? ?????????? ???????????????? ?????????? ")
        this.msg = " ???? ?????????? ???????????????? ??????????";
        this.succ = true;
        this.failed = false;
        this.getData()
      },
        err => {
          this.toastr.error("?????? ???? ?????????? ????????????????")
          console.log(err);

          this.failed = true;
          this.succ = false;
          this.msg ="?????? ???? ?????????? ????????????????"
        })
    } else {
      this.toastr.error("???????? ???? ??????????")
      this.code = Math.floor(Math.random() * (this.max - this.min)) + this.min;

      this.failed = true;
      this.succ = false;
      this.msg ="???????? ???? ??????????"
    }
  }
}
