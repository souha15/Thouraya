import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';
import { NewFormation } from '../../../shared/Models/ServiceRh/new-formation.model';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { DemandeFormationService } from '../../../shared/Services/ServiceRh/demande-formation.service';
import { DemandeFormation } from '../../../shared/Models/ServiceRh/demande-formation.model';

@Component({
  selector: 'app-my-formation',
  templateUrl: './my-formation.component.html',
  styleUrls: ['./my-formation.component.css']
})
export class MyFormationComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private atService: NewFormationService,
    private specialiteService: TbListeningService,
    private atforService: DemandeFormationService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();

    this.GetSpecList();
  }


  // Get Specilite List

  SpecList: TbListening[] = [];

  GetSpecList() {
    this.specialiteService.Get().subscribe(res => {
      this.SpecList = res
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

  factList: NewFormation[] = [];
  GfactList: NewFormation[] = [];
  factList1: DemandeFormation[] = [];
  GfactList1: DemandeFormation[] = [];

  getCreance() {
    this.atService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected && item.attribut2 == "منجزة")

    })

    this.atforService.Get().subscribe(res => {
      this.GfactList1 = res;

      this.factList1 = this.GfactList1.filter(item => item.idUserCreator == this.UserIdConnected && item.attribut2 == "منجزة")
    })

  }

  //Populate Form 
  factId: number
  fact: NewFormation = new NewFormation();
  populateForm(facture: NewFormation) {
    this.atService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }
  fact1: DemandeFormation = new DemandeFormation();
  populateForm1(facture: DemandeFormation) {
    this.atforService.formData = Object.assign({}, facture)
    this.fact1 = Object.assign({}, facture);
  }

}
