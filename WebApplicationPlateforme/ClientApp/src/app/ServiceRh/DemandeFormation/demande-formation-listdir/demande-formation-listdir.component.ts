import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';
import { NewFormation } from '../../../shared/Models/ServiceRh/new-formation.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { connection, SignalRService, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-demande-formation-listdir',
  templateUrl: './demande-formation-listdir.component.html',
  styleUrls: ['./demande-formation-listdir.component.css']
})
export class DemandeFormationListdirComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private formationService: NewFormationService,
    private notifService: NotifService,
    private signalService: SignalRService) { }

  ngOnInit(): void {
    this.getUserConnected();
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

  p: Number = 1;
  count: Number = 5;

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
  text: string = "طلب إجازة إستثنائية";
  sendMsgInv(): void {

    this.signalService.GetConnectionByIdUser(this.fact.iddir).subscribe(res => {
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
    if (this.users.filter(item => item.userId == this.fact.iddir).length > 0) {
      this.userConnected = true
    }
  }


  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.formationService.GetFormationDemand(this.UserIdConnected).subscribe(res => {
        this.formationList = res
      })

    })

  }

  formationList: NewFormation[] = [];


  getFormationList() {
    this.formationService.GetFormationDemand(this.UserIdConnected).subscribe(res => {
      this.formationList = res
    })

  }

  //Populate Form 
  factId: number
  fact: NewFormation = new NewFormation();
  populateForm(facture: NewFormation) {
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  autoNotif: AutomaticNotification = new AutomaticNotification();
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  updateRecord(form: NgForm) {
    this.formationService.EditDemandByRole(this.fact.id, this.etat).subscribe(res3 => {
      this.fact = res3
   
    this.formationService.PutObservableE(this.fact).subscribe(res => {
      if (this.etat == "موافق" && this.fact.etat != 'موافق') {
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "demande-formation-listdir"
        this.autoNotif.userType = "3";
        this.autoNotif.reponse = "2";
        this.text = "طلب دورة تدريبية";
        this.signalService.GetConnectionByIdUser(this.fact.iddir).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.fact.nomdir;
          this.autoNotif.receiverId = this.fact.iddir;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = "طلب دورة تدريبية"
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      } if (this.fact.etat == "رفض") {
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "new-formation-request-list"
        this.autoNotif.userType = "0";
        this.autoNotif.reponse = "2";
        this.text = " لقد تم رفض طلب دورة تدريبية ";
        this.signalService.GetConnectionByIdUser(this.fact.idUserCreator).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
            this.autoNotif.receiverName = this.fact.userNameCreator;
          this.autoNotif.receiverId = this.fact.idUserCreator;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تم رفض طلب دورة تدريبية";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      } if (this.fact.etat == "موافق") {
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "new-formation-request-list"
        this.autoNotif.userType = "0";
        this.autoNotif.reponse = "2";
        this.text = " لقد تمت الموافقة على طلب دورة تدريبية ";
        this.signalService.GetConnectionByIdUser(this.fact.idUserCreator).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.fact.userNameCreator;
          this.autoNotif.receiverId = this.fact.idUserCreator;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تمت الموافقة على طلب دورة تدريبية";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      }
      this.getFormationList();
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
    })
  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }
}
