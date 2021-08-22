import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Permission } from '../../../shared/Models/RH/permission.model';
import { NgForm } from '@angular/forms';
import { PermissionService } from '../../../shared/Services/Rh/permission.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';

@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.css']
})
export class PermissionAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private permissionService: PermissionUService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.per.creatorName = res.fullName;
      this.per.idUserCreator = res.id;
      this.per.iddir = res.attribut1;
      this.per.nomdir = res.directeur

    })

  }

  per: PermissionU = new PermissionU();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.per.datenereg = this.date;
    this.per.etatdir = "في الانتظار";
    this.per.etat = "في الانتظار";
    this.per.etatrh = "في الانتظار";
    console.log(form.invalid)
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true
      this.permissionService.Add(this.per).subscribe(
        res => {
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        },
      )

    }
  }
}
