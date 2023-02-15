import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-permission-list-dir',
  templateUrl: './permission-list-dir.component.html',
  styleUrls: ['./permission-list-dir.component.css']
})
export class PermissionUListDirComponent implements OnInit {

  filter;
  constructor(private permissionService: PermissionUService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private signalService: SignalRService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
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

    this.signalService.GetConnectionByIdUser(this.per.iddir).subscribe(res => {
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
    if (this.users.filter(item => item.userId == this.per.iddir).length > 0) {
      this.userConnected = true
    }
  }

  // Get Etab Fin List Comptable
  ComptaList: UserDetail[] = [];

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
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.permissionService.GetPermissionDemand(this.UserIdConnected).subscribe(res => {
        this.PermissionList = res;
      }
        )

    })

  }

  PermissionList: PermissionU[] = [];
  CongeList() {
    this.permissionService.GetPermissionDemand(this.UserIdConnected).subscribe(res => {
      this.PermissionList = res
    })
  }

  per: PermissionU = new PermissionU();

  populateForm(conge: PermissionU) {
    this.per = Object.assign({}, conge)
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  
  date = new Date().toLocaleDateString();

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  updateRecord(form: NgForm) {
    this.permissionService.EditDemandByRole(this.per.id, this.etat).subscribe(res => {
      this.per = res;    
      this.permissionService.PutObservableE(this.per).subscribe(res1 => {

        if (this.etat == "موافق" && this.per.etat != 'موافق') {
          this.autoNotif.serviceId = this.per.id;
          this.autoNotif.pageUrl = "permission-list-dir"
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "2";
          this.text = " طلب اذن ";
          this.signalService.GetConnectionByIdUser(this.per.iddir).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.per.nomdir;
              this.autoNotif.receiverId = this.per.iddir;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " طلب اذن ";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        } if (this.per.etat == "رفض") {
          this.autoNotif.serviceId = this.per.id;
          this.autoNotif.pageUrl = "permission-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "2";
          this.text = " لقد تم رفض طلب الإذن ";
          this.signalService.GetConnectionByIdUser(this.per.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.per.creatorName;
            this.autoNotif.receiverId = this.per.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " لقد تم رفض طلب الإذن";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        } if (this.per.etat == "موافق") {
          this.autoNotif.serviceId = this.per.id;
          this.autoNotif.pageUrl = "permission-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "2";
          this.text = " لقد تمت الموافقة على طلب الإذن ";
          this.signalService.GetConnectionByIdUser(this.per.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
              this.autoNotif.receiverName = this.per.creatorName;
              this.autoNotif.receiverId = this.per.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " لقد تمت الموافقة على طلب الإذن";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        form.resetForm();
        this.CongeList();
        this.msg = "  تم التحديث بنجاح"

        this.succ = true;
        this.failed = false;
      })
    

 


      
   
      },
        err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');

          this.msg = "  فشل عند التحديث"

          this.failed = true;
          this.succ = false;
        }


      )
    
  }
  autoNotif: AutomaticNotification = new AutomaticNotification();
  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

}
