import { Component, OnInit } from '@angular/core';
import { DemandeSuppHeure } from '../../../shared/Models/ServiceRh/demande-supp-heure.model';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { DemandeSuppHeureService } from '../../../shared/Services/ServiceRh/demande-supp-heure.service';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';
@Component({
  selector: 'app-demande-supp-heure-list-director',
  templateUrl: './demande-supp-heure-list-director.component.html',
  styleUrls: ['./demande-supp-heure-list-director.component.css']
})
export class DemandeSuppHeureListDirectorComponent implements OnInit {

  constructor(private suppheureService: DemandeSuppHeureService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private signalService: SignalRService,
    private notifService: NotifService,) { }

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


  p: Number = 1;
  count: Number = 5;
  //Handle Notification
  // Hub Configuration
  users: connection[] = [];
  dirId: string;
  dirName: string;
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

    this.signalService.GetConnectionByIdUser(this.fact.iddir).subscribe(res => {
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

  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.suppheureService.GetDemand(this.UserIdConnected).subscribe(res => {
        this.SuppHeureList = res;
      }
      )
    })

  }

  //Populate Form 
  factId: number
  fact: DemandeSuppHeure = new DemandeSuppHeure();
  populateForm(facture: DemandeSuppHeure) {
    this.suppheureService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
  }
  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  SuppHeureList: DemandeSuppHeure[] = [];
  getSuppHeureList() {
    this.suppheureService.GetDemand(this.UserIdConnected).subscribe(res => {
      this.SuppHeureList = res;
    }
    )

  }
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  date = new Date().toLocaleDateString();
  updateRecord(form: NgForm) {
    this.suppheureService.EditDemandByRole(this.fact.id, this.etat).subscribe(res => {
      this.fact = res;
    this.suppheureService.PutObservableE(this.fact).subscribe(res1 => {
      if (this.etat == "موافق" && this.fact.etat != 'موافق') {
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "demande-supp-heure-list-director"
        this.autoNotif.userType = "3";
        this.autoNotif.reponse = "2";
         this.text = "طلب ساعات الإضافية";
        this.signalService.GetConnectionByIdUser(this.fact.iddir).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.fact.nomdir;
          this.autoNotif.receiverId = this.fact.iddir;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
           this.autoNotif.text = "طلب ساعات الإضافية";
          this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {
              this.etat=""
          })
        })
      }
      if (this.fact.etat == "رفض") {
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "demande-supp-heure-list"
        this.autoNotif.userType = "0";
        this.autoNotif.reponse = "2";
        this.text = " لقد تم رفض طلب ساعات الإضافية ";
        this.signalService.GetConnectionByIdUser(this.fact.idUserCreator).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.fact.userNameCreator;
          this.autoNotif.receiverId = this.fact.idUserCreator;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تم رفض طلب ساعات الإضافية";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      }
      if (this.fact.etat == "موافق") {
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "demande-supp-heure-list"
        this.autoNotif.userType = "0";
        this.autoNotif.reponse = "2";
        this.text = " لقد تمت الموافقة على طلب ساعات الإضافية ";
        this.signalService.GetConnectionByIdUser(this.fact.idUserCreator).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.fact.userNameCreator;
          this.autoNotif.receiverId = this.fact.idUserCreator;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تمت الموافقة على طلب ساعات الإضافية";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      }
      form.resetForm();
      this.getSuppHeureList()
      this.toastr.success('تم التحديث بنجاح', 'نجاح');
      this.msg = "  تم التحديث بنجاح"

      this.succ = true;
      this.failed = false;
    })
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
        this.msg = "  فشل عند التحديث"

        this.failed = true;
        this.succ = false;

      })

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

}
