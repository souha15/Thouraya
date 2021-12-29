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
  selector: 'app-all-maintenance-add',
  templateUrl: './all-maintenance-add.component.html',
  styleUrls: ['./all-maintenance-add.component.css']
})
export class AllMaintenanceAddComponent implements OnInit {

  constructor(private demService: AllMaintenanceService,
    private typeService: AllTypeMaintenanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getTypeList();
    this.getUserConnected();
  }

  // Get Type Maintenance

  ListType: TbListening[] = [];
  getTypeList() {
    this.typeService.Get().subscribe(res => {
      this.ListType =res
    })
  }

  // Get User Connected
  userName: string;
  userId: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userId = res.id;
      this.userName = res.fullName;
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
      this.dem.etadir = "في الإنتظار"
      this.dem.etatemployee = "في الإنتظار"
      this.dem.attribut3 = "في الإنتظار"
      this.dem.attribut2 = this.date;
      this.dem.userNameCreator = this.userName;
      this.dem.idUserCreator = this.userId;
      this.demService.Add(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }
}
