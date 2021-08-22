import { Component, OnInit } from '@angular/core';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { TransfertInterne } from '../../shared/Models/ServiceRh/transfert-interne.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TransfertInterneService } from '../../shared/Services/ServiceRh/transfert-interne.service';

@Component({
  selector: 'app-transfert-interne-add',
  templateUrl: './transfert-interne-add.component.html',
  styleUrls: ['./transfert-interne-add.component.css']
})
export class TransfertInterneAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService,
    private trinService: TransfertInterneService) { }

  ngOnInit(): void {
    this.getUserConnected();
   this.getUsersList();
    this.getAdministrationList();
  }

  iduser: string;
  
  getUserNom(event) {
    this.iduser = event.target.value;
    this.UserService.GetUserById(this.iduser).subscribe(res => {
      this.ti.employe = res.fullName
    })
  }

  adminid: number;
  getAdminNom(event) {
    this.adminid = +event.target.value;
    this.adminService.GetById(+this.adminid).subscribe(res => {
      this.ti.administration = res.nom
      this.UserService.GetUsersList().subscribe(res => {
        this.FUserList = res
        this.UserList = this.FUserList.filter(item => item.idAdministration == this.adminid)
      })
    })
  }

  FUserList: UserDetail[] = [];
  UserList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList =res
    })
  }

  adminList: Administration[] = [];
  getAdministrationList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res;
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.ti.idUserCreator = res.id;
      this.ti.userNameCreator = res.fullName;

    })

  }

  ti: TransfertInterne = new TransfertInterne();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.ti.dateenreg = this.date;

      this.trinService.Add(this.ti).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }
}
