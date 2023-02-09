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
  selector: 'app-all-maintenance-list-employee',
  templateUrl: './all-maintenance-list-employee.component.html',
  styleUrls: ['./all-maintenance-list-employee.component.css']
})
export class AllMaintenanceListEmployeeComponent implements OnInit {

  constructor(private demService: AllMaintenanceService,
    private typeService: AllTypeMaintenanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getTypeList();
    this.getUserConnected();
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
    this.demService.GetByEmployee(this.userId).subscribe(res => {
      this.demList =res
    })
  }
  // Get User Connected
  userName: string;
  userId: string;
  demList: AllMaintenance[] = [];
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userId = res.id;
      this.userName = res.fullName;
      this.demService.GetByEmployee(this.userId).subscribe(res => {
        this.demList = res
      })
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
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true
      this.dem.dateemployee = this.date;
      this.dem.attribut3 = this.dem.etatemployee
      this.demService.PutObservableE(this.dem).subscribe(
        res => {
          this.succ = true;
          this.failed = false;
          this.msg = "  تم التحديث بنجاح"
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          this.GetList();
        form.resetForm();
      },
        err => {
          this.failed = true;
          this.succ = false;
          this.msg = "  فشل عند التحديث"
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }

}
