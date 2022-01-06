import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { CongeService } from '../../shared/Services/Rh/conge.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Conge } from '../../shared/Models/RH/conge.model';
import { SoldeCongeService } from '../../shared/Services/Rh/solde-conge.service';
import { SoldeConge } from '../../shared/Models/RH/solde-conge.model';

@Component({
  selector: 'app-menurequests',
  templateUrl: './menurequests.component.html',
  styleUrls: ['./menurequests.component.css']
})
export class MenurequestsComponent implements OnInit {

  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private soldeCongeService: SoldeCongeService,
  ) { }
  p: Number = 1;
  count: Number = 5;
  ngOnInit(): void {
    this.getUserConnected();
    //this.CongeList();
    this.resetForm();
  }


  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.congeService.GetUsersDemands(this.UserIdConnected).subscribe(res => {
        this.filtredCongeList = res
        console.log(this.filtredCongeList)
      })

    })

  }

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  CongeList() {
    console.log(this.UserIdConnected)
    this.congeService.GetUsersDemands(this.UserIdConnected).subscribe(res => {
      this.filtredCongeList = res
      console.log(this.filtredCongeList)
    })
  }


  per: Conge = new Conge();
  soldecongel: SoldeConge[] = [];
  soldecongel1: SoldeConge[] = [];
  soldeconge: SoldeConge = new SoldeConge();
  solde2: SoldeConge = new SoldeConge();
  soldeconge1: SoldeConge[] = [];
  soldexist: boolean = false;
  solde: string;
  sc: SoldeConge = new SoldeConge()
  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
   
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  conge: Conge = new Conge();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.dated = this.date;
    if (this.etat == "رفض") {
      this.congeService.formData.attribut2 = "رفض"
    } 
      this.UserService.GetUserById(this.per.idUserCreator).subscribe(res => {
        if (res.attribut1 == "318e6451-f404-43aa-8dcb-fcaef185d0af") {
          this.per.transferera = "2"
          this.per.attribut6 = "إعتماد بخصم"
          this.per.etat = "70%"
          this.soldeCongeService.Get().subscribe(res => {
            this.soldecongel1 = res
            this.soldeconge1 = this.soldecongel1.filter(item => item.idUserCreator == this.per.idUserCreator);
            if (this.soldecongel1.length > 0) {

              this.solde2 = this.soldecongel1[this.soldecongel1.length - 1];
            }

            this.soldeCongeService.Get().subscribe(res => {
              this.soldecongel = res
              this.soldecongel.filter(item => item.idUserCreator == this.per.idUserCreator);
              this.soldeconge = this.soldecongel[this.soldecongel.length - 1];
              this.sc = this.soldecongel[this.soldecongel.length - 1]

              if (this.per.type == "إجازة سنوية") {
                this.sc.dateenreg = this.date;

                let solde = +this.soldeconge.soldenormal - +this.per.duree
                this.sc.soldenormal = solde.toString();

                this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
                  this.toastr.success('تم التحديث بنجاح', 'نجاح')
                  this.congeService.Edit().subscribe(res => {
                    this.toastr.success('تم التحديث بنجاح', 'نجاح')
                    this.resetForm();
                    this.getUserConnected();
                  },
                    err => {
                      this.toastr.error('لم يتم التحديث  ', ' فشل');
                    }


                  )
                })

              }
              if (this.per.type == "إجازة إضطرارية") {

                this.sc.dateenreg = this.date;
                let solde = +this.soldeconge.soldeurgent - +this.per.duree
                this.sc.soldeurgent = solde.toString();
                this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
                  this.toastr.success('تم التحديث بنجاح', 'نجاح')

                  this.congeService.Edit().subscribe(res => {
                    this.toastr.success('تم التحديث بنجاح', 'نجاح')
                    this.resetForm();
                    this.getUserConnected();
                  },
                    err => {
                      this.toastr.error('لم يتم التحديث  ', ' فشل');
                    }


                  )
                })

              }

              if (this.per.type == "إجازة إستثنائية") {

                this.sc.dateenreg = this.date;
                let solde = +this.soldeconge.soldemaladie - +this.per.duree
                this.sc.soldemaladie = solde.toString();
                this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
                  this.toastr.success('تم التحديث بنجاح', 'نجاح')
                  this.congeService.Edit().subscribe(res => {
                    this.toastr.success('تم التحديث بنجاح', 'نجاح')
                    this.resetForm();
                    this.getUserConnected();
                  },
                    err => {
                      this.toastr.error('لم يتم التحديث  ', ' فشل');
                    }


                  )
                })

              }

            })
          })

        } else {

        this.congeService.formData.etat = "50%";
        this.congeService.Edit().subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.getUserConnected();
        },
          err => {
            this.toastr.error('لم يتم التحديث  ', ' فشل');
          }


          )
        }


      })

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      transferera: '',
      transfereretab: '',
      transfertrh: '',
      transfertdeux: '',
      datetransfert: '',
      idtrh: '',
      idtetab: '',
      nomtrh: '',
      nomtetab: '',
      etatetab: '',
      dateetab: '',
      tran1: '',
      tran2: '',
      tran3: '',
      tran4: '',
      tran5: '',
      tran6: '',
      datedebut: '',
      datefin: '',
      duree: '',
      tel: '',
      type: '',
      adr: '',
      idremplacant: '',
      nomremplacant: '',
      etat: '',
      etatd: '',
      etatrh: '',
      directeurid: '',
      directeurnom: '',
      rhid: '',
      rhnom: '',
      dated: '',
      daterh: '',
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
