import { Component, OnInit } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Equipement } from '../../../shared/Models/RH/equipement.model';
import { NgForm } from '@angular/forms';
import { AdministrationService } from '../../../shared/Services/Administration/administration.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { SignalRService, AutomaticNotification, connection} from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-equipement-add',
  templateUrl: './equipement-add.component.html',
  styleUrls: ['./equipement-add.component.css']
})
export class EquipementAddComponent implements OnInit {

  constructor(private tblService: TbListeningService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private equipementService: EquipementService,
    private adminService: AdministrationService,
    private notifService: NotifService,
    private signalService: SignalRService,) { }

  ngOnInit(): void {
    this.getNomEquipementList();
    this.getTypeEquipementList();
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

  nom: string;
  notif: Notif = new Notif();
  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      if (res.attribut1 != null) {
        this.equ.nomdir = res.directeur;
        this.equ.iddir = res.attribut1;
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
      this.notif.TextNotification = "طلب عهدة من الموظف  " + res.fullName
      this.notif.serviceName = "طلب عهدة"
      this.notif.readUnread = "0";
      this.equ.userNameCreator = res.fullName;
      this.equ.idUserCreator = res.id;
      this.nom = "الأوقاف والخدمات";
      this.adminService.GetAdminData(this.nom).subscribe(resp => {

        this.UserService.GetUserByUserName2(resp.nomDirecteur).subscribe(res => {
          this.equ.attribut3 = res.id;
          this.equ.attribut5 = res.fullName;
        })
      })

    })

  }



  //Type Equipement

  typeEquipement: TbListening[] = [];
  getTypeEquipementList() {
    this.tblService.GetE().subscribe(res => {
      this.typeEquipement = res
    })
  }


  //Type Equipement

  nomEquipement: TbListening[] = [];
  getNomEquipementList() {
    this.tblService.GetN().subscribe(res => {
      this.nomEquipement = res
    })
  }

  //Add Equipement
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  equ: Equipement = new Equipement();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.equ.etatdir = "في الانتظار";
    this.equ.attribut2 = "في الانتظار";
    this.equ.attribut4 = "في الانتظار";
    this.equ.dateenreg = this.date;
    this.equ.date = this.date;
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.equipementService.Add(this.equ).subscribe(
        res => {
          this.notif.serviceId = res.id;
          this.notifService.Add(this.notif).subscribe(res => {

          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            form.resetForm();


            this.text = "طلب عهدة";
            this.autoNotif.serviceId = res.id;
            this.autoNotif.pageUrl = "equipement-list-dir"
            this.autoNotif.userType = "1";
            this.autoNotif.reponse = "3";
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
                this.autoNotif.text = "طلب عهدة";
              this.autoNotif.vu = "0";
              this.autoNotif.reponse = "1";

              this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

              })
            })
          })
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
