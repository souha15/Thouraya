import { Component, OnInit, OnDestroy } from '@angular/core';
import { CongeService } from '../../shared/Services/Rh/conge.service';
import { SoldeCongeService } from '../../shared/Services/Rh/solde-conge.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { SoldeConge } from '../../shared/Models/RH/solde-conge.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Conge } from '../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { DatePipe } from '@angular/common';
import { AutomaticNotification, SignalRService, connection } from '../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-dem-conge-normal',
  templateUrl: './dem-conge-normal.component.html',
  styleUrls: ['./dem-conge-normal.component.css']
})
export class DemCongeNormalComponent implements OnInit, OnDestroy {


  constructor(private congeService: CongeService,
    private soldeCongeService: SoldeCongeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private signalService: SignalRService) { }

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

  ngOnDestroy() {
    this.signalService.hubConnection.off("authResponseSuccess")
  }
today;
  users: connection[] = [];

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
  text: string = 'You Got an Demand From User';
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
  getOnlineUsersList(UserIdConnected){
    this.signalService.GetConnectionList(UserIdConnected).subscribe(res => {
      this.users = res;
      console.log(this.users)
    })
  }

  // Test If User Connected
  userOnline: connection = new connection();
  online: boolean;
  TestIfUserConnected(userId):boolean {
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
  // Conges Creation

  soldeconges: SoldeConge = new SoldeConge();
  nbdays: number = 0;
  soldedays: number = 0;
  dateEnreg: string;
  soldeconge: number = 0;
  UserIdConnected: string;
  UserNameConnected: string;
  userc: UserDetail = new UserDetail();
  notif: Notif = new Notif();
  autoNotif: AutomaticNotification = new AutomaticNotification();
  transmitterId: string;
  receiverId: string;
  dirId: string;
  dirName: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.transmitterId = res.id;
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;
      this.soldeCongeService.GetSolde(this.UserIdConnected).subscribe(res => {
        this.soldeconges = res;

        this.nbdays = +this.soldeconges.numbernormal;
        this.soldedays = +this.soldeconges.soldenormal;
        this.dateEnreg = this.soldeconges.datenormal;

        let d2 = new Date(this.dateEnreg);
        let d1 = new Date();
        if (d1.getMonth() + 1 == d2.getMonth() + 1) {
          this.soldeconge = this.soldedays;

        } else {

          this.soldeconge = this.calculatedays(d1, d2);
          this.soldeconges.soldenormal = this.soldeconge.toString();
          this.soldeconges.datenormal = new Date().toString();
          this.soldeCongeService.PutObservable(this.soldeconges).subscribe(res => {

          })
        }
      })
    })

  }
  conge: Conge = new Conge();
  //Calculate
  calculatedays(d1, d2): number {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    return this.soldedays + (months * this.nbdays);
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
  diff() {
    let newDated = new Date(this.dated)
    let newDatef = new Date(this.datef);
    var diff = Math.abs(newDated.getTime() - newDatef.getTime());
    this.diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    this.conge.duree = this.diffDays.toString();
  }

  testdates: string;
  comparedates() {
    let d1 = new Date(this.dated);
    let d2 = new Date(this.datef);
    if (d1.getTime() < d2.getTime() || d1.getTime() == d2.getTime()) {
      this.testdates = "good"
    }
    if (d1.getTime() > d2.getTime()) {
      this.testdates = "bad"
    }
  }

  //Conge Submit
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  onSubmit(form: NgForm) {
    this.conge.etat = "في الإنتظار";
    this.conge.type = "إجازة إعتيادية"
    this.conge.adr = this.soldeconge.toString();

    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.diffDays = 0
    }
    else {

      this.isValidFormSubmitted = true

      this.diff();

      if (+this.diffDays < +this.soldeconge && this.testdates == "good") {

        this.congeService.Add(this.conge).subscribe(
          res => {
            this.succ = true;
            this.failed = false;
            this.msg = "  تمت الإضافة بنجاح"
            this.toastr.success(" تم تقديم الطلب بنجاح", "نجاح");
            form.resetForm();

            this.dirId = res.userId1;
            this.dirName = res.userName1;
            this.text = "طلب إجازة إعتيادية";
            this.autoNotif.serviceId = res.id;
            this.autoNotif.pageUrl = "rh-conge-list"
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
                  this.autoNotif.text = "طلب إجازة إعتيادية";
                  this.autoNotif.vu = "0";
                  this.autoNotif.reponse = "1";
                  
                  this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

                  })
              })
     
        

            this.soldeconge = this.soldeconge - +this.conge.duree;
            this.diffDays = 0

          },
          err => {
            this.failed = true;
            this.succ = false;
            this.msg = " فشل عند الإضافة"
            this.toastr.error("  يجب أن يبدأ التاريخ من هذا اليوم", "لم يتم تقديم الطلب ")
            this.diffDays = 0
          })
      } else {
        this.diffDays = 0
        this.failed = true;
        this.succ = false;
        this.msg = "تثبت من التاريخ رصيد إجازتك أقل من المطلوب"
        this.toastr.warning("تثبت من التاريخ رصيد إجازتك أقل من المطلوب", "")
      }


    }

  }
}
