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
  selector: 'app-demande-supp-heure-listcreator',
  templateUrl: './demande-supp-heure-listcreator.component.html',
  styleUrls: ['./demande-supp-heure-listcreator.component.css']
})
export class DemandeSuppHeureListcreatorComponent implements OnInit {


  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService,
    private signalService: SignalRService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();

    this.GetDirFin();
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

  // Handle Notification
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
      console.log(this.users)
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

  //Get Dir Fin Etab
  dirId: string;
  dirName: string;
  GetDirFin() {
    this.UserService.getAdminFinDir().subscribe(res => {
      this.dirId = res.id;
      this.dirName = res.fullName
    })
  }



  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dateTime = new Date();
  autoNotif: AutomaticNotification = new AutomaticNotification();
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
      this.notif.serviceId = 3;
      this.UserService.getAdminFinDir().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
        this.dirId = resDir.id
        this.dirName = resDir.fullName
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

      this.factList = this.GfactList.filter(item => (item.transferera == "2" || item.transferera == "3") && item.etatrh == "في الإنتظار")
    })

  }

  date = new Date().toLocaleDateString();
  accept() {
    this.fact.etatrh = "موافقة"
    this.fact.idtrh = this.UserIdConnected;
    this.fact.nomtrh = this.UserNameConnected;
    this.fact.daterh = this.date;
    this.suppheureService.PutObservableE(this.fact).subscribe(res => {

      this.notifService.Add(this.notif).subscribe(res => {
        this.getCreance();
        this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
        //Send Notification
        this.text = "طلب ساعات إضافية";
        this.autoNotif.serviceId = res.id;
        this.autoNotif.pageUrl = "priv-list-dir"
        this.autoNotif.userType = "2";
        this.autoNotif.reponse = "7";
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
            this.autoNotif.text = "طلب ساعات إضافية";

          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

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
    this.fact.attribut3 = this.date;
    this.fact.etatrh = "رفض"
    this.fact.idtrh = this.UserIdConnected;
    this.fact.nomtrh = this.UserNameConnected;
    this.fact.daterh = this.date;

    this.suppheureService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }
}
