import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';
import { NewFormation } from '../../../shared/Models/ServiceRh/new-formation.model';
import { NgForm } from '@angular/forms';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { DemandeFormationService } from '../../../shared/Services/ServiceRh/demande-formation.service';
import { DemandeFormation } from '../../../shared/Models/ServiceRh/demande-formation.model';

@Component({
  selector: 'app-new-formation-request-list',
  templateUrl: './new-formation-request-list.component.html',
  styleUrls: ['./new-formation-request-list.component.css']
})
export class NewFormationRequestListComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private atService: NewFormationService,
    private specialiteService: TbListeningService,
    private atforService: DemandeFormationService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
    this.resetForm();
    this.GetSpecList();
    this.resetForm1();
  }


  // Get Specilite List

  SpecList: TbListening[] = [];

  GetSpecList() {
    this.specialiteService.Get().subscribe(res => {
      this.SpecList = res
    })
  }


  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  factList: NewFormation[] = [];
  GfactList: NewFormation[] = [];
  factList1: DemandeFormation[] = [];
  GfactList1: DemandeFormation[] = [];
 

  getCreance() {
    this.atService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected && item.attribut2 == "غير منجزة")

    })

    this.atforService.Get().subscribe(res => {
      this.GfactList1 = res;

      this.factList1 = this.GfactList1.filter(item => item.idUserCreator == this.UserIdConnected && item.attribut2 == "غير منجزة")
    })

  }

  //Populate Form 
  factId: number
  fact: NewFormation = new NewFormation();
  etatok: boolean;
  populateForm(facture: NewFormation) {
    this.atService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    if (this.fact.etat == "في الإنتظار") {
      this.etatok = false;
    } else
      this.etatok = true
  }

  fact1: DemandeFormation = new DemandeFormation();
  populateForm1(facture: DemandeFormation) {
    this.atforService.formData = Object.assign({}, facture)
    this.fact1 = Object.assign({}, facture);
    if (this.fact1.etat == "في الإنتظار") {
      this.etatok = false;
    } else
      this.etatok = true
  }

  done1() {
    if (this.fact1.etat == "موافقة") {
      this.fact1.attribut2 = "منجزة"

      this.atforService.PutObservableE(this.fact1).subscribe(res => {
        this.getCreance();
        this.toastr.success('تم التحديث بنجاح', 'نجاح')

      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        })
    } else {
      this.toastr.error('لم يتم الموافقة على الطلب بعد ', ' فشل');
    }
  }

  done() {
    if (this.fact.etat == "موافقة") {
    this.fact.attribut2 = "منجزة"
    this.atService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success('تم التحديث بنجاح', 'نجاح')

    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })
    } else {
      this.toastr.error('لم يتم الموافقة على الطلب بعد ', ' فشل');
    }
  }
  updateRecord(form: NgForm) {

    if (this.atService.formData.etat == "في الإنتظار") {
      this.atService.Edit().subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.getCreance();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
    } else {
      this.toastr.error(' لم يتم التحديث الطلب تحت الإجرء   ', ' فشل');
    }
  }

  updateRecord1(formP: NgForm) {
    console.log(this.atforService.formData.etat)
    if (this.atforService.formData.etat == "في الإنتظار") {
      this.atforService.Edit().subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm1();
        this.getCreance();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
    } else {
      this.toastr.error(' لم يتم التحديث الطلب تحت الإجرء   ', ' فشل');
    }
  }
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }

  onSubmit1(formP: NgForm) {
    if (formP.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord1(formP)
    }
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.atService.formData = {
      id: null,
      titre: '',
      specialite: '',
      autreSpec: '',
      org: '',
      duree: '',
      prix: '',
      lien: '',
      detail: '',
      etat: '',
      etatdir: '',
      iddir: '',
      nomdir: '',
      datedir: '',
      etatrh: '',
      idrh: '',
      nomrh: '',
      daterh: '',
      etatc: '',
      idc: '',
      nomc: '',
      datec: '',
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

  resetForm1(formP?: NgForm) {

    if (formP != null)
      formP.resetForm();
    this.atforService.formData = {
      id: null,
      titre: '',
      specialite: '',
      autreSpec: '',
      org: '',
      duree: '',
      prix: '',
      lien: '',
      detail: '',
      etat: '',
      etatdir: '',
      iddir: '',
      nomdir: '',
      datedir: '',
      etatrh: '',
      idrh: '',
      nomrh: '',
      daterh: '',
      etatc: '',
      idc: '',
      nomc: '',
      datec: '',
      idFormation: null,
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

  onDelete(Id) {
    if (this.atService.formData.etat == "في الإنتظار") {
      if (confirm('Are you sure to delete this record ?')) {
        this.atService.Delete(Id)
          .subscribe(res => {
            this.getCreance();
            this.toastr.success("تم الحذف  بنجاح", "نجاح");
          },

            err => {
              console.log(err);
              this.toastr.warning('لم يتم الحذف  ', ' فشل');

            }
          )

      }
    }
    else {
      this.toastr.error(' لم يتم التحديث الطلب تحت الإجرء   ', ' فشل');
    }
  }

  onDelete1(Id) {
    if (this.atforService.formData.etat == "في الإنتظار") {
    if (confirm('Are you sure to delete this record ?')) {
      this.atforService.Delete(Id)
        .subscribe(res => {
          this.getCreance();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }else {
  this.toastr.error(' لم يتم التحديث الطلب تحت الإجرء   ', ' فشل');
}
  }
}
