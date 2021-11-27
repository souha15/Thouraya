import { Component, OnInit, Injectable, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import {
  NgbDateStruct, NgbCalendar, NgbCalendarIslamicUmalqura, NgbDatepickerI18n, NgbDate
} from '@ng-bootstrap/ng-bootstrap';

import { Commun } from '../../../shared/Models/Decisions/commun.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommunsService } from '../../../shared/Services/Decisions/communs.service';
import { TranslationWidth } from '@angular/common';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


const WEEKDAYS = ['ن', 'ث', 'ر', 'خ', 'ج', 'س', 'ح'];
const MONTHS = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال',
  'ذو القعدة', 'ذو الحجة'];

@Injectable()
export class IslamicI18n extends NgbDatepickerI18n {

  getWeekdayShortName(weekday: number): string {
    return WEEKDAYS[weekday - 1];
  }
  getMonthShortName(month: number) {
    return MONTHS[month - 1];
  }

  getMonthFullName(month: number) {
    return MONTHS[month - 1];
  }

  getWeekdayLabel(weekday: number, width?: TranslationWidth) {
    return WEEKDAYS[weekday - 1];
  }

  getDayAriaLabel(date: NgbDateStruct): string {
    return `${date.day}-${date.month}-${date.year}`;
  }
}
@Component({
  selector: 'app-decision-demission-add',
  templateUrl: './decision-demission-add.component.html',
  styleUrls: ['./decision-demission-add.component.css'],
  providers: [
    { provide: NgbCalendar, useClass: NgbCalendarIslamicUmalqura },
    { provide: NgbDatepickerI18n, useClass: IslamicI18n }
  ]
})
export class DecisionDemissionAddComponent implements OnInit {
  model: NgbDateStruct;
  private routeSub: Subscription;
  constructor(private decService: CommunsService,
    private calendar: NgbCalendar,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.UserList(); 
  }

  Id: number =0 ;
  edit: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
      if (this.Id != 0) {
        this.decService.GetById(this.Id).subscribe(res => {
          this.dem = res;
          this.edit = true
           this.num = this.dem.num;
           this.emploi = this.dem.emploi;
           this.etab = this.dem.etabName;
           this.admin = this.dem.adminName;
           this.daterec = this.dem.dateTravail;
          if (this.dem.dateFinContratMil == '1') {
            this.hij = true;
          } else {
            this.hij = false;
          }

          if (this.dem.dateFinContratMil == '2') {
            this.mil = true;
          } else {
            this.mil = false;
          }

          if (this.dem.raison == "1") {
            this.autre = true;
          } else {
            this.autre = false;
          }
        })
      } else {
        this.edit = false;
      }
    })
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

  onDateSelect(date: NgbDate) {

    var day: string = date.day.toString()
    var month: string = date.month.toString()
    var year: string = date.year.toString()
    this.dem.dateFinContratHij = year + "-" + month + "-" + day;

  }
  autre: boolean = false;
  getRaison(event) {
    if (event.target.value == 1) {
      this.autre = true;
    } else {
      this.autre = false;
    }
  }

  //Get Users List
  userList: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.userList = res;
    })
  }

  //get Remplaçant Name
  num: string;
  emploi: string;
  admin: string;
  etab: string;
  daterec: string;
  getDataUser(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.user = res
      this.num = res.num;
      this.emploi = res.emploi;
      this.etab = res.nomDepartement;
      this.admin = res.nomAdministration
      this.dem.userName = res.fullName
      this.daterec = res.daterectrutement;

    })
  }
  dem: Commun = new Commun();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  add(form: NgForm) {

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.dem.typeDecint = 4;
      this.dem.typeDecstr = "قرار انهاء عقد عمل "
      this.dem.num = this.user.num;
      this.dem.emploi = this.user.emploi;
      if (this.user.idDepartement != null) {
        this.dem.etabId = this.user.idDepartement;
        this.dem.etabName = this.user.nomDepartement;
      }

      if (this.user.idAdministration != null) {
        this.dem.adminId = this.user.idAdministration;
        this.dem.adminName = this.user.nomAdministration;
      }

      this.dem.dateTravail = this.user.daterectrutement;
      this.dem.idUserCreator = this.UserIdConnected;
      this.dem.userNameCreator = this.UserNameConnected;

      this.decService.Create(this.dem).subscribe(res => {
        this.toastr.success("  تمت إضافة القرار  بنجاح", "نجاح");
        form.resetForm();
        this.num = "";
        this.emploi = "";
        this.admin = "";
        this.etab = "";
        this.daterec = "";
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
      this.dem.typeDecint = 4;
      this.dem.typeDecstr = "قرار انهاء عقد عمل "
      this.dem.num = this.user.num;
      this.dem.emploi = this.user.emploi;
      if (this.user.idDepartement != null) {
        this.dem.etabId = this.user.idDepartement;
        this.dem.etabName = this.user.nomDepartement;
      }

      if (this.user.idAdministration != null) {
        this.dem.adminId = this.user.idAdministration;
        this.dem.adminName = this.user.nomAdministration;
      }

      this.dem.dateTravail = this.user.daterectrutement;
      this.dem.idUserCreator = this.UserIdConnected;
      this.dem.userNameCreator = this.UserNameConnected;

      this.decService.PutObservableE(this.dem).subscribe(res => {
        this.toastr.success("  تم تحديث القرار  بنجاح", "نجاح");
        form.resetForm();
        this.num = "";
        this.emploi = "";
        this.admin = "";
        this.etab = "";
        this.daterec = "";
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
}
