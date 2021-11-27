import { Component, OnInit } from '@angular/core';
import { CommunsService } from '../../../shared/Services/Decisions/communs.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Commun } from '../../../shared/Models/Decisions/commun.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rabattre-add',
  templateUrl: './rabattre-add.component.html',
  styleUrls: ['./rabattre-add.component.css']
})
export class RabattreAddComponent implements OnInit {
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
      this.user= res
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
      this.dem.typeDecint = 1;
      this.dem.typeDecstr = "قرار طي قيد "
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
      this.dem.typeDecint = 1;
      this.dem.typeDecstr = "قرار طي قيد "
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
      },
        err => {
          this.toastr.error("لم تتم إضافة القرار الطلب", "فشل ")

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
