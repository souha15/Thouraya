import { Component, OnInit } from '@angular/core';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { EquipementService } from '../../shared/Services/Rh/equipement.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Equipement } from '../../shared/Models/RH/equipement.model';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';

@Component({
  selector: 'app-org-part-edit',
  templateUrl: './org-part-edit.component.html',
  styleUrls: ['./org-part-edit.component.css']
})
export class OrgPartEditComponent implements OnInit {



  constructor(private congeService: EquipementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,
    private etabService: EtablissementService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.Etablist();
  }
  p: Number = 1;
  count: Number = 5;
  //Get UserConnected
  //get Etba Etablist(){

  etabList: Etablissement[] = [];
  etabList1: Etablissement[] = [];
  Etablist() {
    this.etabService.ListEtablissement().subscribe(res => {
      this.etabList1 = res
      this.etabList = this.etabList1.filter(item => item.idAdministration == 29)

    })
  }

  getEtab(event) {
    this.etabService.GetById(+event.target.value).subscribe(res => { this.congeService.formData.transfert = res.nom })
  }

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }



  //Get Conge Demand Lis

  congeList: Equipement[] = [];
  filtredCongeList: Equipement[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(
        item => item.attribut1 == this.userc.idDepartement)
    })
  }


  per: Equipement = new Equipement();
  populateForm(conge: Equipement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)


  }

}
