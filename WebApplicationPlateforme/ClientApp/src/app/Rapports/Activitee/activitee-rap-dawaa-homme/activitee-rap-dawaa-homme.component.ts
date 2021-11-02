import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActiviteeService } from '../../../shared/Services/NewServicesForDawa/activitee.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Activite } from '../../../shared/Models/NewModelsForDawaa/activite.model';
import { ToastrService } from 'ngx-toastr';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-activitee-rap-dawaa-homme',
  templateUrl: './activitee-rap-dawaa-homme.component.html',
  styleUrls: ['./activitee-rap-dawaa-homme.component.css']
})
export class ActiviteeRapDawaaHommeComponent implements OnInit {
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private activiteService: ActiviteeService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
  
  }

  p: Number = 1;
  count: Number = 5;

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  UserEtabId: number;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserEtabId = res.idDepartement;
    })

  }

  //Get Activité List

  list: Activite[] = [];
  list2: Activite[] = [];
  getActiviteListG() {
    this.activiteService.List().subscribe(res => {
      this.list2 = res;
      if (this.DateFin == undefined || this.DateDeb == undefined) {
        this.toastr.warning("رجاءا اكمل جميع الحقول")
      }
      else {
        this.list = this.list2.filter(item => item.attribut1 == this.UserEtabId.toString() && item.dateDeb == this.DateDeb && item.datefin == this.DateFin)
        this.activiteService.list = this.list
      }

    })
  }

 public DateFin: string;
  getDateFin(event) {
    this.DateFin = event.target.value;
  }
  public DateDeb: string;
  getDateDeb(event) {
    this.DateDeb = event.target.value;
  }


}
