import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { SoldeCongeService } from '../../../shared/Services/Rh/solde-conge.service';
import { SoldeConge } from '../../../shared/Models/RH/solde-conge.model';

@Component({
  selector: 'app-rh-conge-list',
  templateUrl: './rh-conge-list.component.html',
  styleUrls: ['./rh-conge-list.component.css']
})
export class RhCongeListComponent implements OnInit {

  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private soldeCongeService: SoldeCongeService,
  ) { }
  p: Number = 1;
  count: Number = 5;
  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
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
    })

  }

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.etatd == "موافق" && item.etatrh == "في الانتظار")
    })
  }


  per: Conge = new Conge();
  soldecongel: SoldeConge[] = [];
  soldeconge: SoldeConge = new SoldeConge();
  soldexist: boolean = false;
  solde: string;
  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.solde = this.per.adr
    this.congeService.formData = Object.assign({}, conge)
    this.soldeCongeService.GetE().subscribe(res => {
      this.soldecongel = res
      this.soldecongel.filter(item => item.idUserCreator == this.per.idUserCreator);
      if (this.soldecongel.length == 0) {
        this.soldexist = false;
      } else {
        this.soldexist = true;
        this.soldeconge = this.soldecongel[this.soldecongel.length - 1];
      }
    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  conge: Conge = new Conge();

  updateRecord1(form: NgForm) {
  
    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.daterh = this.date;
    if (this.etat == "رفض") {
      this.congeService.formData.attribut2 ="رفض"
    } else {


      this.congeService.formData.attribut2 = "موافق"
    }
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }
  sc: SoldeConge = new SoldeConge()
  updateRecord2(form: NgForm) {


    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.daterh = this.date;
    this.congeService.formData.attribut2 = "موافق"
    this.congeService.Edit().subscribe(res => {

      if (this.soldexist) {
        this.sc.idUserCreator = this.per.idUserCreator;
        this.sc.userNameCreator = this.per.userNameCreator;
        this.sc.dateenreg = this.date;
        let solde = +this.soldeconge.number - +this.per.duree
        this.sc.number = solde.toString();
        this.soldeCongeService.AddE(this.sc).subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.CongeList();
        })
      } else {
        this.sc.idUserCreator = this.per.idUserCreator;
        this.sc.userNameCreator = this.per.userNameCreator;
        this.sc.dateenreg = this.date;
        let solde = +this.per.adr - +this.per.duree
        this.sc.number = solde.toString();
        this.soldeCongeService.AddE(this.sc).subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.CongeList();
        })
      }
   
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }

  onSubmit(form: NgForm) {

    if (this.etat == "إعتماد بخصم") {
      this.updateRecord2(form)
    } else {
      this.updateRecord1(form)
    }

  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
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
