import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { ToastrService } from 'ngx-toastr';
import { ReceptionEquipementService } from '../../../shared/Services/ServiceRh/reception-equipement.service';
import { ReceptionEquipement } from '../../../shared/Models/ServiceRh/reception-equipement.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';


@Component({
  selector: 'app-reception-equipement-add',
  templateUrl: './reception-equipement-add.component.html',
  styleUrls: ['./reception-equipement-add.component.css']
})
export class ReceptionEquipementAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService,
    private trinService: ReceptionEquipementService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getUsersList();
  }

  iduser: string;
  admin: string;
  getUserNom(event) {
    this.iduser = event.target.value;
    this.UserService.GetUserById(this.iduser).subscribe(res => {
      this.re.username = res.fullName;
      this.re.admin = res.nomAdministration;
      this.admin = res.nomAdministration;

    })
  }

  UserList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UserList = res
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.re.idUserCreator = res.id;
      this.re.userNameCreator = res.fullName;

    })

  }

  re: ReceptionEquipement = new ReceptionEquipement();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.re.dateenreg = this.date;
      this.re.attribut2 = '1';

      this.trinService.Add(this.re).subscribe(res => {
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
