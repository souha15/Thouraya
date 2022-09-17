import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SignalRService, connection, Message } from '../../shared/Services/signalR/signal-r.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-ticket2-list',
  templateUrl: './ticket2-list.component.html',
  styleUrls: ['./ticket2-list.component.css']
})
export class Ticket2ListComponent implements OnInit, OnDestroy {
  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;

  constructor(private toastr: ToastrService,
    private signalService: SignalRService,
    private UserService: UserServiceService, ) { }
  hubConnection;
  selectedUser: connection;

  ngOnInit(): void {
    this.signalService.startConnection();
    this.userOnLis();
    this.userOffLis();
    this.logOutLis();
    this.getOnlineUsersLis();
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
  users: Array<connection> = new Array<connection>();

  userOnLis(): void {
    this.signalService.hubConnection.on("userOn", (newUser: connection) => {

      this.users.push(newUser);
      console.log(this.users)
    });
  }


  userOffLis(): void {
    this.signalService.hubConnection.on("userOff", (personId: string) => {
      this.users = this.users.filter(u => u.userId != personId);
      console.log(this.users)
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
      console.log(this.users)
      this.users.forEach(item => {
        //this.signalService.GetNotification(this.IdUser, item.userId).subscribe(res => {
        //  item.vu = res;
        //})
      })
    });
  }

  //Send Msg 
  text: string = 'Bonjour';
  user: connection = new connection()
  sendMsgInv(): void {
    /**/ 
    this.user = this.users[0];
    console.log(this.user)
    this.signalService.hubConnection.invoke("sendMsg", this.user.signalrId , this.text)
      .catch(err => console.error(err));

   
  }

  // Receiving

  msgs: Message[] = [];

  private sendMsgLis(): void {
    this.signalService.hubConnection.on("sendMsgResponse", (connId: string, msg: string, userConSender: string, userConReceiver: string) => {
      let receiver = this.users.find(u => u.signalrId === connId);
      if (receiver.msgs == null) receiver.msgs = [];
      receiver.msgs.push(new Message(msg, false));
      // Push Notification
      //this.toastr.success(userConSender, msg)
    });
  }
}
