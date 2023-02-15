import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeAttestationTravailService } from '../../../shared/Services/ServiceRh/demande-attestation-travail.service';
import { ToastrService } from 'ngx-toastr';
import { DemandeAttestationTravail } from '../../../shared/Models/ServiceRh/demande-attestation-travail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-attestation-travail-rh-list',
  templateUrl: './attestation-travail-rh-list.component.html',
  styleUrls: ['./attestation-travail-rh-list.component.css']
})
export class AttestationTravailRhListComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private atService: DemandeAttestationTravailService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
  }

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
      this.factList = this.GfactList.filter(item => item.etat == "في الإنتظار")

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
  reason: string;
  getRefuseRaison(event) {
    this.reason = event.target.value;
  }
  date = new Date().toLocaleDateString();
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  accept() {
    this.fact.etat = "موافقة"
    this.fact.daterh = this.date;
    this.fact.etatrh ="موافقة"
    this.fact.idrh = this.UserIdConnected;
    this.fact.nomrh = this.UserNameConnected;
    this.atService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
      this.msg = "تم  قبول الطلب بنجاح"
      this.succ = true;
      this.failed = false;
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
        this.failed = true;
        this.succ = false;
        this.msg = "لم يتم  قبول الطلب"
      })

  }
  refuse() {
    this.fact.etat = "رفض"
    this.fact.daterh = this.date;
    this.fact.etatrh = "رفض"
    this.fact.idrh = this.UserIdConnected;
    this.fact.nomrh = this.UserNameConnected;
    this.fact.attribut6 = this.reason

    this.atService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
      this.succ = true;
      this.failed = false;
      this.msg = "تم  رفض الطلب بنجاح"

      },
        err => {
          this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
          this.msg = "لم يتم رفض الطلب "
          this.failed = true;
          this.succ = false;
        })
    }
  p: Number = 1;

  count: Number = 5;
}
