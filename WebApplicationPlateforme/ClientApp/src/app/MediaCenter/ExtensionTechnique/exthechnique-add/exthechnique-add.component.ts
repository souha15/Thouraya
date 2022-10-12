import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Exthechnique } from '../../../shared/Models/MediaCenter/ExtensionTechnique/exthechnique.model';
import { NgForm } from '@angular/forms';
import { ExthechniqueService } from '../../../shared/Services/MediaCenter/ExtensionTechnique/exthechnique.service';
import { DatePipe } from '@angular/common';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-exthechnique-add',
  templateUrl: './exthechnique-add.component.html',
  styleUrls: ['./exthechnique-add.component.css']
})
export class ExthechniqueAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private exthService: ExthechniqueService,
    private signalService: SignalRService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.typeExthechniqueList();
    const datePipe = new DatePipe('en-Us');
    this.today = new Date().toISOString().slice(0, 16)
      //datePipe.transform(new Date(), 'yyyy-MM-dd hh:mm');
    console.log(this.today)

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

  today;

   /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number = null;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;

      if (res.idDepartement != null) {
      this.idEtab = res.idDepartement;
        this.nomEtab = res.nomDepartement; 1
      }
    })

  }

  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];

  typeExthechniqueList() {
    this.menuSettings.GetTypeExthechnique().subscribe(res => {
      this.settingList = res;
    })
  }

  /** OnSubmit **/

  exth: Exthechnique = new Exthechnique();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.exth.dateenreg = this.date;
      this.exth.diretat = "في الانتظار";
      this.exth.idUserCreator = this.UserId;
      this.exth.userNameCreator = this.UserName;
      if (this.idEtab != null) {
      this.exth.etabid = this.idEtab.toString();
        this.exth.etabnom = this.nomEtab;
      }
      this.exthService.CreateExthechnique(this.exth).subscribe(res => {
        this.UserService.GetMediaDir().subscribe(resDir => {
          this.dirId = resDir.id;
          this.dirName = resDir.fullName
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "exthechnique-list-dir"
          this.autoNotif.userType = "media dir";
          this.autoNotif.reponse = "media";
          this.text = "طلب تمديدات فنية ";
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
              this.text = "طلب تمديدات فنية ";
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
