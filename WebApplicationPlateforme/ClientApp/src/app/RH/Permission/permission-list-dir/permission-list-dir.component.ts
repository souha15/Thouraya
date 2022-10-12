import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../../shared/Services/Rh/conge.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-permission-list-dir',
  templateUrl: './permission-list-dir.component.html',
  styleUrls: ['./permission-list-dir.component.css']
})
export class PermissionUListDirComponent implements OnInit {

  filter;
  constructor(private congeService: PermissionUService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService,
    private signalService: SignalRService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
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

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = " تمت الموافقة على طلب إذن  من قبل" + ' ' + res.fullName
      this.notif.serviceName = "طلب إذن"
      this.notif.readUnread = "0";
      this.notif.serviceId = 6;
      this.UserService.GetRhDepartement().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })
    })

  }

  congeList: PermissionU[] = [];
  filtredCongeList: PermissionU[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.etatdir == "في الانتظار" && item.iddir == this.UserIdConnected)
    })
  }
  per: PermissionU = new PermissionU();

  populateForm(conge: PermissionU) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();
  conge: PermissionU = new PermissionU();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.datedir = this.date;
    this.congeService.formData.iddir = this.UserIdConnected;
    this.congeService.formData.nomdir = this.UserNameConnected;
    this.congeService.Edit().subscribe(res => {
      if (this.etat == "موافق") {
        this.autoNotif.serviceId = this.per.id;
        this.autoNotif.pageUrl = "rh-conge-list"
        this.autoNotif.userType = "3";
        this.autoNotif.reponse = "2";
        this.text = " طلب اذن ";
        this.signalService.GetConnectionByIdUser(this.notif.userReceiverId).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.dirName;
          this.autoNotif.receiverId = this.dirId;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.text =  " طلب اذن ";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      }
      this.notifService.Add(this.notif).subscribe(res => {
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.CongeList();
      })
   
      },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        }


      )
    
  }
  autoNotif: AutomaticNotification = new AutomaticNotification();
  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      date: '',
      type: '',
      autre: '',
      heuredeb: '',
      heurefin: '',
      raison: '',
      etat: '',
      etatdir: '',
      etatrh: '',
      iddir: '',
      idrh: '',
      nomrh: '',
      nomdir: '',
      datedir: '',
      daterh: '',
      creatorName: '',
      datenereg: '',
      attibut1: '',
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      idUserCreator: '',

    }
  }
}
