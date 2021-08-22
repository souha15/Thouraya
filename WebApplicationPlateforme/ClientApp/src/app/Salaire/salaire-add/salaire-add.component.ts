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
  retratittest(event) {
    this.retrait = event.target.value;
    if (this.retrait != null && this.leplus != null && this.user!=null) {
      this.test = true;
      this.tot = (+this.totindemnite + +this.salairev + +this.leplus) - +this.assurance - +this.retrait
    } else {
      this.test = false;
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
      this.salaireService.Add(this.salaire).subscribe(res => {
        form.resetForm();
        this.toastr.success("تم تسجيل  بنجاح", " تسجيل ");
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
