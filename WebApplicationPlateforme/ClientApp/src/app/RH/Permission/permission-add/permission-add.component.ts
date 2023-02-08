import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Permission } from '../../../shared/Models/RH/permission.model';
import { NgForm } from '@angular/forms';
import { PermissionService } from '../../../shared/Services/Rh/permission.service';
import { PermissionU } from '../../../shared/Models/User Services/permission-u.model';
import { PermissionUService } from '../../../shared/Services/User Services/permission-u.service';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { DatePipe } from '@angular/common';
import { SignalRService, AutomaticNotification, connection } from '../../../shared/Services/signalR/signal-r.service';


@Component({
  selector: 'app-permission-add',
  templateUrl: './permission-add.component.html',
  styleUrls: ['./permission-add.component.css']
})
export class PermissionAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private permissionService: PermissionUService,
    private signalService: SignalRService,) { }

  ngOnInit(): void {
    this.getUserConnected();
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



  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.per.creatorName = res.fullName;
      this.per.idUserCreator = res.id;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }

  // Test two Times

  start;
  startTime(event) {
    this.start = event.target.value;
    if (this.end != null) {
      if (this.start > this.end) {
        this.toastr.error("يجب أن يكون وقت البدء أقل من وقت الانتهاء")
      }
    } 
  }

  end;
  endTime(event) {
    this.end = event.target.value;
    if (this.start != null) {
      if (this.start > this.end) {
        this.toastr.error("يجب أن يكون وقت البدء أقل من وقت الانتهاء")
      }
    } else {
      this.toastr.error("يجب عليك ملئ وقت البداية")
    }
  }


  autre: boolean = false;
  testAutre(event) {
    if (event.target.value =="أخرى") {
      this.autre = true;
    } else {
      this.autre = false; 
    }
  }
  per: PermissionU = new PermissionU();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    console.log(form.invalid)
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true
      this.per.creatorName = this.UserNameConnected;
      this.per.idUserCreator = this.UserIdConnected;
      if (this.per.idUserCreator != null) {
        this.permissionService.Add(this.per).subscribe(
          res => {
            this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            form.resetForm();
            this.text = "طلب إذن";
            this.dirId = res.userId1;
            this.dirName = res.userName1;
            this.autoNotif.serviceId = res.id;
            this.autoNotif.pageUrl = "permission-list-dir"
            this.autoNotif.userType = "1";
            this.autoNotif.reponse = "2";
            this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
              this.userOnline = res1;
              this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
                .catch(err => console.error(err));
            }, err => {
              this.autoNotif.receiverName = this.dirName;
              this.autoNotif.receiverId = this.dirId;
              this.autoNotif.transmitterId = this.UserIdConnected;
              this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = "طلب إذن";
              this.autoNotif.vu = "0";
              this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

              })
            })

          },
          err => {
            this.toastr.error(" لم يتم تقديم الطلب ", "لم يتم تقديم الطلب ")
          },
        )

      } else {
        this.toastr.error(" لم يتم تقديم الطلب ", "لم يتم تقديم الطلب ")
      }
    }
    }
  
}
