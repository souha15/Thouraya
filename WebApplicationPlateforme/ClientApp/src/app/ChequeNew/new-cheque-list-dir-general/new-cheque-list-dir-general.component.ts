import { Component, OnInit } from '@angular/core';
import { DemPayChequeService } from '../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../shared/Services/Cheques/article-pay-cheque.service';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { ListeningProjetService } from '../../shared/Services/Projets/listening-projet.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DemPayCheque } from '../../shared/Models/Cheques/dem-pay-cheque.model';
import { ArticlePayCheque } from '../../shared/Models/Cheques/article-pay-cheque.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';

@Component({
  selector: 'app-new-cheque-list-dir-general',
  templateUrl: './new-cheque-list-dir-general.component.html',
  styleUrls: ['./new-cheque-list-dir-general.component.css']
})
export class NewChequeListDirGeneralComponent implements OnInit {

  userDetails;

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    private router: Router,
    private toastr: ToastrService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    //this.getVoiture();
    this.getUserConnected();
    this.UserService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;


      },
      err => {
        console.log(err);
      },
    );
    this.getUserConnected();
    this.getDemPayList();
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login-page');
  }


  // Get User Connected
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;

  notif: Notif = new Notif();
  dateTime = new Date();


  // Get User Connected
  sexe: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sexe = res.sexe;

      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب صرف شيك من الموظف  " + res.fullName
      this.notif.serviceName = "طلب صرف شيك"
      this.notif.readUnread = "0";
      this.notif.serviceId =7 ;

      this.notif.userReceiverId = "cbfb9ae0-4fcf-4307-8055-819fa639bbee";
      this.notif.userReceiverName = "ماجد عائض عوض الخالدي";
  

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
      this.dem6 = this.dem5.filter(item => item.etatadmin == "في الإنتظار" && item.etatparfinancier == "معتمدة")

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
    if (this.etat == "مرفوضة") { this.per.etatgeneral == "مرفوضة" }
    this.per.dateadmin = this.date;
    this.per.etatadmin = this.etat
    this.per.nomadmin = this.UserNameConnected;
    this.per.idadmin = this.UserIdConnected;
    this.demandeService.PutObservableE(this.per).subscribe(res => {
      this.notifService.Add(this.notif).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح');
        this.getUserConnected()
        this.getDemPayList();
      })


    })


  }

}
