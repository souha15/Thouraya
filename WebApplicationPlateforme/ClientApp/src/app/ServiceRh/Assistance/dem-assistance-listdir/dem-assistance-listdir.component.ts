import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../shared/Services/ServiceRh/assistance.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Assistance } from '../../../shared/Models/ServiceRh/assistance.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dem-assistance-listdir',
  templateUrl: './dem-assistance-listdir.component.html',
  styleUrls: ['./dem-assistance-listdir.component.css']
})
export class DemAssistanceListdirComponent implements OnInit {

  constructor(private assistanceService: AssistanceService,
    private toastr: ToastrService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getAsList();
  }


  p: Number = 1;
  count: Number = 5;
  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  assistanceList: Assistance[] = [];
  assistanceList1: Assistance[] = [];
  getAsList() {
    this.assistanceService.Get().subscribe(res => {
      this.assistanceList1 = res
      this.assistanceList = this.assistanceList1.filter(item => item.iddir == this.UserIdConnected && item.etatdir =="في الإنتظار")
    })
  }
  assis: Assistance = new Assistance();
  populateForm(assistance: Assistance) {
    this.assis = Object.assign({}, assistance);
  }

  date = new Date().toLocaleDateString();
  accept() {
    this.assis.etatdir = "موافقة"
    this.assis.nomdir = this.UserNameConnected
    this.assis.iddir = this.UserIdConnected;
    this.assis.datedir = this.date

    this.assistanceService.PutObservableE(this.assis).subscribe(res => {
      this.getAsList();
      this.toastr.success("تم  موافقة الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم  موافقة الطلب ', ' فشل');
      })
  }


  refuse() {
    this.assis.etatdir = "رفض"
    this.assis.etat = "رفض"
    this.assis.nomdir = this.UserNameConnected
    this.assis.iddir = this.UserIdConnected;
    this.assis.datedir = this.date;
    this.assistanceService.PutObservableE(this.assis).subscribe(res => {
      this.getAsList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم  ترفض الطلب ', ' فشل');
      })
  }
}
