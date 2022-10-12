import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';
@Component({
  selector: 'app-demande-supp-heure-list-director',
  templateUrl: './demande-supp-heure-list-director.component.html',
  styleUrls: ['./demande-supp-heure-list-director.component.css']
})
export class DemandeSuppHeureListDirectorComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private signalService: SignalRService,
    private notifService: NotifService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();

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

  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = " تمت الموافقة على طلب ساعات إضافية  من قبل" + ' ' + res.fullName
      this.notif.serviceName = "طلب ساعات إضافية"
      this.notif.readUnread = "0";
      this.notif.serviceId = 6;
      this.UserService.GetRhDepartement().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })

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

      this.factList = this.GfactList.filter(item => item.etatdir == "في الإنتظار" && item.iddir == this.UserIdConnected)

    })

  }

  date = new Date().toLocaleDateString();
  accept() {
    //this.fact.etat = "موافقة"
    this.fact.datedir = this.date;
    this.fact.etatdir = "موافقة"
    this.fact.iddir = this.UserIdConnected;
    this.fact.nomdir = this.UserNameConnected;
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.notifService.Add(this.notif).subscribe(res => {
        this.getCreance();
        this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");

        this.UserService.GetRhDepartement().subscribe(resDir => {
          this.dirId = resDir.id;
          this.dirName = resDir.fullName
          this.autoNotif.serviceId = this.fact.id;
          this.autoNotif.pageUrl = "demande-supp-heure-listcreator"
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "7";
          this.autoNotif.vu = "0";
          this.text = "طلب ساعات الإضافية";
          this.autoNotif.receiverName = this.dirName;
          this.autoNotif.receiverId = this.dirId;
          this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dirName;
            this.autoNotif.receiverId = this.dirId;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.text = "طلب ساعات الإضافية";

            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })
      })

    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }

  refuse() {
    this.fact.etat = "رفض"
    this.fact.datedir = this.date;
    this.fact.etatdir = "رفض"
    this.fact.iddir = this.UserIdConnected;
    this.fact.nomdir = this.UserNameConnected;

    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }
}
