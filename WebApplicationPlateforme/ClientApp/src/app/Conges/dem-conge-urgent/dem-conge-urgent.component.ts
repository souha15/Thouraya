import { Component, OnInit } from '@angular/core';
import { CongeService } from '../../shared/Services/Rh/conge.service';
import { SoldeCongeService } from '../../shared/Services/Rh/solde-conge.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SoldeConge } from '../../shared/Models/RH/solde-conge.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Conge } from '../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { DatePipe } from '@angular/common';
import { SignalRService, AutomaticNotification, connection } from '../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-dem-conge-urgent',
  templateUrl: './dem-conge-urgent.component.html',
  styleUrls: ['./dem-conge-urgent.component.css']
})
export class DemCongeUrgentComponent implements OnInit {


  constructor(private congeService: CongeService,
    private soldeCongeService: SoldeCongeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private signalService: SignalRService,
    private notifService: NotifService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.UserList();
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
  adminisgtrationName: any;
  nbdays: number = 0;
  soldedays: number = 0;
  dateEnreg: string;
  soldeconge: number = 0;
  datecontrat: string;
  userc: UserDetail = new UserDetail();
  soldeconges: SoldeConge = new SoldeConge();
  notif: Notif = new Notif();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      if (res.attribut1 != null) {
        this.conge.directeurnom = res.directeur;
        this.conge.directeurid = res.attribut1;
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
      this.notif.TextNotification = "طلب إجازة إضطرارية من الموظف  " + res.fullName
      this.notif.readUnread = "0";
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;
      this.soldeCongeService.GetSolde(this.UserIdConnected).subscribe(res => {
        this.soldeconges = res;

        this.soldeconge = +this.soldeconges.soldeurgent;

    })
    })

  }


  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }


  //get Remplaçant Name

  getRemplacant(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.conge.nomremplacant = res.fullName

    })
  }

  //date fin
  datef;
  cdates: boolean = false;
  tdatefin(event) {
    this.datef = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0

    } else {
      this.cdates = false;
      if (this.dated == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }


  }

  //date debut
  dated;
  tdatedebut(event) {
    this.dated = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0

    } else {
      this.cdates = false;
      if (this.datef == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }
  }

  //Difference
  diffDays: number = 0;
  testdays: boolean = false;
  diff() {
    let newDated = new Date(this.dated)
    let newDatef = new Date(this.datef);
    var diff = Math.abs(newDated.getTime() - newDatef.getTime());
    this.diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    this.conge.duree = this.diffDays.toString();
    if (this.diffDays <= 5 && this.soldeconge > 0) {
      this.testdays = true;
    } else {
      this.testdays = false;
    }
  }

  testdates: string;
  comparedates() {
    let d1 = new Date(this.dated);
    let d2 = new Date(this.datef);
    if (d1.getTime() < d2.getTime()) {
      this.testdates = "good"
    } else if (d1.getTime() > d2.getTime()) {
      this.testdates = "bad"
    } else {
      this.testdates = "equal"
    }
  }

  //Conge Submit
  conge: Conge = new Conge();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.conge.dateenreg = this.date;
    this.conge.etat = "5%";
    this.conge.etatd = "في الانتظار";
    this.conge.etatrh = "في الانتظار";
    this.conge.attribut2 = "في الانتظار";
    this.conge.type = "إجازة إضطرارية"
    this.conge.adr = this.soldeconge.toString();
    this.conge.attribut6 = "في الانتظار";
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.diffDays = 0
    }
    else {

      this.isValidFormSubmitted = true

      this.diff();
      console.log(this.testdays)
      if (this.testdays) {

        this.congeService.Add(this.conge).subscribe(
          res => {
            this.notif.serviceId = res.id;
            this.notif.serviceName = "طلب إجازة"
            this.notifService.Add(this.notif).subscribe(res => {

            this.soldeconge = this.soldeconge - +this.conge.duree;
            this.diffDays = 0
            this.toastr.success(" تم تقديم الطلب بنجاح", "نجاح");
              form.resetForm();

              this.text = "طلب إجازة إضطرارية";
              this.autoNotif.serviceId = res.id;
              this.autoNotif.pageUrl = "menurequests"
              this.autoNotif.userType = "1";
              this.autoNotif.reponse = "1";
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
                  this.autoNotif.text = "طلب إجازة إضطرارية";
                this.autoNotif.vu = "0";
                this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

                })
              })


            })
          },
          err => {
            this.toastr.error("لم يتم تقديم الطلب", "فشل ")
            this.diffDays = 0
          })
      } 
      else {
        this.diffDays = 0
        this.toastr.error(" لا يمكنك تجاوز 5 أيام أو رصيدك 0", "فشل ")
      }


    }

  }

}
