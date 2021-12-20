import { Component, OnInit } from '@angular/core';
import { ActiviteeService } from '../../../shared/Services/NewServicesForDawa/activitee.service';
import { FilesActiviteeService } from '../../../shared/Services/NewServicesForDawa/files-activitee.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Activite } from '../../../shared/Models/NewModelsForDawaa/activite.model';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activite-compagne-list',
  templateUrl: './activite-compagne-list.component.html',
  styleUrls: ['./activite-compagne-list.component.css']
})
export class ActiviteCompagneListComponent implements OnInit {

  constructor(private activiteService: ActiviteeService,
    private typeService: FilesActiviteeService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getTypeActiviteList();
    this.getActiviteList();

  }
  p: Number = 1;
  count: Number = 5;

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  UserEtabId: number;
  UserAsminId: number
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserEtabId = res.idDepartement;

    })

  }

  //Get Activité List

  list: Activite[] = [];
  list2: Activite[] = [];
  getActiviteList() {
    this.activiteService.ListC().subscribe(res => {
      this.list = res;
    })
  }

  //Populate Form
  populateForm(conge: Activite) {
    this.activiteService.formData = Object.assign({}, conge)
    this.ac = Object.assign({}, conge);
  }

  //Get Type Activite List

  typeList: TbListening[] = [];
  getTypeActiviteList() {
    this.typeService.GetC().subscribe(res => {
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
      this.ac.userNameCreator = this.UserNameConnected;
      this.ac.idUserCreator = this.UserIdConnected;
      this.ac.dateEnreg = this.date;
      this.activiteService.PutObservableEC(this.ac).subscribe(
        res => {
          this.getActiviteList();
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          form.resetForm();
        },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }
      )
    }
  }


  //Delete

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {

      this.activiteService.DeleteC(Id)
        .subscribe(res => {
          this.getActiviteList()
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

}
