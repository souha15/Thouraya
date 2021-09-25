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
  selector: 'app-equipement-list-rh',
  templateUrl: './equipement-list-rh.component.html',
  styleUrls: ['./equipement-list-rh.component.css']
})
export class EquipementListRHComponent implements OnInit {


  constructor(private congeService: EquipementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,
    private etabService: EtablissementService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.Etablist();
    this.resetForm();


  }
  onSubmit(form: NgForm) {
    this.updateRecord(form)
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
    this.etabService.GetById(+event.target.value).subscribe(res =>
    { this.congeService.formData.transfert = res.nom })
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
      this.filtredCongeList = this.congeList.filter(item => item.attribut4 == "في الانتظار" && item.etatdir == "موافق" && item.attribut3 == this.UserIdConnected)
    })
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  conge: Equipement = new Equipement();
  date = new Date().toLocaleDateString();
  updateRecord(form: NgForm) {
    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.datedir = this.date;
    this.congeService.formData.attribut2 = this.etat;
    this.congeService.formData.attribut4 = this.etat;
    this.congeService.formData.attribut5 = this.UserNameConnected;
    this.congeService.formData.attribut6 = this.UserIdConnected;
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }

  per: Equipement = new Equipement();
  populateForm(conge: Equipement) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)


  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      type: '',
      nom: '',
      email: '',
      tel: '',
      transfert: '',
      remarque: '',
      etatdir: '',
      date: '',
      datedir: '',
      iddir: '',
      nomdir: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }
}
