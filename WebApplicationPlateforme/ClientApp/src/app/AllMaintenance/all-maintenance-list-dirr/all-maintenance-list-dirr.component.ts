import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { AllMaintenanceService } from '../../shared/Services/AllMaintenance/all-maintenance.service';
import { AllTypeMaintenance } from '../../shared/Models/AllMaintenance/all-type-maintenance.model';
import { AllMaintenance } from '../../shared/Models/AllMaintenance/all-maintenance.model';
import { AllTypeMaintenanceService } from '../../shared/Services/AllMaintenance/all-type-maintenance.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-all-maintenance-list-dirr',
  templateUrl: './all-maintenance-list-dirr.component.html',
  styleUrls: ['./all-maintenance-list-dirr.component.css']
})
export class AllMaintenanceListDirrComponent implements OnInit {
  constructor(private demService: AllMaintenanceService,
    private typeService: AllTypeMaintenanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getTypeList();
    this.getUserList();
    this.getUserConnected();
    this.GetList();
  }

  UsersList1: UserDetail[] = []
  UsersList: UserDetail[] = []
  getUserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList1 = res
      this.UsersList = this.UsersList1.filter(item => item.idAdministration == 29);
    })
  }
  p: Number = 1;
  count: Number = 5;
  // Get Type Maintenance

  ListType: TbListening[] = [];
  getTypeList() {
    this.typeService.Get().subscribe(res => {
      this.ListType = res
    })
  }
  //Get Dem List 
  GetList() {
    this.demService.Get().subscribe(res => {
      this.demList2 = res;
      this.demList = this.demList2.filter(item => item.etadir == "في الإنتظار");
    })
  }
  // Get User Connected
  userName: string;
  userId: string;
  demList2: AllMaintenance[] = [];
  demList: AllMaintenance[] = [];
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userId = res.id;
      this.userName = res.fullName;
    })

  }
  getEmployeeName(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.dem.userNameCreator = res.fullName;
      this.dem.dateemployee = this.date;
    })
  }
  populateForm(dem: AllMaintenance) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);

  }
  dem: AllMaintenance = new AllMaintenance();
  isValidFormSubmitted = false;
  path: string;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true
      this.dem.datedir = this.date;
      this.dem.iddir = this.userId;
      this.dem.nomdir = this.userName

        this.demService.PutObservableE(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.GetList();
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }
}
