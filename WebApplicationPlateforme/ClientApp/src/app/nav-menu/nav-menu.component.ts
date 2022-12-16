import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserServiceService } from '../shared/Services/User/user-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../shared/Models/User/user-detail.model';
import { SignalRService, connection, AutomaticNotification } from '../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit, OnDestroy {


  constructor(private UserService: UserServiceService,
    private router: Router,
    private signalrService: SignalRService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.signalrService.startConnection();
    this.sendMsgLis();
    if (this.signalrService.hubConnection.state == 1) this.getOnlineUsersInv();
    else {
      this.signalrService.ssSubj.subscribe((obj: any) => {
        if (obj.type == "HubConnStarted") {
          this.getOnlineUsersInv();
        }
      });
    }
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  onLogout() {
    this.signalrService.hubConnection.invoke("logOut", this.signalrService.userId).catch(err => console.log(err))
    this.router.navigateByUrl('/login-page');
    localStorage.removeItem("token");
    localStorage.removeItem("userId")

  
  }
  checker(arr1, arr2) {
    return arr1.some(elem => arr2.includes(elem));
  }


  ngOnDestroy() {
    this.signalrService.hubConnection.off("authResponseSuccess")
  }

/** Handle Notifications  ***/

  users: Array<connection> = new Array<connection>();
  connected: boolean;
  userOnList(): void {
    this.signalrService.hubConnection.on("userOn", (newUser: connection) => {
      this.users.push(newUser);
      if (this.users.filter(item => item.userId != this.userDetails.id).length < 0) {
        this.connected = false
      } else {
        this.connected = true;
      }
    });
  }

  //  Get offLine Users

  getOnlineUsersList(): void {
    this.signalrService.hubConnection.on("getOnlineUsersResponse", (onlineUsers: Array<connection>) => {
      this.users = [...onlineUsers];
   
    });
  }

  //  Get offLine Users

  userOffList(): void {
    this.signalrService.hubConnection.on("userOff", (personId: string) => {
      this.users = this.users.filter(u => u.userId != personId);
    });
  }

  // The responsable fonction for getting online Users list


  getOnlineUsersInv(): void {
    this.signalrService.hubConnection.invoke("getOnlineUsers")
      .catch(err => console.error(err));
  }


  logOutList(): void {
    this.signalrService.hubConnection.on("logoutResponse", () => {
      localStorage.removeItem("userId");
      location.reload();

    })
  }

  // Receiving

  private sendMsgLis(): void {
    this.signalrService.hubConnection.on("sendMsgResponse", (connId: string, msg: string, userConSender: string, userConReceiver: string) => {
      this.toastr.success(msg ,userConSender)
      this.GetNotifList(this.UserIdConnected);
      this.CountNotif(this.UserIdConnected);

    });
  }

  // Get User Connected

  userDetails: UserDetail = new UserDetail();
  user: UserDetail = new UserDetail(); 
  UserIdConnected: string;
  UserNameConnected: string='';
  roleslist: any = [];
  testroledir: boolean = false;
  allowedRoles = ['ADMINISTRATEUR', 'DIRECTORGENERAL', 'DIRECTORETAB', 'DIRECTORADMN', 'RESSOURCEHUMAINE', 'RESPFINANCE', 'DAWAAPRIV', 'DOTPRIV', 'FINPRIV', 'DIRPRIV'];
  notifList: AutomaticNotification[] = [];
  notifListUser: AutomaticNotification[] = [];
  notifCount: number = 0;
  async getUserConnected(): Promise<any> {
    this.user = await this.UserService.getUserConnected();
    this.UserNameConnected = this.user.fullName;
    this.UserIdConnected = this.user.id

    // Test Roles
    this.UserService.getUserRoles(this.user.id).subscribe(res => {
        this.roleslist = res;
      if (this.checker(this.roleslist, this.allowedRoles)) {
          this.testroledir = true;
        } else {
          this.testroledir = false;
        }   
    })
   // GetAutomatic Notif

    this.GetNotifList(this.UserIdConnected)
    this.GetNotifListUser(this.UserIdConnected)
    

    // GetNotif Count

    this.CountNotif(this.UserIdConnected)
    this.CountNotifUser(this.UserIdConnected)
  }

  // Count Notif

  CountNotif(userId) {
    this.signalrService.GetNotificationsNumber(userId).subscribe(res => {
      this.notifCount = res;
    })
  }

  // Get Notif Number For user demanded
  notifUser: number = 0;
  CountNotifUser(userId) {
    this.signalrService.GetNotificationsNumberForUserSender(userId).subscribe(res => {
      this.notifUser = res;
    })
  }
  // Get Notif List
  GetNotifList(userId) {

    this.signalrService.GetUnreadNotificationByUser(userId).subscribe(res => {
      this.notifList = res.slice(0, 3);
 
    })
  }

  // Get Notif List

  GetNotifListUser(userId) {

    this.signalrService.GetUnreadNotificationsForUserSenderList(userId).subscribe(res => {
      this.notifListUser = res.slice(0, 3);

    })
  }

  notif: AutomaticNotification = new AutomaticNotification();
  id: number;
  updateNotif(item: AutomaticNotification) {
    this.notif = Object.assign({}, item);
    this.notif.vu = "1"
    this.signalrService.UpdateNotif(this.notif).subscribe(res => {
      this.router.navigate(['/' + this.notif.pageUrl])
      this.GetNotifList(this.UserIdConnected);
      this.CountNotif(this.UserIdConnected)
   
    })
  }


}
