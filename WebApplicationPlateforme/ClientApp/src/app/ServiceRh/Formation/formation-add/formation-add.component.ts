import { Component, OnInit } from '@angular/core';
import { FormationService } from '../../../shared/Services/ServiceRh/formation.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Formation } from '../../../shared/Models/ServiceRh/formation.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-formation-add',
  templateUrl: './formation-add.component.html',
  styleUrls: ['./formation-add.component.css']
})
export class FormationAddComponent implements OnInit {

  constructor(private formationService: FormationService,
    private UserService: UserServiceService,
    private specialiteService: TbListeningService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetSpecList();
  }


  // Get Specilite List

  SpecList: TbListening[] = [];

  GetSpecList() {
    this.specialiteService.Get().subscribe(res => {
      this.SpecList = res
    })
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.formation.idUserCreator = res.id;
      this.formation.userNameCreator = res.fullName;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }
  // Create Formation

  formation: Formation = new Formation();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  idcr: number;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.formation.dateenreg = this.date;
      this.formationService.Add(this.formation).subscribe(
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
