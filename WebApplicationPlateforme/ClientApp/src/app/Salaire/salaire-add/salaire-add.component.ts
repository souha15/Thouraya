import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SalaireDService } from '../../shared/Services/Salaire/salaire-d.service';
import { SalaireD } from '../../shared/Models/Salaire/salaire-d.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-salaire-add',
  templateUrl: './salaire-add.component.html',
  styleUrls: ['./salaire-add.component.css']
})
export class SalaireAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private salaireService: SalaireDService) { }

  ngOnInit(): void {
    this.getUsersList();
    this.getUserConnected();
  }

  p: Number = 1;
  count: Number = 5;
  list: SalaireD[] = [];
  listG: SalaireD[] = [];
  testt: boolean = false;
  mois;
  getdatabyDate(event) {
    this.mois = event.target.value;
    this.getSDetails();
  }

  getSDetails() {
    this.salaireService.Get().subscribe(res => {
      this.list = res
      this.listG = this.list.filter(item => item.mois == this.mois)
      if (this.listG.length != 0) {
        this.testt = true;
      }

    })
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

  //get User Salaire Detail
  totindemnite: number;
  salairev: string;
  assurance: string;
  indemnite: string;
  user: string;
  tot: number;
  resi: number = 0;
  userData: UserDetail = new UserDetail();
  getSalaireDetail(event) {
    this.user = event.target.value;
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.userData = res;
      this.salaire.userName = res.fullName;
      this.salaire.salaire = res.salaire;
      this.salairev = res.salaire;
      this.salaire.indemnite = res.indemnite;
      this.resi = +res.autreIndemnite;
      this.salaire.assurance = res.autreIndemnite;
      this.indemnite = res.indemnite;
      this.tot = +this.resi + +this.salairev + +this.indemnite;
      var totIndemnite = +this.resi + +this.indemnite;
      this.salaire.totIndemnite = totIndemnite.toString();
    })
  }


  retrait: number = 0 ;
  test: boolean = false;
  net: number = 0;
  retratittest(event) {
    this.retrait = +event.target.value
    if (this.retrait != null) {
      this.net = this.tot - this.retrait
    }
  }

  leplus: string;
  leplusTest(event) {
    this.leplus = event.target.value;
    if (this.retrait != null && this.leplus != null && this.user != null) {
      this.test = true
      this.tot = (+this.totindemnite + +this.salairev + +this.leplus) - +this.assurance - +this.retrait
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
      this.salaire.tot = this.tot.toString();
      this.salaire.leplus = this.net.toString(); 
      this.salaireService.Add(this.salaire).subscribe(res => {
        
        this.toastr.success("تم تسجيل  بنجاح", " تسجيل ");
        this.userData = new UserDetail()
        this.net = 0;
        this.tot = 0;
        this.salaire.retrait = null;
        this.getSDetails();
        this.isValidFormSubmitted = false;
      },
        err => {
          this.toastr.error("فشل تسجيل ", " تسجيل ")
        })
    }
  }


  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.salaireService.Delete(Id)
        .subscribe(res => {
          //  this.getList();
          this.getSDetails();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
}
