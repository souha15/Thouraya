import { Component, OnInit } from '@angular/core';
import { InterviewService } from '../../../shared/Services/MediaCenter/Interview/interview.service';
import { TypeInterviewService } from '../../../shared/Services/MediaCenter/Interview/type-interview.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { Interview } from '../../../shared/Models/MediaCenter/Interview/interview.model';
import { NgForm } from '@angular/forms';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-interview-add',
  templateUrl: './interview-add.component.html',
  styleUrls: ['./interview-add.component.css']
})
export class InterviewAddComponent implements OnInit {

  constructor(private interviewService: InterviewService,
    private typeInterService: TypeInterviewService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private signalService: SignalRService) { }

  ngOnInit(): void {
    this.GetTypeInter();
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
  autoNotif: AutomaticNotification = new AutomaticNotification();
  dirId: string;
  dirName: string;
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



  // Get Data From TypeInterService
  typeInterList: TbListening[] = [];

  GetTypeInter() {
    this.typeInterService.GetTalent().subscribe(res => {
      this.typeInterList = res;
    })
  }

  //Get User Connected
  UserId: string;
  UserName: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.inter.idUserCreator = res.id;
      this.inter.userNameCreator = res.fullName;
      this.UserId = res.id;
      this.UserName = res.fullName;
    })

  }

  //Tester Le Type
  media: boolean = false;
  presse: boolean = false;
  autre: boolean = false;
  testType(event) {
    if (event.target.value == "حملة إعلامية لبرنامج محدد ") {
      this.media = true;
    } else {
      this.media = false;
    }

    if (event.target.value == "تغطية صحفية ") {
      this.presse = true;
    } else {
      this.presse = false;
    }

    if (event.target.value == "أخرى") {
      this.autre = true;
    } else {
      this.autre = false;
    }
  }

  //Create Interview

  inter: Interview = new Interview();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {

      this.isValidFormSubmitted = true;
      this.inter.dateenreg = this.date;
      this.inter.diretat = "في الإنتظار";
      this.interviewService.Create(this.inter).subscribe(res => {
        this.UserService.GetMediaDir().subscribe(resDir => {
          this.dirId = resDir.id;
          this.dirName = resDir.fullName
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "interview-list-users"
          this.autoNotif.userType = "media dir";
          this.autoNotif.reponse = "media";
          this.text = " طلب لقاء  ";
          this.autoNotif.receiverName = this.dirName;
          this.autoNotif.receiverId = this.dirId;
          this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dirName;
            this.autoNotif.receiverId = this.dirId;
            this.autoNotif.transmitterId = this.UserId;
            this.autoNotif.transmitterName = this.UserName;
              this.text = "طلب لقاء ";
            this.autoNotif.vu = "0";
            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })
        this.toastr.success("تم التسجيل بنجاح", "نجاح");
        form.resetForm();

      },
        err => {
          this.toastr.error("  فشل في تسجيل	 ", "فشل")
          })
    }

  }
}
