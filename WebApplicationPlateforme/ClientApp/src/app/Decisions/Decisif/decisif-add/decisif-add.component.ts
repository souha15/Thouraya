import { Component, OnInit, Injectable, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { TranslationWidth } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { Decisif } from '../../../shared/Models/Decisions/decisif.model';
import { DecisifsService } from '../../../shared/Services/Decisions/decisifs.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-decisif-add',
  templateUrl: './decisif-add.component.html',
  styleUrls: ['./decisif-add.component.css']

})
export class DecisifAddComponent implements OnInit {

  private routeSub: Subscription;
  constructor(
    private toastr: ToastrService,
    private decService: DecisifsService,
    private route: ActivatedRoute,
  private UserService:UserServiceService) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.UserList(); 
  }

  UserIdConnected: string;
  UserNameConnected: string;
  user: UserDetail = new UserDetail();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id
      this.UserNameConnected = res.fullName;
    })
  }

  Id: number = 0;
  edit: boolean = false;
  dem: Decisif = new Decisif();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
      if (this.Id != 0) {
        this.decService.GetById(this.Id).subscribe(res => {
          this.dem = res;
          this.edit = true
          if (this.dem.datehijmil == '1') {
            this.hij = true;
          } else {
            this.hij = false;
          }

          if (this.dem.datehijmil == '2') {
            this.mil = true;
          } else {
            this.mil = false;
          }

        })
      } else {
        this.edit = false;
      }
    })
  }

  //get Remplaçant Name

  getDataUser(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.user = res
      this.dem.userName = res.fullName


    })
  }

  hij: boolean = false;
  mil: boolean = false;
  getDateType(event) {
    if (event.target.value == 1) {
      this.hij = true;
    } else {
      this.hij = false;
    }

    if (event.target.value == 2) {
      this.mil = true;
    } else {
      this.mil = false;
    }
  }


  //Get Users List
  userList: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.userList = res;
    })
  }

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  add(form: NgForm) {

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.dem.idUserCreator = this.UserIdConnected;
      this.dem.userNameCreator = this.UserNameConnected;

      this.decService.Create(this.dem).subscribe(res => {
        this.toastr.success("  تمت إضافة القرار  بنجاح", "نجاح");
        form.resetForm();

      },
        err => {
          this.toastr.error("لم تتم إضافة القرار الطلب", "فشل ")

        })
    }
  }

  update(form: NgForm) {

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.dem.idUserCreator = this.UserIdConnected;
      this.dem.userNameCreator = this.UserNameConnected;

      this.decService.PutObservableE(this.dem).subscribe(res => {
        this.toastr.success("  تم تحديث القرار  بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم تتم التحديث القرار الطلب", "فشل ")

        })
    }
  }
  onSubmit(form: NgForm) {
    if (this.edit == true) {
      this.update(form)

    }
    else {
      this.add(form)
    }
  }
}
