import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { SoldeCongeService } from '../../../shared/Services/Rh/solde-conge.service';
import { SoldeConge } from '../../../shared/Models/RH/solde-conge.model';

@Component({
  selector: 'app-demande-conge',
  templateUrl: './demande-conge.component.html',
  styleUrls: ['./demande-conge.component.css']
})
export class DemandeCongeComponent implements OnInit {

  constructor(private congeService: CongeService,
    private soldeCongeService: SoldeCongeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.UserList();
    this.resetForm();
    this.getSoldeConge();
    this.CalculateSoldeCongé();
  }



  soldecl: SoldeConge[] = [];

  nbdays: number = 0;
  getSoldeConge() {
    this.soldeCongeService.Get().subscribe(res => {
      this.soldecl = res
      this.soldecl.filter(item => item.type == "اجازة عادية");
      this.nbdays = +this.soldecl[0].number;
    })
  }
  soldece: SoldeConge = new SoldeConge();
  soldecle: SoldeConge[] = [];
  soldeconge: number = 0;
  globalsoldeConge: number = 0;
  CalculateSoldeCongé() {
    this.soldeCongeService.GetE().subscribe(res => {
      this.soldecle = res
      this.soldecle.filter(item => item.idUserCreator == this.UserIdConnected);
    // Conge for the first Time

      let d2 = new Date(this.datecontrat);
      let d1 = new Date();
      var months;
      months = (d1.getFullYear() - d2.getFullYear()) * 12;
      months -= d2.getMonth();
      months += d1.getMonth();
      this.globalsoldeConge = months * this.nbdays;
      if (this.soldecle.length == 0) {
        this.soldeconge = this.globalsoldeConge;
      } else {
        this.soldece = this.soldecle[this.soldecle.length - 1]
        this.soldeconge = +this.soldece.number
      }
    })
  }
  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  datecontrat: string;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      //this.soldeconge = res.soldeconge;
      this.datecontrat = res.unite;
      this.conge.directeurnom = res.directeur;
      this.conge.directeurid = res.attribut1;
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;

    })

  }


  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }


  //get Remplaçant Name

  getRemplacant(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.conge.nomremplacant = res.fullName

    })
  }

  //date fin
  datef;
  cdates: boolean = false;
  tdatefin(event) {
    this.datef = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0
   
    } else {
      this.cdates = false;
      if (this.dated == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }
 
    
  }

  //date debut
  dated;
  tdatedebut(event) {
    this.dated = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0

    } else {
      this.cdates = false;
      if (this.datef == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }
  }

  //Difference
  diffDays: number = 0;
  diff() {
    let newDated = new Date(this.dated)
    let newDatef = new Date(this.datef);
    var diff = Math.abs(newDated.getTime() - newDatef.getTime());
    this.diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    this.conge.duree = this.diffDays.toString();
    console.log(this.diffDays)
  }

  testdates: string;
  comparedates() {
    let d1 = new Date(this.dated);
    let d2 = new Date(this.datef);
    if (d1.getTime() < d2.getTime()) {
      this.testdates ="good"
    } else if (d1.getTime() > d2.getTime()) {
      this.testdates ="bad"
    } else {
      this.testdates ="equal"
    }
  }

  //Conge Submit
  conge: Conge = new Conge();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    this.conge.dateenreg = this.date;
    this.conge.etat = "5%";
    this.conge.etatd = "في الانتظار";
    this.conge.etatrh = "في الانتظار";
    this.conge.attribut2 = "في الانتظار";
    this.conge.adr = this.soldeconge.toString();

    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.diffDays = 0
    }
    else {

      this.isValidFormSubmitted = true

      this.diff();
      
      if (+this.diffDays < +this.soldeconge && this.testdates == "good") {

        this.congeService.Add(this.conge).subscribe(
          res => {
            this.soldeconge = this.soldeconge - +this.conge.duree;
            this.diffDays = 0
            this.toastr.success(" تم تقديم الطلب بنجاح", "نجاح");
            form.resetForm();

          },
          err => {
            this.toastr.error("لم يتم تقديم الطلب", "فشل ")
            this.diffDays = 0
          })
      } else {
        this.diffDays = 0
        this.toastr.warning("تثبت من التاريخ رصيد إجازتك أقل من المطلوب", "")
      }


    }



  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.UserService.formData = {
      id: '',
      userName: '',
      email: '',
      Password: '',
      registreCivil: '',
      FullNameEnglish: '',
      fullName: '',
      adresse: '',
      PhoneNumber: '',
      tel: '',
      statut: '',
      nationalite: '',
      religion: '',
      sexe: '',
      dateNaissance: '',
      lieuNaissance: '',
      passeport: '',
      typeSang: '',
      num: '',
      emploi: '',
      rang: '',
      typeEmploi: '',
      nomAdministration: '',
      nomDepartement: '',
      unite: '',
      qualification: '',
      typeQualification: '',
      faculteEcole: '',
      dateQualification: '',
      specialite: '',
      paysetude: '',
      mention: '',
      classement: '',
      degre: '',
      salaire: '',
      indemnite: '',
      autreIndemnite: '',
      heureArrive: '',
      heureDepart: '',
      photo: '',
      idAdministration: null,
      idDepartement: null,
      directeur: '',
      position: '',
      attribut1: '',
      attribut6: '',
      attribut5: '',
      attribut4: '',
      attribut3: '',
      attribut2: '',
      soldeconge: '',
      daterectrutement: '',
      etatuser: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',


    }
  }

}
