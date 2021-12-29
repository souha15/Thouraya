import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { AllMaintenanceService } from '../../shared/Services/AllMaintenance/all-maintenance.service';
import { AllTypeMaintenance } from '../../shared/Models/AllMaintenance/all-type-maintenance.model';
import { AllMaintenance } from '../../shared/Models/AllMaintenance/all-maintenance.model';
import { AllTypeMaintenanceService } from '../../shared/Services/AllMaintenance/all-type-maintenance.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-all-maintenance-list-user',
  templateUrl: './all-maintenance-list-user.component.html',
  styleUrls: ['./all-maintenance-list-user.component.css']
})
export class AllMaintenanceListUserComponent implements OnInit {

  constructor(private demService: AllMaintenanceService,
    private typeService: AllTypeMaintenanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getTypeList();
    this.getUserConnected();
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
    this.demService.GetByUser(this.userId).subscribe(res => {
      this.demList = res;
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
      this.demService.GetByUser(this.userId).subscribe(res => {
        this.demList = res;
      })
    })

  }

  other: boolean = false;
  autre(event) {
    if (event.target.value == 'أخرى') {
      this.other = true;
    } else {
      this.other = false;
    }
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

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {

      this.demService.Delete(Id)
        .subscribe(res => {
          this.GetList();
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
