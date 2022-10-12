import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { DatePipe } from '@angular/common';
import { SignalRService, AutomaticNotification, connection } from '../../../shared/Services/signalR/signal-r.service';
@Component({
  selector: 'app-demande-supp-heure-add',
  templateUrl: './demande-supp-heure-add.component.html',
  styleUrls: ['./demande-supp-heure-add.component.css']
})
export class DemandeSuppHeureAddComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService,
    private signalService: SignalRService,) { }

  ngOnInit(): void {
    this.getUserConnected();
    const datePipe = new DatePipe('en-Us');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');

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
  today;

  users: connection[] = [];
  dirId: string;
  dirName: string;
  autoNotif: AutomaticNotification = new AutomaticNotification();

  // Hub Configuration

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


  // Get User Connected


  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sup.idUserCreator = res.id;
      this.sup.userNameCreator = res.fullName;
      if (res.attribut1 != null) {
        this.sup.iddir = res.attribut1;
        this.sup.nomdir = res.directeur;
        this.notif.userReceiverId = res.attribut1;
        this.notif.userReceiverName = res.directeur;
        this.dirId = res.attribut1;
        this.dirName = res.directeur
      }
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب ساعات إضافية من الموظف  " + res.fullName
      this.notif.serviceName = "طلب ساعات إضافية"
      this.notif.readUnread = "0";


    })

  }

  sup: DemandeSuppHeure = new DemandeSuppHeure();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.sup.dateenreg = this.date;
      this.sup.etat = "في الإنتظار";
      this.sup.etatdir = "في الإنتظار";
      this.sup.attribut2 = "في الإنتظار";
      this.sup.attribut3 = "في الإنتظار";
      this.suppheureService.Add(this.sup).subscribe(res => {
        this.notif.serviceId = res.id;
        this.notifService.Add(this.notif).subscribe(res => {
        
        form.resetForm();
          this.toastr.success("تم تسجيل  الطلب بنجاح", " تسجيل ");

          this.text = "طلب ساعات إضافية";
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "menurequests"
          this.autoNotif.userType = "1";
          this.autoNotif.reponse = "7";
          //if (this.users.filter(item => item.userId == this.dirId).length > 0) {
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
            this.autoNotif.vu = "0";
            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })

        })
      },
        err => {
          this.toastr.error("فشل تسجيل  الطلب", " تسجيل ")
        }
      )
    }
  }
}
