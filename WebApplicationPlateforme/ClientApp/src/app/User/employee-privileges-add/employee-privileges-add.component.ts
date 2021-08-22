import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { PrivilegesService } from '../../shared/Services/User/privileges.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { PrivilegesDetail } from '../../shared/Models/User/privileges-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee-privileges-add',
  templateUrl: './employee-privileges-add.component.html',
  styleUrls: ['./employee-privileges-add.component.css']
})
export class EmployeePrivilegesAddComponent implements OnInit {


  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private toastr: ToastrService,
 ) { }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUsersDetails();
  }


  //get id in URl
  UserId: string;
  roleslist: any=[];

  rolelist = ["EMPLOYEE", "DIRECTORGENERAL",
    "ADMINISTRATEUR", "DIRECTORETAB",
    "RESSOURCEHUMAINE", "RESPFINANCE",
    "DIRECTORADMN"]
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.UserId = params['id']
      this.UserService.getUserRoles(this.UserId).subscribe(res => {
        this.roleslist = res;
       /* for (let i = 0; i < this.roleslist.length; i++) {
          if (this.roleslist[i] == "EMPLOYEE") {
            this.roleslist[i] = "موظف"
          }
          else if (this.roleslist[i] == "DIRECTORG") {
            this.roleslist[i] = "المدير التنفيذي"
          }
          else if (this.roleslist[i] == "ADMINISTRATEUR") {
            this.roleslist[i] = "مسؤول النظام"
          }
          else if (this.roleslist[i] == "STAGIAIRE") {
            this.roleslist[i] = "متعاون"
          }

          else if (this.roleslist[i] == "CONSEILADMIN") {
            this.roleslist[i] = "رئيس مجلس الإدارة"

          }
          else if (this.roleslist[i] == "SUPCONSEILADMIN") {
            this.roleslist[i] = "نائب رئيس مجلس الإدارة"
          }
          else if (this.roleslist[i] == "DIRECTOR") {
            this.roleslist[i] = "مدير الجمعية"
          }
          else if (this.roleslist[i] == "PARTRESP") {
            this.roleslist[i] = "عضو مشرف"
          }
          else if (this.roleslist[i] == "PARTNORMAL") {
            this.roleslist[i] = "عضو عادي"
          }
          else if (this.roleslist[i] == "RESP") {
            this.roleslist[i] = "المسؤول"
          }
          else {
            this.roleslist[i] = "عضو مالي"
          }
        }*/
        console.log(this.roleslist)
        
      })
    });
  }
  delete(userId: string, role: string) {
    console.log(role)
    this.UserService.deluserfromrole(userId, role).subscribe(res => {
      console.log("delwithsucc")
      this.getIdUrl();
    })
  }

  //Get User Id
  user: UserDetail = new UserDetail();
  name: string;
  getUsersDetails() {
    this.UserService.GetUserById(this.UserId).subscribe(res => {
      this.user = res

      this.name = this.user.fullName;

    })
  }
  clicked = false;

  add1() {
    let userId = this.UserId;
    let role = "EMPLOYEE"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }


  add2() {
    let userId = this.UserId;
    let role = "DIRECTORGENERAL"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add3() {
    let userId = this.UserId;
    let role = "ADMINISTRATEUR"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add4() {
    let userId = this.UserId;
    let role = "DIRECTORETAB"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add5() {
    let userId = this.UserId;
    let role = "RESSOURCEHUMAINE"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add6() {
    let userId = this.UserId;
    let role = "RESPFINANCE"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  add7() {
    let userId = this.UserId;
    let role = "DIRECTORADMN"
    this.UserService.addroletoUser(userId, role).subscribe(res => {
      this.getIdUrl();

    })
  }

  enreg() {

    this.toastr.success('تم التحديث بنجاح', 'نجاح')
  }
}
