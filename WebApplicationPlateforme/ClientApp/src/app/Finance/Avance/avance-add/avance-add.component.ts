import { Component, OnInit } from '@angular/core';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-avance-add',
  templateUrl: './avance-add.component.html',
  styleUrls: ['./avance-add.component.css']
})
export class AvanceAddComponent implements OnInit {

  constructor(private avanceService: AvanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.av.idUserCreator = res.id;
      this.av.userNameCreator = res.fullName;

      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  av: Avance = new Avance();
  idf: number;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.av.dateenreg = this.date;
    this.av.attribut2 = "في الإنتظار";
    this.av.etatC = "في الإنتظار";
    this.av.etatD = "في الإنتظار"
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true;
      this.avanceService.Add(this.av).subscribe(
        res => {
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        }

      )
    }
  }
}
