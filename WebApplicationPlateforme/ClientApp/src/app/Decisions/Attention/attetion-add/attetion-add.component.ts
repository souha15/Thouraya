import { Component, OnInit } from '@angular/core';
import { Commun } from '../../../shared/Models/Decisions/commun.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CommunsService } from '../../../shared/Services/Decisions/communs.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-attetion-add',
  templateUrl: './attetion-add.component.html',
  styleUrls: ['./attetion-add.component.css']
})
export class AttetionAddComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private decService: CommunsService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private route: ActivatedRoute,) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.UserList();
  }

  Id: number = 0;
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
      this.dem.typeDecint = 2;
      this.dem.typeDecstr = "قرار لفت نظر "
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
        this.succ = true;
        this.failed = false;


        this.msg = "  تمت الإضافة بنجاح"
      },
        err => {
          this.toastr.error("لم تتم إضافة القرار الطلب", "فشل ")

          this.failed = true;
          this.succ = false;

          this.msg = " فشل عند الإضافة"
        })
    }
  }
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  update(form: NgForm) {

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.dem.typeDecint = 2;
      this.dem.typeDecstr = "قرار لفت نظر "
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
        this.toastr.success("  تمت إضافة القرار  بنجاح", "نجاح");
        form.resetForm();
        this.num = "";
        this.emploi = "";
        this.admin = "";
        this.etab = "";
        this.daterec = "";
        this.msg = "  تم التحديث بنجاح"

        this.succ = true;
        this.failed = false;
      },
        err => {
          this.toastr.error("لم تتم إضافة القرار الطلب", "فشل ")
          this.msg = "  فشل عند التحديث"

          this.failed = true;
          this.succ = false;
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
