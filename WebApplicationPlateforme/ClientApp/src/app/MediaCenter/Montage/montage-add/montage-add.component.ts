import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Montage } from '../../../shared/Models/MediaCenter/Montage/montage.model';
import { MontageService } from '../../../shared/Services/MediaCenter/Montage/montage.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-montage-add',
  templateUrl: './montage-add.component.html',
  styleUrls: ['./montage-add.component.css']
})
export class MontageAddComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: MontageService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number =null;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      if (this.idEtab != null) {
        this.idEtab = res.idDepartement;
      
        this.nomEtab = res.nomDepartement;
      }
    })

  }


  /** OnSubmit **/

  dem: Montage = new Montage();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.dateenreg = this.date;
      this.dem.etat = "في الانتظار";
      this.dem.idUserCreator = this.UserId;
      this.dem.userNameCreator = this.UserName;
      if (this.idEtab != null) {
      this.dem.etabid = this.idEtab.toString();
        this.dem.etabnom = this.nomEtab;
      }
      this.demService.Create(this.dem).subscribe(res => {
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
