import { Component, OnInit } from '@angular/core';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../../shared/Services/Cheques/article-pay-cheque.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';

@Component({
  selector: 'app-film-edity',
  templateUrl: './film-edity.component.html',
  styleUrls: ['./film-edity.component.css']
})
export class FilmEdityComponent implements OnInit {

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDemPayList();
  }

  // Get User Connected
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }


  //Get Dem pay ListProject
  dem1: DemPayCheque[] = [];
  dem2: DemPayCheque[] = [];

  nbwork: number = 0;
  nbdone: number = 0;
  nbrefused: number = 0;
  getDemPayList() {
    this.demandeService.Get().subscribe(res => {
      this.dem1 = res
      this.dem2 = this.dem1.filter(item => item.etatgeneral == "معتمدة");
      return this.dem2.sort((a, b) => new Date(a.dateEntre).getTime() - new Date(b.dateEntre).getTime())

    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  per: DemPayCheque = new DemPayCheque();
  pay(cg: DemPayCheque) {
    this.per = Object.assign({}, cg);
    this.per.etatgeneral = "تم الصرف";
    this.demandeService.PutObservableE(this.per).subscribe(res => {
      this.toastr.success("تم الصرف")
      this.getDemPayList();
    },
      err => {
        this.toastr.error("لم يتم الصرف")
      })
  }

  notpay(cg: DemPayCheque) {
    this.per = Object.assign({}, cg);
    this.per.etatgeneral = "لم يتم الصرف";
    this.demandeService.PutObservableE(this.per).subscribe(res => {
      this.toastr.success("لم يتم الصرف")
      this.getDemPayList();
    },
      err => {
        this.toastr.error("لم يتم الصرف")
      })
  }
}
