import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../shared/Services/Rh/conge.service';
import { SoldeCongeService } from '../../shared/Services/Rh/solde-conge.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SoldeConge } from '../../shared/Models/RH/solde-conge.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Conge } from '../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-dem-conge-urgent',
  templateUrl: './dem-conge-urgent.component.html',
  styleUrls: ['./dem-conge-urgent.component.css']
})
export class DemCongeUrgentComponent implements OnInit {


  constructor(private congeService: CongeService,
    private soldeCongeService: SoldeCongeService,
    private UserService: UserServiceService,
    private toastr: ToastrService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.UserList();

  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  nbdays: number = 0;
  soldedays: number = 0;
  dateEnreg: string;
  soldeconge: number = 0;
  datecontrat: string;
  userc: UserDetail = new UserDetail();
  soldeconges: SoldeConge = new SoldeConge();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.conge.directeurnom = res.directeur;
      this.conge.directeurid = res.attribut1;
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;
      this.soldeCongeService.GetSolde(this.UserIdConnected).subscribe(res => {
        this.soldeconges = res;

        this.soldeconge = +this.soldeconges.soldeurgent;

    })
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
  testdays: boolean = false;
  diff() {
    let newDated = new Date(this.dated)
    let newDatef = new Date(this.datef);
    var diff = Math.abs(newDated.getTime() - newDatef.getTime());
    this.diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    this.conge.duree = this.diffDays.toString();
    if (this.diffDays <= 5 && this.soldeconge > 0) {
      this.testdays = true;
    } else {
      this.testdays = false;
    }
  }

  testdates: string;
  comparedates() {
    let d1 = new Date(this.dated);
    let d2 = new Date(this.datef);
    if (d1.getTime() < d2.getTime()) {
      this.testdates = "good"
    } else if (d1.getTime() > d2.getTime()) {
      this.testdates = "bad"
    } else {
      this.testdates = "equal"
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
    this.conge.type = "إجازة إضطرارية"
    this.conge.adr = this.soldeconge.toString();
    this.conge.attribut6 = "في الانتظار";
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.diffDays = 0
    }
    else {

      this.isValidFormSubmitted = true

      this.diff();
      console.log(this.testdays)
      if (this.testdays) {

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
      } 
      else {
        this.diffDays = 0
        this.toastr.error(" لا يمكنك تجاوز 5 أيام أو رصيدك 0", "فشل ")
      }


    }

  }

}
