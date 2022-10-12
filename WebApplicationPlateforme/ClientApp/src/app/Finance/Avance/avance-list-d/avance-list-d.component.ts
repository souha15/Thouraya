import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { AvanceService } from '../../../shared/Services/Finance/avance.service';
import { Avance } from '../../../shared/Models/Finance/avance.model';
import { NgForm } from '@angular/forms';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-avance-list-d',
  templateUrl: './avance-list-d.component.html',
  styleUrls: ['./avance-list-d.component.css']
})
export class AvanceListDComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private avanceService: AvanceService,
    private notifService: NotifService,
    private signalService: SignalRService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDep();

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


  p: Number = 1;
  count: Number = 5;
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
      this.notif.TextNotification = " تمت الموافقة على طلب سلفة  من قبل" + ' ' + res.fullName
      this.notif.serviceName = "طلب سلفة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 5;
      this.UserService.GetEtabFin().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })

    })
  }

  factList: Avance[] = [];
  GfactList: Avance[] = [];
  getDep() {
    this.avanceService.Get().subscribe(res => {
      this.GfactList = res;
      this.factList = this.GfactList.filter(item => item.etatD == "في الإنتظار")
    })
  }

  factId: number
  fact: Avance = new Avance();
  etatok: boolean;
  populateForm(facture: Avance) {
    this.avanceService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

  }

  raisonRefus: string;
  raison(event) {
    this.raisonRefus = event.target.value;
  }

  date = new Date().toLocaleDateString();
  autoNotif: AutomaticNotification = new AutomaticNotification();
  accept() {
    //this.fact.attribut2 = "موافقة"
    this.fact.etatD = "موافقة"
    this.fact.dateD = this.date;
    this.fact.idD = this.UserIdConnected
    this.fact.idC = this.UserNameConnected;


    this.fact.idD = this.UserIdConnected;
    this.fact.nomD = this.UserNameConnected;
    this.avanceService.PutObservableE(this.fact).subscribe(res => {

      this.UserService.GetEtabFinList().subscribe(res => {
        this.ComptaList = res
        let rand = Math.floor(Math.random() * (1 - 0 + 1) + 0);
        this.dirId = this.ComptaList[rand].id
        this.dirName = this.ComptaList[rand].fullName
        //Send Notification
        this.text = "طلب سلفة"
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "avance-list-c"
        this.autoNotif.userType = "5";
        this.autoNotif.reponse = "10";
        this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.dirName;
          this.autoNotif.receiverId = this.dirId;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.text = "طلب  سلفة"
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      })
      this.notifService.Add(this.notif).subscribe(res => {

      })

      this.getDep();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");

    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }
  refuse() {


    if (this.raisonRefus != null) {
      this.fact.raisonRefusD = this.raisonRefus;
      this.fact.attribut2 = "رفض"
      this.fact.etatD = "رفض"
      this.fact.dateD = this.date;
      this.fact.idD = this.UserIdConnected
      this.fact.idC = this.UserNameConnected;


      this.avanceService.PutObservableE(this.fact).subscribe(res => {
        this.getDep();
        this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
      },
        err => {
          this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
        })
    } else {
      this.toastr.error('اكتب سبب الرفض ', ' فشل');
    }
  }

}

