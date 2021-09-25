import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-priv-list-dir',
  templateUrl: './priv-list-dir.component.html',
  styleUrls: ['./priv-list-dir.component.css']
})
export class PrivListDirComponent implements OnInit {


  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService, ) { }

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

      this.factList = this.GfactList.filter(item => item.attribut3 == "في الإنتظار" && item.attribut2 == "موافقة")

    })

  }

  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etat = "موافقة"
    this.fact.attribut6 = this.date;
    this.fact.attribut3 = "موافقة"
    this.fact.attribut4 = this.UserIdConnected;
    this.fact.attribut5 = this.UserNameConnected;
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }

  refuse() {
    this.fact.etat = "رفض"
    this.fact.attribut6 = this.date;
    this.fact.attribut3 = "رفض"
    this.fact.attribut4 = this.UserIdConnected;
    this.fact.attribut5 = this.UserNameConnected;

    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }

}
