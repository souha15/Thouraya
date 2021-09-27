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
  selector: 'app-validate-conge',
  templateUrl: './validate-conge.component.html',
  styleUrls: ['./validate-conge.component.css']
})
export class ValidateCongeComponent implements OnInit {
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
      this.filtredCongeList = this.congeList.filter(item => item.etatd == "موافق" && item.attribut6 == "في الانتظار" && item.transferera == null)
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
  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.solde = this.per.adr
    this.congeService.formData = Object.assign({}, conge)

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
        console.log(this.sc)
      })
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
    this.congeService.formData.attribut5 = this.date;
    this.congeService.formData.attribut3 = this.UserIdConnected;
    this.congeService.formData.attribut4 = this.UserNameConnected;
    if (this.etat == "رفض") {
      this.congeService.formData.attribut6 = "رفض"
    } else {


      this.congeService.formData.attribut6 = "إعتماد بغير خصم"
      this.congeService.formData.etat = "70%";
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
    this.congeService.formData.attribut5 = this.date;
    this.congeService.formData.attribut6 = "إعتماد بخصم"
    this.congeService.formData.etat = "70%";
    this.congeService.formData.attribut3 = this.UserIdConnected;
    this.congeService.formData.attribut4 = this.UserNameConnected;
    this.congeService.Edit().subscribe(res => {

      if (this.per.type == "إجازة سنوية") {
        this.sc.dateenreg = this.date;

        let solde = +this.soldeconge.soldenormal - +this.per.duree
        this.sc.soldenormal = solde.toString();

        this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.CongeList();
        })

      }
      if (this.per.type == "إجازة إضطرارية") {

        this.sc.dateenreg = this.date;
        let solde = +this.soldeconge.soldeurgent - +this.per.duree
        this.sc.soldeurgent = solde.toString();
        this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.CongeList();
        })

      }

      if (this.per.type == "إجازة إستثنائية") {

        this.sc.dateenreg = this.date;
        let solde = +this.soldeconge.soldemaladie - +this.per.duree
        this.sc.soldemaladie = solde.toString();
        this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
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

  transfererA: string;
  transfertData(event) {
    this.transfererA = event.target.value;
  }

  transferer() {
    this.per.transferera = this.transfererA;
    this.congeService.PutObservableE(this.per).subscribe(res => {
      this.toastr.success("تم  تحويل  الطلب بنجاح", "نجاح");
      this.CongeList();
    },
      err => {
        this.toastr.warning('لم يتم  تحويل  الطلب بنجاح', ' فشل');
      })
  }
}

