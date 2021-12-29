import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DecisionTwoService } from '../../../../shared/Services/ServiceRh/decision-two.service';
import { DecisionTwo } from '../../../../shared/Models/ServiceRh/decision-two.model';
import { NgForm } from '@angular/forms';
import { AdministrationService } from '../../../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../../../shared/Services/Etablissement/etablissement.service';
import { Administration } from '../../../../shared/Models/Administration/administration.model';
import { UserDetail } from '../../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-enregistrer-decision',
  templateUrl: './enregistrer-decision.component.html',
  styleUrls: ['./enregistrer-decision.component.css']
})
export class EnregistrerDecisionComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private trinService: DecisionTwoService,
    private adminService: AdministrationService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getUsersList();
    this.getAdminList();
  }

  decision: string = "داخلي";
  interne: boolean = false;
  test(event) {
    this.decision = event.target.value
    if (this.decision == "داخلي") {
      this.interne = true;
    } else {
      this.interne = false;
    }
  }
  tous: boolean = false;
  one: boolean = false;
  tousOrOne(event) {
    if (event.target.value == 'الكل') {
      this.tous = true;
      this.tous = false;
      this.de.alladmin = "1";
    } else {
      this.tous = false
      this.one = true;
    }
  }
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.de.idUserCreator = res.id;
      this.de.userNameCreator = res.fullName;

    })

  }
  emp: boolean = false;
  admin: boolean = false;
  EmployeeAdmin(event) {
    if (event.target.value == "موظف") {
      this.emp = true;
      this.admin = false;
    } else {
      this.emp = false;
      this.admin = true;
    }
  }
  AdministrationList: Administration[] = [];
  getAdminList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.AdministrationList = res;
    })
  }

  getAdminName(event) {
    this.adminService.GetById(+event.target.value).subscribe(res => {
      this.de.adminnom = res.nom;
    })
  }

  getEmployeeName(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.de.employeenom = res.fullName;
    })
  }

  UserList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList = res;
    })
  }

  de: DecisionTwo = new DecisionTwo();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.de.dateenreg = this.date;
      this.de.decision = this.decision

      this.trinService.Add(this.de).subscribe(res => {
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
