import { Component, OnInit } from '@angular/core';
import { ActiviteeService } from '../../shared/Services/NewServicesForDawa/activitee.service';
import { FilesActiviteeService } from '../../shared/Services/NewServicesForDawa/files-activitee.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { Activite } from '../../shared/Models/NewModelsForDawaa/activite.model';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-activite-for-womens',
  templateUrl: './activite-for-womens.component.html',
  styleUrls: ['./activite-for-womens.component.css']
})
export class ActiviteForWomensComponent implements OnInit {


  constructor(private activiteService: ActiviteeService,
    private typeService: FilesActiviteeService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getActiviteList();
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  UserEtabId: number;
  UserAdminId: number;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserEtabId = res.idDepartement
      this.UserAdminId = res.idAdministration
    })

  }

  //Get Type Activite List

  typeList: TbListening[] = [];
  getActiviteList() {
    this.typeService.Get().subscribe(res => {
      this.typeList = res;
    })
  }

  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  ac: Activite = new Activite();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {

      this.isValidFormSubmitted = true
      if (this.UserEtabId != null) {
        this.ac.attribut1 = this.UserEtabId.toString();
      }
      if (this.UserAdminId != null) {
        this.ac.attribut2 = this.UserAdminId.toString();
      }
      this.ac.userNameCreator = this.UserNameConnected;
      this.ac.idUserCreator = this.UserIdConnected;

      this.ac.dateEnreg = this.date;
      this.activiteService.CreateW(this.ac).subscribe(
        res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          form.resetForm();
        },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }
      )
    }
  }
}
