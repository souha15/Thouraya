import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { CreationTravailDemandeService } from '../../../shared/Services/ServiceRh/creation-travail-demande.service';
import { CrationTravailDemande } from '../../../shared/Models/ServiceRh/cration-travail-demande.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-creation-list-dir',
  templateUrl: './creation-list-dir.component.html',
  styleUrls: ['./creation-list-dir.component.css']
})
export class CreationListDirComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private ctService: CreationTravailDemandeService,
    private notifService: NotifService,
    private signalService: SignalRService
  ) { }

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
  //Handle Notification
  // Hub Configuration
  users: connection[] = [];
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
  dirId: string;
  dirName: string;
  getDirg() {
    this.UserService.GetAdminDirG().subscribe(res => {
      this.dirId = res.id;
      this.dirName = res.fullName;
    })
  }


  UserIdConnected: string;
  UserNameConnected: string;
  position: string
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.position = res.position;
      this.ctService.GetDemand(this.UserIdConnected).subscribe(res => {
        this.creationList = res;
      }
      )
      })

  }


  p: Number = 1;
  count: Number = 5;
  creationList: CrationTravailDemande[] = [];

  GetCreationList() {
    this.ctService.GetDemand(this.UserIdConnected).subscribe(res => {
      this.creationList = res;     
    })

  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  updateRecord(form: NgForm) {
    this.ctService.EditDemandByRole(this.fact.id, this.etat).subscribe(res => {
      this.fact = res;
      this.ctService.PutObservableE(this.fact).subscribe(res2 => {

        if (this.etat == "موافق" && this.fact.etat != 'موافق') {
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "creation-list-dir"
        this.autoNotif.userType = "6";
        this.autoNotif.reponse = "8";
        this.text = "طلب استحداث وظيفة";
          this.signalService.GetConnectionByIdUser(this.fact.iddir).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
          }, err => {
              this.autoNotif.receiverName = this.fact.nomdir;
              this.autoNotif.receiverId = this.fact.iddir;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
          this.autoNotif.text = "طلب استحداث وظيفة";
          this.autoNotif.vu = "0";
          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })


        })
        }

        if (this.fact.etat == "رفض") {
          this.autoNotif.serviceId = this.fact.id;
          this.autoNotif.pageUrl = "creation-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "8";
          this.text = " لقد تم رفض طلب استحداث وظيفة ";
          this.signalService.GetConnectionByIdUser(this.fact.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.fact.userNameCreator;
            this.autoNotif.receiverId = this.fact.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تم رفض طلب استحداث وظيفة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }



        if (this.fact.etat == "موافق") {
          this.autoNotif.serviceId = this.fact.id;
          this.autoNotif.pageUrl = "creation-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "8";
          this.text = " لقد تمت الموافقة على طلب استحداث وظيفة ";
          this.signalService.GetConnectionByIdUser(this.fact.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.fact.userNameCreator;
            this.autoNotif.receiverId = this.fact.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تمت الموافقة على طلب استحداث وظيفة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }

        this.GetCreationList();
        this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })
      })

  }


  factId: number
  fact: CrationTravailDemande = new CrationTravailDemande();
  populateForm(facture: CrationTravailDemande) {
    this.ctService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }
  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }
}
