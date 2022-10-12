import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Montage } from '../../../shared/Models/MediaCenter/Montage/montage.model';
import { MontageService } from '../../../shared/Services/MediaCenter/Montage/montage.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-montage-add',
  templateUrl: './montage-add.component.html',
  styleUrls: ['./montage-add.component.css']
})
export class MontageAddComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private signalService: SignalRService,
    private demService: MontageService) { }

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
  dirId: string;
  dirName: string;
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



  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number =null;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      if (this.idEtab != null) {
        this.idEtab = res.idDepartement;
      
        this.nomEtab = res.nomDepartement;
      }
    })

  }


  /** OnSubmit **/

  dem: Montage = new Montage();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.dateenreg = this.date;
      this.dem.etat = "في الانتظار";
      this.dem.idUserCreator = this.UserId;
      this.dem.userNameCreator = this.UserName;
      if (this.idEtab != null) {
      this.dem.etabid = this.idEtab.toString();
        this.dem.etabnom = this.nomEtab;
      }
      this.demService.Create(this.dem).subscribe(res => {
        this.UserService.GetMediaDir().subscribe(resDir => {
          this.dirId = resDir.id;
          this.dirName = resDir.fullName
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "montage-list-dir"
          this.autoNotif.userType = "media dir";
          this.autoNotif.reponse = "media";
          this.text = "طلب مونتاج ";
          this.autoNotif.receiverName = this.dirName;
          this.autoNotif.receiverId = this.dirId;
          this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dirName;
            this.autoNotif.receiverId = this.dirId;
            this.autoNotif.transmitterId = this.UserId;
            this.autoNotif.transmitterName = this.UserName;
              this.text = "طلب مونتاج ";
            this.autoNotif.vu = "0";
            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
