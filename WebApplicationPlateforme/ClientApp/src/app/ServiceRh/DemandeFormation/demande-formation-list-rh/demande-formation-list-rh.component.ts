import { Component, OnInit } from '@angular/core';
import { NewFormation } from '../../../shared/Models/ServiceRh/new-formation.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';

@Component({
  selector: 'app-demande-formation-list-rh',
  templateUrl: './demande-formation-list-rh.component.html',
  styleUrls: ['./demande-formation-list-rh.component.css']
})
export class DemandeFormationListRhComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private formationService: NewFormationService, ) { }

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

  factList: NewFormation[] = [];
  GfactList: NewFormation[] = [];

  getCreance() {
    this.formationService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.etatdir == "موافقة" && item.etatrh == "في الإنتظار")

    })

  }

  //Populate Form 
  factId: number
  fact: NewFormation = new NewFormation();
  populateForm(facture: NewFormation) {
    this.formationService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  date = new Date().toLocaleDateString();
  accept() {
     this.fact.etat = "موافقة"
    this.fact.daterh = this.date;
    this.fact.etatrh = "موافقة"
    this.fact.idrh = this.UserIdConnected;
    this.fact.nomrh = this.UserNameConnected;
    this.formationService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }
  refuse() {
    this.fact.etat = "رفض"
    this.fact.daterh = this.date;
    this.fact.etatrh = "رفض"
    this.fact.idrh = this.UserIdConnected;
    this.fact.nomrh = this.UserNameConnected;

    this.formationService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }
}
