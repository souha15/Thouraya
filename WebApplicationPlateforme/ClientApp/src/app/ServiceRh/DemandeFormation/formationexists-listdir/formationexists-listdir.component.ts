import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';

import { DemandeFormation } from '../../../shared/Models/ServiceRh/demande-formation.model';
import { Form } from '@angular/forms';
import { DemandeFormationService } from '../../../shared/Services/ServiceRh/demande-formation.service';

@Component({
  selector: 'app-formationexists-listdir',
  templateUrl: './formationexists-listdir.component.html',
  styleUrls: ['./formationexists-listdir.component.css']
})
export class FormationexistsListdirComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private formationService: DemandeFormationService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
  }


  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  factList: DemandeFormation[] = [];
  GfactList: DemandeFormation[] = [];

  getCreance() {
    this.formationService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.etat == "في الإنتظار" && item.iddir == this.UserIdConnected)

    })

  }

  //Populate Form 
  factId: number
  fact: DemandeFormation = new DemandeFormation();
  populateForm(facture: DemandeFormation) {
    this.formationService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etat = "موافقة"
    this.fact.datedir = this.date;
    this.fact.etatdir = "موافقة"
    this.fact.iddir = this.UserIdConnected;
    this.fact.nomdir = this.UserNameConnected;
    this.formationService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }
  refuse() {
    this.fact.etat = "رفض"
    this.fact.datedir = this.date;
    this.fact.etatdir = "رفض"
    this.fact.iddir = this.UserIdConnected;
    this.fact.nomdir = this.UserNameConnected;

    this.formationService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }
}
