import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeAttestationTravailService } from '../../../shared/Services/ServiceRh/demande-attestation-travail.service';
import { ToastrService } from 'ngx-toastr';
import { DemandeAttestationTravail } from '../../../shared/Models/ServiceRh/demande-attestation-travail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-attestation-travail-lis',
  templateUrl: './attestation-travail-lis.component.html',
  styleUrls: ['./attestation-travail-lis.component.css']
})
export class AttestationTravailLisComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private atService: DemandeAttestationTravailService) { }

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

  factList: DemandeAttestationTravail[] = [];
  GfactList: DemandeAttestationTravail[] = [];

  getCreance() {
    this.atService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)

    })

  }

  //Populate Form 
  factId: number
  fact: DemandeAttestationTravail = new DemandeAttestationTravail();
  populateForm(facture: DemandeAttestationTravail) {
    this.atService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  factur: DemandeAttestationTravail = new DemandeAttestationTravail();
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;

    if (this.atService.formData.etat == "???? ????????????????") { 
    this.atService.Edit().subscribe(res => {
      this.toastr.success('???? ?????????????? ??????????', '????????')
      this.resetForm();
      this.getCreance();
      this.msg = "  ???? ?????????????? ??????????"

      this.succ = true;
      this.failed = false;

    },
      err => {
        this.toastr.error(' ???? ?????? ??????????????  ', ' ??????');
        this.msg = "  ?????? ?????? ??????????????"

        this.failed = true;
        this.succ = false;
      }


    )
  }else{
      this.toastr.error(' ???? ?????? ?????????????? ?????????? ?????? ????????????   ', ' ??????');
      this.msg = "   ???? ?????? ?????????????? ?????????? ?????? ???????????? "

      this.failed = true;
      this.succ = false;
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
  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.atService.formData = {
      id: null,
      langue: '',
      org: '',
      userInfo: '',
      etat: '',
      etatrh: '',
      idrh: '',
      nomrh: '',
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

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.atService.Delete(Id)
        .subscribe(res => {
          this.getCreance();
          this.toastr.success("???? ??????????  ??????????", "????????");
        },

          err => {
            console.log(err);
            this.toastr.warning('???? ?????? ??????????  ', ' ??????');

          }
        )

    }
  }

}
