import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NewFormation } from '../../shared/Models/ServiceRh/new-formation.model';
import { NewFormationService } from '../../shared/Services/ServiceRh/new-formation.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';


@Component({
  selector: 'app-formation-etab-list',
  templateUrl: './formation-etab-list.component.html',
  styleUrls: ['./formation-etab-list.component.css']
})
export class FormationEtabListComponent implements OnInit {



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

      this.factList = this.GfactList.filter(item => (item.transferera == "1" || item.transferera == "3") && item.etatetab == null)
 
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
    this.fact.etatetab = "موافقة"
    this.fact.dateetab = this.date;
    this.fact.idtetab = this.UserIdConnected;
    this.fact.nomtetab = this.UserNameConnected;
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
    this.fact.etatetab = "رفض"
    this.fact.dateetab = this.date;
    this.fact.idtetab = this.UserIdConnected;
    this.fact.nomtetab = this.UserNameConnected;

    this.formationService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }

}
