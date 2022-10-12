import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { ResidenceService } from '../../shared/Services/User Services/residence.service';
import { Residence } from '../../shared/Models/User Services/residence.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { SignalRService, connection, AutomaticNotification  } from '../../shared/Services/signalR/signal-r.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-residence-add',
  templateUrl: './residence-add.component.html',
  styleUrls: ['./residence-add.component.css']
})
export class ResidenceAddComponent implements OnInit {

  constructor(private residenceService: ResidenceService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
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
  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  bureau: string;
  frontiere: string
  datefin: string;
  rs: Residence = new Residence();
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.bureau = res.mention;
      this.frontiere = res.paysetude;
      this.datefin = res.unite;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب تجديد إقامة من الموظف  " + res.fullName
      this.notif.serviceName = "طلب تجديد إقامة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 6;

      this.UserService.GetRhDepartement().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })

    })

  }
  autoNotif: AutomaticNotification = new AutomaticNotification();
  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {

      this.isValidFormSubmitted = true
   
    this.rs.datenereg = this.date;
    this.rs.numBureau = this.bureau;
    this.rs.idUserCreator = this.UserIdConnected;
    this.rs.creatorName = this.UserNameConnected;
    this.rs.numfrontiere = this.frontiere;
    this.rs.datefin = this.datefin
    this.rs.etat ="في الانتظار"
    this.rs.etatdir ="في الانتظار"
    this.rs.etatrh = "في الانتظار"
    this.residenceService.Add(this.rs).subscribe(
      res => {
        this.notifService.Add(this.notif).subscribe(res => {

          form.resetForm();
          this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");

          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "residence-list-dir"
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "6";
          this.text = "طلب تجديد الإقامة";
          this.signalService.GetConnectionByIdUser(this.notif.userReceiverId).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dirName;
            this.autoNotif.receiverId = this.dirId;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.text = "طلب تجديد الإقامة";
            this.autoNotif.vu = "0";  

            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })
      },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }
    )
    }
  }
}
