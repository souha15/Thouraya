import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SalaireDService } from '../../shared/Services/Salaire/salaire-d.service';
import { SalaireD } from '../../shared/Models/Salaire/salaire-d.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salaire-details',
  templateUrl: './salaire-details.component.html',
  styleUrls: ['./salaire-details.component.css']
})
export class SalaireDetailsComponent implements OnInit {

  private routeSub: Subscription;
  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private salaireService: SalaireDService,
    private route: ActivatedRoute,
) { }


  ngOnInit(): void {
    this.getIdUrl();
    this.getUsersList();
    this.getUserConnected();
  }


  eventId:number
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.salaireService.GetById(this.eventId).subscribe(res => {
        this.salaire = res

        this.UserService.GetUserById(res.idUser).subscribe(res => {
        
          this.salairev = res.salaire;
          this.assurance = res.typeEmploi;
          this.totindemnite = +res.indemnite + +res.autreIndemnite

          this.indemnite = this.totindemnite.toString();

        })
      })
    });
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }


  usersList: UserDetail[] = [];
  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.usersList = res
    })
  }

  getSalaireDetail1() {
    this.UserService.GetUserById(this.salaire.idUser).subscribe(res => {
      this.salaire.userName = res.fullName;
      this.salaire.salaire = res.salaire;
      this.salairev = res.salaire;
      this.salaire.indemnite = res.indemnite;
      this.salaire.autreIndemnite = res.autreIndemnite;
      this.salaire.assurance = res.typeEmploi;
      this.assurance = res.typeEmploi;
      this.totindemnite = +res.indemnite + +res.autreIndemnite
      this.salaire.totIndemnite = this.totindemnite.toString();
      this.indemnite = this.totindemnite.toString();

    })
  }
  //get User Salaire Detail
  totindemnite: number;
  salairev: string;
  assurance: string;
  indemnite: string;
  user: string;
  tot: number;
  getSalaireDetail(event) {
    this.user = event.target.value;
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.salaire.userName = res.fullName;
      this.salaire.salaire = res.salaire;
      this.salairev = res.salaire;
      this.salaire.indemnite = res.indemnite;
      this.salaire.autreIndemnite = res.autreIndemnite;
      this.salaire.assurance = res.typeEmploi;
      this.assurance = res.typeEmploi;
      this.totindemnite = +res.indemnite + +res.autreIndemnite
      this.salaire.totIndemnite = this.totindemnite.toString();
      this.indemnite = this.totindemnite.toString();

    })
  }

  retrait: string;
  test: boolean = false;
  tottest: boolean = true;
  retratittest(event) {
    this.tottest = false;
    this.retrait = event.target.value;
    if (this.retrait != null && this.leplus != null && this.user != null) {
      this.test = true;
      this.tot = (+this.totindemnite + +this.salairev + +this.leplus) - +this.assurance - +this.retrait
    } else {
      this.test = false;
    }
  }

  leplus: string;
  leplusTest(event) {
    this.leplus = event.target.value;
    this.tottest = false;
    if (this.retrait != null && this.leplus != null && this.user != null) {
      this.test = true
      this.tot = (+this.salaire.totIndemnite + +this.salaire.salaire + +this.salaire.leplus) - +this.assurance - +this.retrait
    } else {
      this.test = false;
    }
  }
  // Create Salaire

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  salaire: SalaireD = new SalaireD();

  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true;
      this.salaire.idUserCreator = this.UserIdConnected;
      this.salaire.userNameCreator = this.UserNameConnected;
      this.salaire.dateenreg = this.date;
      //this.salaire.tot = this.tot.toString();
      this.salaireService.PutObservableE(this.salaire).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم تسجيل  بنجاح", " تسجيل ");
        this.isValidFormSubmitted = false;
      },
        err => {
          this.toastr.error("فشل تسجيل ", " تسجيل ")
        })
    }
  }
}
