import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-creation-list',
  templateUrl: './creation-list.component.html',
  styleUrls: ['./creation-list.component.css']
})
export class CreationListComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private ctService: CreationTravailDemandeService
    ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
    this.resetForm();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  position:string
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.position = res.position;
    })

  }


  factList: CrationTravailDemande[] = [];
  GfactList: CrationTravailDemande[] = [];

  getCreance() {
    this.ctService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)

    })

  }

  updateRecord(form: NgForm) {

    if (this.ctService.formData.etat == "في الإنتظار") {
      this.ctService.Edit().subscribe(res => {
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

  factId: number
  fact: CrationTravailDemande = new CrationTravailDemande();
  populateForm(facture: CrationTravailDemande) {
    this.ctService.formData = Object.assign({}, facture)
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
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.ctService.formData = {
      id: null,
      username: '',
      titreposte: '',
      selection: '',
      tacheTravail: '',
      competence: '',
      diplome: '',
      datedebut: '',
      iddir: '',
      nomdir: '',
      datedir: '',
      etatdir: '',
      etat: '',
      idrh: '',
      etatrh: '',
      nomrh: '',
      daterh: '',
      datedg: '',
      etatdg: '',
      iddg: '',
      nomdg: '',
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
    if (confirm('Are you sure to delete this record ?')) {
      this.ctService.Delete(Id)
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
