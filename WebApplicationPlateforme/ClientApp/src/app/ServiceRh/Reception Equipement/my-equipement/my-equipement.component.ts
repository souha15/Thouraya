import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { ToastrService } from 'ngx-toastr';
import { ReceptionEquipementService } from '../../../shared/Services/ServiceRh/reception-equipement.service';
import { ReceptionEquipement } from '../../../shared/Models/ServiceRh/reception-equipement.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';


@Component({
  selector: 'app-my-equipement',
  templateUrl: './my-equipement.component.html',
  styleUrls: ['./my-equipement.component.css']
})
export class MyEquipementComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private adminService: AdministrationService,
    private toastr: ToastrService,
    private trinService: ReceptionEquipementService) { }

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


  factList: ReceptionEquipement[] = [];
  GfactList: ReceptionEquipement[] = [];

  getCreance() {
    this.trinService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.userId == this.UserIdConnected && item.attribut2 == "1")
    })

  }

  //Populate Form 
  factId: number
  fact: ReceptionEquipement = new ReceptionEquipement();
  date = new Date().toLocaleDateString();
  populateForm(facture: ReceptionEquipement) {
    this.trinService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }
}
