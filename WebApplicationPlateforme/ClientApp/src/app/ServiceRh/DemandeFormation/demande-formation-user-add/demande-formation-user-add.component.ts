import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../../../shared/Services/ServiceRh/formation.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DemandeFormation } from '../../../shared/Models/ServiceRh/demande-formation.model';
import { Formation } from '../../../shared/Models/ServiceRh/formation.model';
import { DemandeFormationService } from '../../../shared/Services/ServiceRh/demande-formation.service';
import { NgForm } from '@angular/forms';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';

@Component({
  selector: 'app-demande-formation-user-add',
  templateUrl: './demande-formation-user-add.component.html',
  styleUrls: ['./demande-formation-user-add.component.css']
})
export class DemandeFormationUserAddComponent implements OnInit {

  constructor(private formationService: NewFormationService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private specialiteService: TbListeningService,) { }

  ngOnInit(): void {
    this.getUserConnected();
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
  dir: string;
  dirid: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.dir = res.directeur;
      this.dirid = res.attribut1
    })
  }


  fm: DemandeFormation = new DemandeFormation();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.fm.dateenreg = this.date;
      this.fm.etat = 'في الإنتظار';
      this.fm.etatc = "في الإنتظار";
      this.fm.etatdir = "في الإنتظار";
      this.fm.etatrh = "في الإنتظار";
      this.fm.attribut2 = "غير منجزة"
      this.fm.iddir = this.dirid;
      this.fm.nomdir = this.dir;
      this.fm.idUserCreator = this.UserIdConnected;
      this.fm.userNameCreator = this.UserNameConnected;
      this.formationService.Add(this.fm).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }
}
