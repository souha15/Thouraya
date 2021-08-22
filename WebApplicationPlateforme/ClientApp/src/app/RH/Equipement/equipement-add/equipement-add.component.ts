import { Component, OnInit } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Equipement } from '../../../shared/Models/RH/equipement.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-equipement-add',
  templateUrl: './equipement-add.component.html',
  styleUrls: ['./equipement-add.component.css']
})
export class EquipementAddComponent implements OnInit {

  constructor(private tblService: TbListeningService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private equipementService: EquipementService) { }

  ngOnInit(): void {
    this.getNomEquipementList();
    this.getTypeEquipementList();
    this.getUserConnected();
  }

  // Get User Connected


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.equ.nomdir = res.directeur;
      this.equ.iddir = res.attribut1;
      this.equ.userNameCreator = res.fullName;
      this.equ.idUserCreator = res.id;

    })

  }



  //Type Equipement

  typeEquipement: TbListening[] = [];
  getTypeEquipementList() {
    this.tblService.GetE().subscribe(res => {
      this.typeEquipement = res
    })
  }


  //Type Equipement

  nomEquipement: TbListening[] = [];
  getNomEquipementList() {
    this.tblService.GetN().subscribe(res => {
      this.nomEquipement = res
    })
  }

  //Add Equipement
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  equ: Equipement = new Equipement();
  onSubmit(form: NgForm) {
    this.equ.etatdir = "في الانتظار";
    this.equ.attribut2 = "في الانتظار";
    this.equ.attribut4 = "في الانتظار";
    this.equ.dateenreg = this.date;
    this.equ.date = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.equipementService.Add(this.equ).subscribe(
        res => {
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
