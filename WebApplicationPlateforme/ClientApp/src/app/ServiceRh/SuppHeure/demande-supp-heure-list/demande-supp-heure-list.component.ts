import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demande-supp-heure-list',
  templateUrl: './demande-supp-heure-list.component.html',
  styleUrls: ['./demande-supp-heure-list.component.css']
})
export class DemandeSuppHeureListComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
    this.resetForm();
  }

  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }


  //editing Facture
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
  //Populate Form 
  factId: number
  fact: DemandeSuppHeure = new DemandeSuppHeure();
  populateForm(facture: DemandeSuppHeure) {
    this.suppheureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  factList: DemandeSuppHeure[] = [];
  GfactList: DemandeSuppHeure[] = [];
  getCreance() {
    this.suppheureService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)
      this.factList.forEach(item => {
        if (item.transferera != null) {

          if (item.transferera == "1") {

            item.attribut3 = item.etatetab

          } else if (item.transferera == "2") {
            item.attribut3 = item.etatrh
          } else {
            if (item.etatrh == "موافقة" && item.etatetab == "موافقة") {
              item.attribut3 = "موافقة"
            } else if (item.etatrh == "رفض" || item.etatetab == "رفض") {
              item.attribut3 = "رفض"
            } else if (item.etatrh == "في الإنتظار" || item.etatetab == null) {
              item.attribut3 = "في الإنتظار"
            }
          }
        }

      })

    })

  }


  updateRecord(form: NgForm) {

    if (this.suppheureService.formData.etatdir == "في الإنتظار") {
      this.suppheureService.Edit().subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.getCreance();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
  }else{
      this.toastr.error(' الطلب تحت الإجراء ', ' فشل');
}
  }

  //Delete Dotation
  onDelete(Id) {

    if (this.suppheureService.formData.etatdir == "في الإنتظار") {
      if (confirm('Are you sure to delete this record ?')) {
        this.suppheureService.Delete(Id)
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
  }
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.suppheureService.formData = {
      id: null,
      transferera: '',
      transfertetab: '',
      transfertrh: '',
      transfertdeux: '',
      datetransfert: '',
      idtrh: '',
      idtetab: '',
      nomtrh: '',
      nomtetab: '',
      etatrh: '',
      etatetab: '',
      daterh: '',
      dateetab: '',
      tran1: '',
      tran2: '',
      tran3: '',
      tran4: '',
      tran5: '',
      tran6: '',
      date: '',
      detail: '',
      nbheure: '',
      username: '',
      idusername: '',
      etat: '',
      etatdir: '',
      datedir: '',
      nomdir: '',
      iddir: '',
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
