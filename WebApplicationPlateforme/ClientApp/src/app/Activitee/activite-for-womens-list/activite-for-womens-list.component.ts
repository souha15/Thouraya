import { Component, OnInit } from '@angular/core';
import { ActiviteeService } from '../../shared/Services/NewServicesForDawa/activitee.service';
import { FilesActiviteeService } from '../../shared/Services/NewServicesForDawa/files-activitee.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { Activite } from '../../shared/Models/NewModelsForDawaa/activite.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-activite-for-womens-list',
  templateUrl: './activite-for-womens-list.component.html',
  styleUrls: ['./activite-for-womens-list.component.css']
})
export class ActiviteForWomensListComponent implements OnInit {

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
    this.activiteService.ListW().subscribe(res => {
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
      this.ac.userNameCreator = this.UserNameConnected;
      this.ac.idUserCreator = this.UserIdConnected;
      this.ac.dateEnreg = this.date;
      this.activiteService.PutObservableEW(this.ac).subscribe(
        res => {

          this.succ = true;
          this.failed = false;
          this.getActiviteList();
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          form.resetForm();
        },
        err => {
          this.failed = true;
          this.succ = false;
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }
      )
    }
  }

  succ: boolean = false;
  failed: boolean = false;
  //Delete

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {

      this.activiteService.DeleteW(Id)
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
