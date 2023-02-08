import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-avance-list-e',
  templateUrl: './avance-list-e.component.html',
  styleUrls: ['./avance-list-e.component.css']
})
export class AvanceListEComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private avanceService: AvanceService) { }

  ngOnInit(): void {
    this.getUserConnected();    
    this.getDep();
    this.resetForm();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factList: Avance[] = [];
  GfactList: Avance[] = [];
  getDep() {
    this.avanceService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)
      this.factList.forEach(item => {
        if (item.userEtat1 == "في الإنتظار") {
          this.etatok = true;
        } else this.etatok = false;
      })
    })
  }


 
  factId: number
  fact: Avance = new Avance();
  etatok: boolean;
  refuse: boolean;
  populateForm(facture: Avance) {
    this.avanceService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

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
  p: Number = 1;
  count: Number = 5;
  factur: Avance = new Avance();

  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;
    if (this.avanceService.formData.userEtat1 == "في الإنتظار") {
      this.avanceService.Edit().subscribe(res => {

        this.toastr.success('تم التحديث بنجاح', 'نجاح')

        this.resetForm();
        this.getDep();
      },
        err => {
          this.toastr.error(' لم يتم التحديث  ', ' فشل');
        }


      )
    } else {
      this.toastr.error(' السلفة  تحت الإجراء  ', ' فشل');
    }
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.avanceService.formData = {
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
      etattrh: '',
      etatetab: '',
      datetrh: '',
      dateetab: '',
      tran1: '',
      tran2: '',
      tran3: '',
      tran4: '',
      tran5: '',
      tran6: '',
      prix: '',
      etatAvance: '',
      detail: '',
      nbMoisDeduire: '',
      mois: '',
      annee: '',
      dateDeduire: '',
      etatC: '',
      idC: '',
      nomC: '',
      dateC: '',
      raisonRefusC: '',
      idD: '',
      etatD: '',
      nomD: '',
      dateD: '',
      raisonRefusD: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
      etat: '',
      userName1: '', userId1: '', userEtat1: '', userDate1: '',
      userName2: '', userId2: '', userEtat2: '', userDate2: '',
      userName3: '', userId3: '', userEtat3: '', userDate3: '',
      userName4: '', userId4: '', userEtat4: '', userDate4: '',
      userName5: '', userId5: '', userEtat5: '', userDate5: '',
      userName6: '', userId6: '', userEtat6: '', userDate6: '',
      userName7: '', userId7: '', userEtat7: '', userDate7: '',
      userName8: '', userId8: '', userEtat8: '', userDate8: '',
    }
  }

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.avanceService.Delete(Id)
        .subscribe(res => {
          this.getDep()
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
