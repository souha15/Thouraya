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
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-cheque-list-dir-directe',
  templateUrl: './new-cheque-list-dir-directe.component.html',
  styleUrls: ['./new-cheque-list-dir-directe.component.css']
})
export class NewChequeListDirDirecteComponent implements OnInit {
  userDetails;

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    private router: Router,
    private toastr: ToastrService,
    private notifService: NotifService,
    private signalService: SignalRService,) { }

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

  // Get Etab Fin List Comptable
  ComptaList: UserDetail[] = [];
  dirId: string;
  dirName: string;
  GetEtabFinList() {
    this.UserService.GetEtabFinList().subscribe(res => {
      this.ComptaList = res;
    })
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



  // Get User Connected
  sexe: string;
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sexe = res.sexe;
      this.demandeService.GetDemand(this.UserIdConnected).subscribe(res => {
        this.dem6 = res;
      }
      )
    })
  }



  //Get Dem pay ListProject
  dem5: DemPayCheque[] = [];
  dem6: DemPayCheque[] = [];
  arlis: ArticlePayCheque[] = [];
  arlis2: ArticlePayCheque[] = [];
  getDemPayList() {
    
    this.demandeService.GetDemand(this.UserIdConnected).subscribe(res => {
      this.dem6 = res;
    }
    )
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
  autoNotif: AutomaticNotification = new AutomaticNotification();
  updateRecord(form: NgForm)  {
    this.demandeService.EditDemandByRole(this.per.id, this.etat).subscribe(res => {
      this.per = res;
    
    this.demandeService.PutObservableE(this.per).subscribe(res => {
      if (this.etat == "موافق" && this.per.etat != 'موافق') {
        this.autoNotif.serviceId = this.per.id;
        this.autoNotif.pageUrl = "new-cheque-list-dir-directe";
        this.autoNotif.userType = "3";
        this.autoNotif.reponse = "19";
        this.text = "طلب صرف شيك"
        this.signalService.GetConnectionByIdUser(this.per.iddir).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.per.nomdir;
          this.autoNotif.receiverId = this.per.iddir;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = "طلب صرف شيك"
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })

      }

      if (this.per.etat == "رفض") {
        this.autoNotif.serviceId = this.per.id;
        this.autoNotif.pageUrl = "pay-chequec-lis"
        this.autoNotif.userType = "0";
        this.autoNotif.reponse = "19";
        this.text = " لقد تم رفض طلب صرف شيك ";
        this.signalService.GetConnectionByIdUser(this.per.idUserCreator).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.per.creatorName;
          this.autoNotif.receiverId = this.per.idUserCreator;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تم رفض طلب صرف شيك";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      }

      if (this.per.etat == "موافق") {
        this.autoNotif.serviceId = this.per.id;
        this.autoNotif.pageUrl = "pay-chequec-lis"
        this.autoNotif.userType = "0";
        this.autoNotif.reponse = "19";
        this.text = " لقد تمت الموافقة على طلب صرف شيك ";
        this.signalService.GetConnectionByIdUser(this.per.idUserCreator).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.per.creatorName;
          this.autoNotif.receiverId = this.per.idUserCreator;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تمت الموافقة على طلب صرف شيك";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      }
      this.toastr.success('تم التحديث بنجاح', 'نجاح');
      this.getUserConnected()
      this.getDemPayList();
      this.msg = "  تم التحديث بنجاح"

      this.succ = true;
      this.failed = false;

    },
    
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');

        this.msg = "  فشل عند التحديث"

        this.failed = true;
        this.succ = false;
      })
      })
   


  }

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

}
