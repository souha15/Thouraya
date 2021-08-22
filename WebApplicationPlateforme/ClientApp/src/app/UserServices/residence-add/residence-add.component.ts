import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { ResidenceService } from '../../shared/Services/User Services/residence.service';
import { Residence } from '../../shared/Models/User Services/residence.model';

@Component({
  selector: 'app-residence-add',
  templateUrl: './residence-add.component.html',
  styleUrls: ['./residence-add.component.css']
})
export class ResidenceAddComponent implements OnInit {

  constructor(private residenceService: ResidenceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  bureau: string;
  frontiere: string
  datefin: string;
  rs: Residence = new Residence();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.bureau = res.mention;
      this.frontiere = res.paysetude;
      this.datefin = res.unite
    })

  }

  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.rs.datenereg = this.date;
    this.rs.numBureau = this.bureau;
    this.rs.idUserCreator = this.UserIdConnected;
    this.rs.creatorName = this.UserNameConnected;
    this.rs.numfrontiere = this.frontiere;
    this.rs.datefin = this.datefin
    this.rs.etat ="في الانتظار"
    this.rs.etatdir ="في الانتظار"
    this.rs.etatrh = "في الانتظار"
    this.residenceService.Add(this.rs).subscribe(
      res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
      },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }
    )
  }
}
