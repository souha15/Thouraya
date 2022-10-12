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
import { SignalRService, connection, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-new-cheque-list-etab-fin',
  templateUrl: './new-cheque-list-etab-fin.component.html',
  styleUrls: ['./new-cheque-list-etab-fin.component.css']
})
export class NewChequeListEtabFinComponent implements OnInit {
  userDetails;

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    private router: Router,
    private toastr: ToastrService,
    private notifService: NotifService,
    private signalService: SignalRService) { }

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

    this.userOnLis();
    this.userOffLis();
    this.logOutLis();
    this.getOnlineUsersLis();
    this.sendMsgLis();
    if (this.signalService.hubConnection.state == 1) this.getOnlineUsersInv();
    else {
      this.signalService.ssSubj.subscribe((obj: any) => {
        if (obj.type == "HubConnStarted") {
          this.getOnlineUsersInv();
        }
      });
    }
  }
  //Handle Notification
  // Hub Configuration
  users: connection[] = [];
  dirId: string;
  dirName: string;
  autoNotif: AutomaticNotification = new AutomaticNotification();
  userOnLis(): void {
    this.signalService.hubConnection.on("userOn", (newUser: connection) => {

      this.users.push(newUser);
    });
  }


  // Get Offline Users

  userOffLis(): void {
    this.signalService.hubConnection.on("userOff", (personId: string) => {
      this.users = this.users.filter(u => u.userId != personId);
    });
  }

  logOutLis(): void {
    this.signalService.hubConnection.on("logoutResponse", () => {
      localStorage.removeItem("userId");
      location.reload();
    });
  }

  //Get Online Users

  getOnlineUsersInv(): void {
    this.signalService.hubConnection.invoke("getOnlineUsers")
      .catch(err => console.error(err));
  }


  getOnlineUsersLis(): void {
    this.signalService.hubConnection.on("getOnlineUsersResponse", (onlineUsers: Array<connection>) => {
      this.users = [...onlineUsers];
    });
  }

  //Send Msg 
  text: string;
  sendMsgInv(): void {

    this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res => {
      this.userOnline = res;
      this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text)
        .catch(err => console.error(err));
    })
  }


  private sendMsgLis(): void {
    this.signalService.hubConnection.on("sendMsgResponse", (connId: string, msg: string, userConSender: string, userConReceiver: string) => {
      let receiver = this.users.find(u => u.signalrId === connId);
    })
  }


  // Get Connected List Users
  getOnlineUsersList(UserIdConnected) {
    this.signalService.GetConnectionList(UserIdConnected).subscribe(res => {
      this.users = res;
    })
  }

  // Test If User Connected
  userOnline: connection = new connection();
  online: boolean;
  TestIfUserConnected(userId): boolean {
    this.signalService.TestIfUserConnected(userId).subscribe(res => {
      this.online = res

    })
    return this.online
  }


  //Dynamic Test of user connected
  userConnected: boolean = false;
  DynamicTestConnected() {
    if (this.users.filter(item => item.userId == this.dirId).length > 0) {
      this.userConnected = true
    }
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
      this.notif.serviceId =3 ;
      this.UserService.getAdminFinDir().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
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
      this.dem6 = this.dem5.filter(item => (item.etatfinacier == "في الإنتظار" && item.etatdirecteur == "معتمدة") || (item.transfert == "1" && item.etatgeneral == "معتمدة"))

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
    this.per.datefinancier = this.date;
    this.per.etatfinacier = this.etat
    this.per.nomfinancier = this.UserNameConnected;
    this.per.idfinancier = this.UserIdConnected;
    this.demandeService.PutObservableE(this.per).subscribe(res => {

        this.UserService.getAdminFinDir().subscribe(resDir => {
          this.dirId = resDir.id
          this.dirName = resDir.fullName
          this.text = "طلب صرف شيك";
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "new-cheque-list-dir-fin"
          this.autoNotif.userType = "2";
          this.autoNotif.reponse = "9";
          this.autoNotif.vu = "0";
          this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dirName;
            this.autoNotif.receiverId = this.dirId;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = "طلب صرف شيك";

            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
          this.notifService.Add(this.notif).subscribe(res => {

        })
        this.toastr.success('تم التحديث بنجاح', 'نجاح');
        this.getUserConnected()
        this.getDemPayList();
      })


    })


  }

}
