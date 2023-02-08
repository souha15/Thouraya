import { Component, OnInit, ViewChild, OnDestroy, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SignalRService, connection, Message, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ChatService } from '../../shared/Services/Comments/chat.service';
import { Chat } from '../chat.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-chat-msg',
  templateUrl: './chat-msg.component.html',
  styleUrls: ['./chat-msg.component.css']
})
export class ChatMsgComponent implements OnInit, OnDestroy  {


  @ViewChild('scrollMe', { static: false }) private myScrollContainer: ElementRef;
  constructor(private toastr: ToastrService,
    private signalService: SignalRService,
    private UserService: UserServiceService,
    private MsgService: ChatService) { }

  hubConnection;
  selectedUser: connection;

  ngOnInit() {
    this.GetUsersList();
    this.GetUserConnected();
    this.getOnlineUsersList()
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


    this.scrollToBottom();
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

  // Get Connected List Users
  getOnlineUsersList() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.IdUser = res.id;
      this.UserName = res.fullName
  
      this.signalService.GetConnectionList(this.IdUser).subscribe(res => {
        this.users = res;
        console.log(this.users)

    })
    })
  }
  getOnlineUsersLis(): void {
    this.signalService.hubConnection.on("getOnlineUsersResponse", (onlineUsers: Array<connection>) => {
      this.users = [...onlineUsers];
      this.users.forEach(item => {
        this.signalService.GetNotification(this.IdUser, item.userId).subscribe(res => {
          item.vu = res;
        })
      })
    });
  }

  //Send Chat

  text: string = '';
  msgModel: Chat = new Chat();
  msgModelReceiver: Chat = new Chat();
  autoNotif: AutomaticNotification = new AutomaticNotification();
  sendMsgInv(): void {
    this.signalService.hubConnection.invoke("sendMsg", this.selectedUser.signalrId, this.text, this.autoNotif)
      .catch(err => console.error(err));

    if (this.selectedUser.msgs == null) this.selectedUser.msgs = [];

    // Insert Chat Model in  DataBase

    this.msgModel.notif = "0";
    this.msgModel.emeteurId = this.IdUser;
    this.msgModel.emeteurNom = this.UserName;
    this.msgModel.recepteurId = this.selectedUser.userId;
    this.msgModel.recepteurNom = this.selectedUser.userName;
    this.msgModel.text = this.text;
    this.autoNotif.receiverName = this.selectedUser.userName;
    this.autoNotif.receiverId = this.selectedUser.userId;
    this.autoNotif.transmitterId = this.IdUser;
    this.autoNotif.transmitterName = this.UserName;
    this.autoNotif.text = "رسالة واردة من" + this.IdUser;
    this.autoNotif.vu = "0";
    this.autoNotif.reponse = "Msg";
    this.MsgService.Create(this.msgModel).subscribe(res => {
      this.selectedUser.msgs.push(new Message(this.text, true));
      this.text = "";
      this.ConversationList.push(this.msgModel);

      this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

      })
    }, err => { })
  }


  // Receiving

  msgs: Message[] = [];

  private sendMsgLis(): void {
    this.signalService.hubConnection.on("sendMsgResponse", (connId: string, msg: string, userConSender: string, userConReceiver: string) => {
      let receiver = this.users.find(u => u.signalrId === connId);
      if (receiver.msgs == null) receiver.msgs = [];
      receiver.msgs.push(new Message(msg, false));
      this.msgModelReceiver.notif = "0";
      this.msgModelReceiver.emeteurId = this.IdUser;
      this.msgModelReceiver.emeteurNom = this.UserName;
      this.msgModelReceiver.recepteurId = this.selectedUser.userId;
      this.msgModelReceiver.recepteurNom = this.selectedUser.userName;
      this.msgModelReceiver.text = msg;
      this.ConversationList.push(this.msgModelReceiver)
      // Push Notification
      // this.toastr.success(userConSender,msg)
    });
  }

  // Search Users

  name: string = '';

  UsersList: UserDetail[] = [];
  Search(): void {
    let term = this.name;
    if (term != '') {
      this.UsersList = this.UsersList.filter(function (tag) {
        return tag.fullName.indexOf(term) >= 0;
      });
    } else {
      this.GetUsersList();
    }
  }
  //Get User Connected
  GetUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.signalService.GetNotificationsNumber(res.id).subscribe(res2 => {

      })
    })
  }

  // get Etudiant List
  IdUser: string;
  UserName: string;
  GetUsersList() {

     this.UserService.GetUsersList().subscribe(res2 => {
        this.UsersList = res2
        this.UsersList.forEach(item => {
          this.signalService.GetNotification(this.IdUser, item.id).subscribe(res => {
            item.etatuser = res.toString();
          })
        })
      })
   
  }



  // Get Conversation for offline users

  ConversationList: Chat[] = []
  RecepteurId: string;
  RecepteurName: string;
  photo: string;
  showconvOnline: boolean = false;
  showconvOffline: boolean = false;
  GetConversation(user: UserDetail) {

    this.RecepteurId = user.id;
    this.RecepteurName = user.fullName;
    this.photo = user.photo;
    this.MsgService.GetConversations(this.IdUser, user.id).subscribe(res => {
      this.ConversationList = res;

      this.showconvOffline = true;
      if (this.ConversationList.length != 0) {
        this.signalService.updateNotif(this.RecepteurId, this.IdUser).subscribe(res2 => {
          this.GetUsersList();
          this.signalService.GetNotification(this.IdUser, this.RecepteurId).subscribe(res => {
            user.etatuser = "0";
          })
        },
          err => {
            console.log(err);
          })
      }
    })
  }

  // Get Conversation For Online Users
  GetselectedUser(user: connection) {
    this.showconvOnline = true
    this.RecepteurId = user.userId;
    this.RecepteurName = user.userName;
    this.selectedUser.msgs = [];
    this.UserService.GetUserById(user.userId).subscribe(res => {
      this.photo = res.photo;
      this.MsgService.GetConversations(this.IdUser, user.userId).subscribe(res1 => {
        this.ConversationList = res1;
        this.signalService.GetNotification(this.IdUser, user.userId).subscribe(res2 => {
          user.vu = 0;

          if (this.ConversationList.length != 0) {

            for (let i = 0; i < this.ConversationList.length; i++) {
              this.selectedUser.msgs.push(new Message(this.ConversationList[i].text, true));
            }

            this.signalService.updateNotif(this.RecepteurId, this.IdUser).subscribe(res2 => {
            }, err => {
              console.log(err);
            }
            )
          }
        })
      })
    })

  }

  // Scroll Parameter 
  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  // SendMsgOffline

  date = new Date().toLocaleDateString();
  time = new Date().toLocaleTimeString();
  SendMsg() {
    this.msgModel.emeteurId = this.IdUser;
    this.msgModel.emeteurNom = this.UserName;
    this.msgModel.recepteurId = this.RecepteurId;
    this.msgModel.recepteurNom = this.RecepteurName;
    this.msgModel.dateEnvoi = this.date;
    this.msgModel.timeEnvoi = this.time;
    this.msgModel.vu = "0";
    this.msgModel.text = this.text;
    this.MsgService.Create(this.msgModel).subscribe(res => {
      this.text = ''
      this.ConversationList.push(this.msgModel);
      this.msgModel = new Chat();
    })
  }

}
