import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { TuteurParrinage } from '../../../shared/Models/Parrainage/tuteur-parrinage.model';
import { NgForm } from '@angular/forms';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TuteurParrainageService } from '../../../shared/Services/Parrainage/tuteur-parrainage.service';
import { OrphelinService } from '../../../shared/Services/Orphelin/orphelin.service';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { Orphelin } from '../../../shared/Models/Orphelin/orphelin.model';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { SoldeTuteur } from '../../../shared/Models/Parrainage/solde-tuteur.model';
import { SoldeTuteurService } from '../../../shared/Services/Parrainage/solde-tuteur.service';
import { Parriner } from '../../../shared/Models/Parrainage/parriner.model';
import { ParrinerService } from '../../../shared/Services/Parrainage/parriner.service';

@Component({
  selector: 'app-add-parrainage',
  templateUrl: './add-parrainage.component.html',
  styleUrls: ['./add-parrainage.component.css']
})
export class AddParrainageComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private tutService: TuteurParrainageService,
    private OrphelinService: OrphelinService,
    private beneficiaireService: GestBenService,
    private stutService: SoldeTuteurService,
    private parService: ParrinerService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getIdUrl();
    this.getstut();
  }

  // Type Parrainage

  par: Parriner = new Parriner()
  private selectedLink: string = "";
  setradio(e: string): void {

    this.selectedLink = e;
    if (this.selectedLink == "orphelin") {
      this.par.type = "يتيم"
    }

    if (this.selectedLink == "femme") {
      this.par.type = "ارملة او مطلقة"
    }

  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) { // if no radio button is selected, always return false so every nothing is shown  
      return false;
    }

    return (this.selectedLink === name); // if current radio button is selected, return true, else return false  
  }
  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.par.idUserCreator = this.UserIdConnected;
      this.par.attribut6 = this.UserNameConnected;
    })

  }

  //Get Tuteur Data

  Id: number;
  tut: TuteurParrinage = new TuteurParrinage();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.tutService.GetById(this.Id).subscribe(res => {
        this.tut = res
        this.par.attribut7 = this.tut.id
        this.par.nomTuteur = this.tut.nom
        this.par.cinTuteur = this.tut.cin
        this.par.numTuteur = this.tut.numTut
      })


    });
  }

  // Orphelin Data
  OrphsList: Orphelin[] = [];
  OrphsList2: Orphelin[] = [];
  Orph: Orphelin = new Orphelin();
  orphxist: boolean = false;
  getOrph(event) {
    this.OrphelinService.Get().subscribe(res => {
      this.OrphsList2 = res
      this.OrphsList = this.OrphsList2.filter(item => item.id == +event.target.value)
      this.OrphsList = this.OrphsList2.filter(item => item.nom == event.target.value)

      if (this.OrphsList.length != 0) {
        this.Orph = this.OrphsList[0];
        this.par.cinOrph = this.Orph.cin
        this.par.idOrph = this.Orph.id
        this.par.nomOrph = this.Orph.nom
        this.orphxist = true;
      } else {
        this.msg = "لا يوجد مكفول بهذه البيانات"
        this.orphxist = false;
      }
    })
  }

  //beneficiaire data
  BenList2: GestBen[] = [];
  BenList: GestBen[] = [];
  Ben: GestBen = new GestBen();
  Benxist: boolean = false;
  msg: string;
  getFemme(event) {
    this.beneficiaireService.ListGestBen().subscribe(res => {
      this.BenList2 = res;
      this.BenList = this.BenList2.filter(item => item.id == +event.target.value)
      this.BenList = this.BenList2.filter(item => item.nomprenom == event.target.value)
      if (this.BenList.length != 0) {
        this.Ben = this.BenList[0]
        this.par.idTut = this.Ben.id
        this.par.nomBen = this.Ben.nomprenom
        this.Benxist = true;
      } else {
        this.msg = "لا يوجد مكفول بهذه البيانات"
        this.Benxist = false;
      }

    })
  }
  //Solde Tut Data
  stutList2: SoldeTuteur[] = [];
  stutList: SoldeTuteur[] = [];
  stut: SoldeTuteur = new SoldeTuteur();
  getstut() {
    this.stutService.Get().subscribe(res => {
      this.stutList2 = res
      this.stutList = this.stutList2.filter(item => item.idTut == this.Id)
      this.stut = this.stutList[this.stutList.length - 1];
    })
  }


  addOrph() {
    this.parService.Add(this.par).subscribe(res => {
      this.toastr.success("تم التسجيل  بنجاح", " تسجيل الكفيل");
    },
      err => {
        this.toastr.error("فشل في التسجيل ", " تسجيل الكفيل");
      }
    )
  }


  addBen() {
    this.parService.Add(this.par).subscribe(res => {
      this.toastr.success("تم التسجيل  بنجاح", " التسجيل الكفيل");
    }, err => {
        this.toastr.error("فشل في التسجيل  ", " التسجيل الكفيل");
    })
  }

  soldeBen(event) {
    this.par.solde = event.target.value;
  }

  soldeOrph(event){
    this.par.solde = event.target.value;
}
}
