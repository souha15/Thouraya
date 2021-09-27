import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeureService } from '../../shared/Services/ServiceRh/demande-supp-heure.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { DemandeSuppHeure } from '../../shared/Models/ServiceRh/demande-supp-heure.model';

@Component({
  selector: 'app-sup-heure-etab-list',
  templateUrl: './sup-heure-etab-list.component.html',
  styleUrls: ['./sup-heure-etab-list.component.css']
})
export class SupHeureEtabListComponent implements OnInit {


  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService, ) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();

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

      this.factList = this.GfactList.filter(item => (item.transferera == "1" || item.transferera == "3") && item.etatetab == null)

    })

  }

  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etatetab = "موافقة"
    this.fact.idtetab = this.UserIdConnected;
    this.fact.nomtetab = this.UserNameConnected;
    this.fact.dateetab = this.date
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }

  refuse() {
    this.fact.etatetab = "رفض"
    this.fact.attribut2 = "رفض"
    this.fact.idtetab = this.UserIdConnected;
    this.fact.nomtetab = this.UserNameConnected;
    this.fact.dateetab = this.date

    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }
}
