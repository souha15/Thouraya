import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { ToastrService } from 'ngx-toastr';
import { ReceptionEquipementService } from '../../../shared/Services/ServiceRh/reception-equipement.service';
import { ReceptionEquipement } from '../../../shared/Models/ServiceRh/reception-equipement.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { SuppEquipement } from '../../../shared/Models/ServiceRh/supp-equipement.model';
import { SuppEquipementService } from '../../../shared/Services/ServiceRh/supp-equipement.service';


@Component({
  selector: 'app-supp-equipement',
  templateUrl: './supp-equipement.component.html',
  styleUrls: ['./supp-equipement.component.css']
})
export class SuppEquipementComponent implements OnInit {
  constructor(private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService,
    private trinService: ReceptionEquipementService,
    private suppService: SuppEquipementService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
  }


  //Populate Form 
  factId: number
  fact: ReceptionEquipement = new ReceptionEquipement();
  date = new Date().toLocaleDateString();
  name: string;
  etat: string;
  daterecep: string;
  populateForm(facture: ReceptionEquipement) {
    this.trinService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    this.name = this.fact.username;
    this.etat = this.fact.etatEqui;
    this.daterecep = this.fact.daterecep;

  }

  factList: ReceptionEquipement[] = [];
  GfactList: ReceptionEquipement[] = [];
  att: number = 1;
  getCreance() {
    this.trinService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.attribut2 == '1')
    })

  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  supp: SuppEquipement = new SuppEquipement();
  isValidFormSubmitted = false;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.supp.nomUser = this.name;
      this.supp.etat = this.etat;
      this.supp.userNameCreator = this.UserNameConnected;
      this.supp.idUserCreator = this.UserIdConnected;
      this.supp.idReception = this.fact.id;
      this.supp.daterecep = this.daterecep;

      this.suppService.Add(this.supp).subscribe(res => {
        this.fact.attribut2 = "0";
        this.trinService.PutObservableE(this.fact).subscribe(res => {
          form.resetForm();
          this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
          this.getCreance();
        })
      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
        })

    }

  }
}
