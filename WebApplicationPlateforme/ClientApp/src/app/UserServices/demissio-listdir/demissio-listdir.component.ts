import { Component, OnInit } from '@angular/core';
import { DemissionService } from '../../shared/Services/User Services/demission.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Demissioon } from '../../shared/Models/User Services/demissioon.model';
import { NgForm } from '@angular/forms';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { SignalRService, connection, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-demissio-listdir',
  templateUrl: './demissio-listdir.component.html',
  styleUrls: ['./demissio-listdir.component.css']
})
export class DemissioListdirComponent implements OnInit {

  constructor(private demService: DemissionService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private notifService: NotifService,
    private signalService: SignalRService,) { }

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



  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  notif: Notif = new Notif();
  dateTime = new Date();


  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.demService.GetDemand(this.UserIdConnected).subscribe(res => {
        this.DemissionList = res;
      }
      )
    })

  }
  //Get Conge Demand Lis

  DemissionList: Demissioon[] = [];
  dem: Demissioon = new Demissioon();
  GetDemissionList() {
    this.demService.GetDemand(this.UserIdConnected).subscribe(res => {
      this.DemissionList = res;
    }
    )
  }

  per: Demissioon = new Demissioon();
  populateForm(conge: Demissioon) {
    this.demService.formData = Object.assign({}, conge)
    this.per = Object.assign({}, conge)

  }



  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  updateRecord(form: NgForm) {
    this.demService.EditDemandByRole(this.per.id, this.etat).subscribe(res => {
      this.per = res;

      this.demService.PutObservableE(this.per).subscribe(res2 => {
        if (this.etat == "موافق" && this.per.etat !='موافق') {
          this.autoNotif.serviceId = this.per.id;
          this.autoNotif.pageUrl = "demissio-listdir";
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "2";
          this.text = "طلب إستقالة";
          this.signalService.GetConnectionByIdUser(this.per.iddir).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.per.nomdir;
            this.autoNotif.receiverId = this.per.iddir;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = "طلب إستقالة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {
              
            })
          })
         
        }
          if (this.per.etat == "رفض") {
            this.autoNotif.serviceId = this.per.id;
            this.autoNotif.pageUrl = "demissio-list"
            this.autoNotif.userType = "0";
            this.autoNotif.reponse = "2";
            this.text = " لقد تم رفض طلب الإستقالة ";
            this.signalService.GetConnectionByIdUser(this.per.idUserCreator).subscribe(res1 => {
              this.userOnline = res1;
              this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
                .catch(err => console.error(err));
            }, err => {
              this.autoNotif.receiverName = this.per.creatorName;
              this.autoNotif.receiverId = this.per.idUserCreator;
              this.autoNotif.transmitterId = this.UserIdConnected;
              this.autoNotif.transmitterName = this.UserNameConnected;
                this.autoNotif.text = " لقد تم رفض طلب الإستقالة";
              this.autoNotif.vu = "0";


              this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

              })
            })
        }
        if (this.per.etat == "موافق") {
          this.autoNotif.serviceId = this.per.id;
          this.autoNotif.pageUrl = "demissio-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "2";
          this.text = " لقد تمت الموافقة على طلب الإستقالة ";
          this.signalService.GetConnectionByIdUser(this.per.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.per.creatorName;
            this.autoNotif.receiverId = this.per.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " لقد تمت الموافقة على طلب الإستقالة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }
        console.log(this.autoNotif)
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          form.resetForm();
          this.GetDemissionList();
        })
       

      },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        })
    
  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }


  p: Number = 1;
  count: Number = 5;
}
