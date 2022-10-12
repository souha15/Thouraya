import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../shared/Services/User Services/demission.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Demissioon } from '../../shared/Models/User Services/demissioon.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { DatePipe } from '@angular/common';
import { SignalRService, connection, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';
@Component({
  selector: 'app-demission-add',
  templateUrl: './demission-add.component.html',
  styleUrls: ['./demission-add.component.css']
})
export class DemissionAddComponent implements OnInit {

  constructor(private demService: DemissionService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService,
    private adminService: AdministrationService,
    private signalService: SignalRService) { }

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


  today;

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dirID: string;
  adminId: number = 28;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب إستقالة  من الموظف  " + res.fullName
      this.notif.serviceName = "طلب إستقالة "
      this.notif.readUnread = "0";
      this.notif.serviceId = 1;
      this.notif.userReceiverId = "32618446-df21-4ca1-b366-f639f41a7a7c";
      this.notif.userReceiverName = "د. محمد بن إبراهيم عوض الصواط ";
    })

  }

  dem: Demissioon = new Demissioon();
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.dem.idUserCreator = this.UserIdConnected;
    this.dem.creatorName = this.UserNameConnected;
    this.dem.datenereg = this.date;
    this.dem.etat = "في الانتظار";
    this.dem.etatdir = "في الانتظار";
    this.dem.etatrh = "في الانتظار";
    this.dem.attribut3 = "في الانتظار";
    this.demService.Add(this.dem).subscribe(
      res => {
        this.UserService.GetAdminDirG().subscribe(resDir => {
          this.dirId = resDir.id;
          this.dirName = resDir.fullName
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "demissio-listdir"
          this.autoNotif.userType = "6";
          this.autoNotif.reponse = "11";
          this.text = "طلب إستقالة";
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
              this.text = "طلب إستقالة";
            this.autoNotif.vu = "0";
            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })
        this.notifService.Add(this.notif).subscribe(res => {

         
        })
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }
        )
  }
}
