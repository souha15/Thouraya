import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { VisiteService } from '../../../shared/Services/MediaCenter/Visite/visite.service';
import { OffreImpressionService } from '../../../shared/Services/MediaCenter/Visite/offre-impression.service';
import { OffreImpression } from '../../../shared/Models/MediaCenter/Visite/offre-impression.model';
import { Visite } from '../../../shared/Models/MediaCenter/Visite/visite.model';
import { NgForm } from '@angular/forms';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-visite-add',
  templateUrl: './visite-add.component.html',
  styleUrls: ['./visite-add.component.css']
})
export class VisiteAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: VisiteService,
    private guestService: OffreImpressionService,
    private signalService: SignalRService) { }

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



  /** Guest Add*/
  guest: OffreImpression = new OffreImpression();
  guestList: OffreImpression[] = [];
  i: number = 0;
  guestTest: boolean = false;
  add() {
    this.guestTest = true;
    this.guestList[this.i] = this.guest;
    this.guest = new OffreImpression();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.guestList.splice(this.guestList.indexOf(dp), 1);
    this.i = this.i - 1
    this.guest = new OffreImpression();
  }


  /** OnSubmit **/

  dem: Visite = new Visite();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Dem2: Visite = new Visite();
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
            this.guest.idvisite = this.Dem2.id;
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
          this.autoNotif.serviceId = this.Dem2.id;
          this.autoNotif.pageUrl = "visite-list-dir"
          this.autoNotif.userType = "6";
          this.autoNotif.reponse = "media";
          this.text = "طلب زيارة";
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
              this.text = "طلب زيارة";
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
