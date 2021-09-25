import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../shared/Services/ServiceRh/assistance.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Assistance } from '../../../shared/Models/ServiceRh/assistance.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dem-assistance-add',
  templateUrl: './dem-assistance-add.component.html',
  styleUrls: ['./dem-assistance-add.component.css']
})
export class DemAssistanceAddComponent implements OnInit {

  constructor(private assistanceService: AssistanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  dir: string;
  dirid: string;
  position: string;
  admindir: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.position = res.position;
      this.dirid = res.attribut1;
      this.dir = res.directeur;

    })


  }
  isValidFormSubmitted = false;
  assis: Assistance = new Assistance();
  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {

  
    this.assis.etat = "في الإنتظار"
    this.assis.etatdir = "في الإنتظار"
    this.assis.etatrh = "في الإنتظار"
    this.assis.etatfinetab = "في الإنتظار"
    this.assis.etatfin = "في الإنتظار"
    this.assis.dateenreg = this.date;
    this.assis.position = this.position;
    this.assis.iddir = this.dirid;
    this.assis.nomdir = this.dir;
    this.assis.idUserCreator = this.UserIdConnected;
    this.assis.userNameCreator = this.UserNameConnected;
    this.assistanceService.Add(this.assis).subscribe(res => {
      this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
      this.position=""
      form.resetForm();
    },
      err => {
        this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
      });
}
}
