import { Component, OnInit } from '@angular/core';
import { AssistanceService } from '../../../shared/Services/ServiceRh/assistance.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Assistance } from '../../../shared/Models/ServiceRh/assistance.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dem-assistance-listdirfin',
  templateUrl: './dem-assistance-listdirfin.component.html',
  styleUrls: ['./dem-assistance-listdirfin.component.css']
})
export class DemAssistanceListdirfinComponent implements OnInit {

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
      this.assistanceList = this.assistanceList1.filter(item => item.iddir == this.UserIdConnected && item.etatdir == "موافقة" && item.etatfin == "في الإنتظار" && item.transfert == null)
    })
  }
  assis: Assistance = new Assistance();
  populateForm(assistance: Assistance) {
    this.assis = Object.assign({}, assistance);
  }

  date = new Date().toLocaleDateString();
  accept() {
    this.assis.etatfin = "موافقة"
    this.assis.idfin = this.UserIdConnected;
    this.assis.nomfin = this.UserNameConnected;
    this.assis.datefin = this.date
    this.assistanceService.PutObservableE(this.assis).subscribe(res => {
      this.getAsList();
      this.toastr.success("تم  موافقة الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم  موافقة الطلب ', ' فشل');
      })
  }


  refuse() {
    this.assis.etatfin = "رفض"
    this.assis.etat = "رفض"
    this.assis.idfin = this.UserIdConnected;
    this.assis.nomfin = this.UserNameConnected;
    this.assis.datefin = this.date
    this.assistanceService.PutObservableE(this.assis).subscribe(res => {
      this.getAsList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم  ترفض الطلب ', ' فشل');
      })
  }
  transfererA:string=""
  transfertData(event) {
    this.transfererA = event.target.value;
  }

  transferer() {
    this.assis.transfert = this.transfererA;
    this.assis.idfin = this.UserIdConnected;
    this.assis.nomfin = this.UserNameConnected;
    this.assis.datefin = this.date
    this.assistanceService.PutObservableE(this.assis).subscribe(res => {
      this.toastr.success("تم  تحويل  الطلب بنجاح", "نجاح");
      this.getAsList();
    },
      err => {
        this.toastr.warning('لم يتم  تحويل  الطلب بنجاح', ' فشل');
      })
  }
}
