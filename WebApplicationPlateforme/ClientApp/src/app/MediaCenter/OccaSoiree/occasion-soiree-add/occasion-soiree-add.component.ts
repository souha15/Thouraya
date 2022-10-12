import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { SoireeOccasionService } from '../../../shared/Services/MediaCenter/OccaSoiree/soiree-occasion.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { OccasionSoiree } from '../../../shared/Models/MediaCenter/OccaSoiree/occasion-soiree.model';
import { NgForm } from '@angular/forms';
import { GuestSoiree } from '../../../shared/Models/MediaCenter/OccaSoiree/guest-soiree.model';
import { GuestSoireeOccasionService } from '../../../shared/Services/MediaCenter/OccaSoiree/guest-soiree-occasion.service';
import { DatePipe } from '@angular/common';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-occasion-soiree-add',
  templateUrl: './occasion-soiree-add.component.html',
  styleUrls: ['./occasion-soiree-add.component.css']
})
export class OccasionSoireeAddComponent implements OnInit {


  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: SoireeOccasionService,
    private signalService: SignalRService,
    private guestService: GuestSoireeOccasionService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.SettingsList();
    const datePipe = new DatePipe('en-Us');

    this.today = new Date().toISOString().slice(0, 16)

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
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      if (res.idDepartement != null) {
        this.idEtab = res.idDepartement;
        this.nomEtab = res.nomDepartement;
      }
    })

  }

  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];

  SettingsList() {
    this.menuSettings.GetOccSoi().subscribe(res => {
      this.settingList = res;
    })

  }

  /** Guest Add*/
  guest: GuestSoiree = new GuestSoiree();
  guestList: GuestSoiree[] = [];
  i: number = 0;
  guestTest: boolean = false;
  add() {
    this.guestTest = true;
    this.guestList[this.i] = this.guest;
    this.guest = new GuestSoiree();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.guestList.splice(this.guestList.indexOf(dp), 1);
    this.i = this.i - 1
    this.guest = new GuestSoiree();
  }


  /** OnSubmit **/

  dem: OccasionSoiree = new OccasionSoiree();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Dem2: OccasionSoiree = new OccasionSoiree();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.dateenreg = this.date;
      this.dem.diretat = "في الانتظار";
      this.dem.idUserCreator = this.UserId;
      this.dem.userNameCreator = this.UserName;
      if (this.idEtab != null) {
        this.dem.etabid = this.idEtab.toString();
        this.dem.etabnom = this.nomEtab;
      }

      this.demService.Create(this.dem).subscribe(res => {
        this.Dem2 = res;
        if (this.guestTest) {

          for (let i = 0; i < this.guestList.length; i++) {
            this.guest = this.guestList[i]
            this.guest.idSoiree = this.Dem2.id;
            this.guestService.Create(this.guest).subscribe(res => {
         
            },
              err => {
                this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
              })
          }
        }
        this.UserService.GetMediaDir().subscribe(resDir => {
          this.dirId = resDir.id;
          this.dirName = resDir.fullName
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "occasion-soiree-list-dir"
          this.autoNotif.userType = "media dir";
          this.autoNotif.reponse = "media";
          this.text = " طلب إقامة المناسبات والحفلات  ";
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
              this.text = "طلب إقامة المناسبات والحفلات ";
            this.autoNotif.vu = "0";
            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.guestList.splice(0, this.guestList.length)
        this.guestTest = false;
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }

  occ: boolean = false;
  getOcc(event) {

    if (event.target.value == "أخرى") {
      this.occ = true;

    } else {
      this.occ = false;

    }
  }



}
