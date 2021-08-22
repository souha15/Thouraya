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

@Component({
  selector: 'app-demande-formation-add',
  templateUrl: './demande-formation-add.component.html',
  styleUrls: ['./demande-formation-add.component.css']
})
export class DemandeFormationAddComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private formationService: FormationService,
    private UserService: UserServiceService,
    private FormationRequestService: DemandeFormationService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getIdUrl();
    this.getById();
  }

  // Get User Connected

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

  //get id in URl
  TaskId: number;
  tache: DemandeFormation = new DemandeFormation();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.TaskId = params['id']
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  fmList: DemandeFormation[] = [];
  fm2List: DemandeFormation[] = [];
  testfor: boolean=false;
  testformation(){
    this.FormationRequestService.Get().subscribe(res => {
      this.fmList = res
      this.fm2List = this.fmList.filter(item => item.idFormation == this.TaskId && item.idUserCreator == this.UserIdConnected)
      if (this.fm2List.length == 0) {
        this.testfor = true
      } else {
        this.testfor = false
      }
   
    }) 
  }

  formation: Formation = new Formation();
  titre: string;
  specialite: string;
  org: string;
  duree: string;
  datedebut: string;
  datefin: string;
  attribut2: string;
  detail: string;
  getById() {
    this.formationService.GetById(this.TaskId).subscribe(res => {
      this.formation = res

      this.titre = this.formation.titre;
      this.specialite = this.formation.specialite;
      this.org = this.formation.org;
      this.duree = this.formation.duree;
      this.datedebut = this.formation.datedebut;
      this.datefin = this.formation.datefin;
      this.attribut2 = this.formation.attribut2;
      this.detail = this.formation.detail


    })
  }


  fm: DemandeFormation = new DemandeFormation();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.testformation();
    this.FormationRequestService.Get().subscribe(res => {
      this.fmList = res
      this.fm2List = this.fmList.filter(item => item.idFormation == this.TaskId && item.idUserCreator == this.UserIdConnected)
      if (this.fm2List.length == 0) {
        this.testfor = true
      } else {
        this.testfor = false
      }

    if (this.testfor == true) {

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
      this.fm.titre = this.formation.titre;
      this.fm.specialite = this.formation.specialite;
      this.fm.org = this.formation.org;
      this.fm.duree = this.formation.duree;
      this.fm.idFormation = this.TaskId
      this.FormationRequestService.Add(this.fm).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
        }
      )
    }
    else {
      this.toastr.error("لقد تم التسجيل من قبل", " تسجيل ")
      }
    }) 
  }
  
}
