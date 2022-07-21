import { Component, OnInit } from '@angular/core';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../../shared/Services/Cheques/article-pay-cheque.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';
import { ArticlePayCheque } from '../../../shared/Models/Cheques/article-pay-cheque.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cheque-pay-list-accept',
  templateUrl: './cheque-pay-list-accept.component.html',
  styleUrls: ['./cheque-pay-list-accept.component.css']
})
export class ChequePayListAcceptComponent implements OnInit {
  userDetails;
  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.UserService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;


      },
      err => {
        console.log(err);
      },
    );
    this.getDemPayList();
  }

  // Get User Connected
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;

  // Get User Connected
  privtestaddTask: boolean = false;
  privtestfinance: boolean = false;
  privtesttransaction: boolean = false;
  privtestTasks: boolean = false;
  sexe: string;
  roleslist: any = [];
  testrole: boolean = false;
  testroledir: boolean = false;
  testroleadmin: boolean = false;
  dem1: DemPayCheque[] = [];
  demg1: DemPayCheque[] = [];
  demg2: DemPayCheque[] = [];
  dem2: DemPayCheque[] = [];
  dem3: DemPayCheque[] = [];
  dem4: DemPayCheque[] = [];
  nbr: number = 0;
  nbd: number = 0;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sexe = res.sexe;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "RESPFINANCE") {
            this.testrole = true;
          } else { this.testrole = false; }
          if (item == "DIRECTORG") {
            this.testroledir = true;
          } else {
            this.testroledir = false;
          }

          if (item == "ADMINISTRATEUR") {
            this.testroleadmin = true;
          } else {
            this.testroleadmin = false;
          }

          this.demandeService.Get().subscribe(res => {
            this.dem1 = res
            if (this.testrole == true) {
              this.dem3 = this.dem2.filter(item => item.idparfinancier != this.UserIdConnected && item.idfinancier != this.UserIdConnected && item.idpart != this.UserIdConnected)
              this.demg1 = this.dem2.filter(item => +item.etatnum < 3);
              this.demg2 = this.dem1.filter(item => item.attribut5 == this.UserIdConnected /*&& item.attribut3 == "editer"*/);

              this.nbr = this.demg1.length + this.demg2.length

            }

            if (this.testroledir == true) {
              this.dem4 = this.dem1.filter(item => item.etatgeneral == "موافقة" && +item.etatnum == 3);
              this.nbd = this.dem4.length;
            }


          })
        })

      })
    })
  }


  //Get Dem pay ListProject
  dem5: DemPayCheque[] = [];
  dem6: DemPayCheque[] = [];
  arlis: ArticlePayCheque[] = [];
  arlis2: ArticlePayCheque[] = [];
  getDemPayList() {
    this.demandeService.Get().subscribe(res => {
      this.dem5 = res
      this.dem6 = this.dem5.filter(item => item.etatadmin == "في الإنتظار" && item.etatfinacier == "معتمدة")

    })
  }


  //PopulateForm
  per: DemPayCheque = new DemPayCheque();


  populateForm(conge: DemPayCheque) {
    this.per = Object.assign({}, conge)
    this.articleService.Get().subscribe(res => {
      this.arlis2 = res;
      this.arlis = this.arlis2.filter(item => item.idDem == this.per.id)
    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  accept() {
    //if (this.per.etatdirecteur == "معتمدة" && this.per.idadmin == null) {
   
    this.per.dateadmin = this.date;
    this.per.etatadmin = this.etat;
    this.per.nomadmin = this.UserNameConnected;
    this.per.idadmin = this.UserIdConnected;
    this.per.etatgeneral = this.etat
     this.demandeService.PutObservableE(this.per).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح');
        this.getDemPayList();
        this.getUserConnected();
      })
   
  }
}
