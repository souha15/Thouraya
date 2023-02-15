import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { NewFormationService } from '../../../shared/Services/ServiceRh/new-formation.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NewFormation } from '../../../shared/Models/ServiceRh/new-formation.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-demande-formation-user-add',
  templateUrl: './demande-formation-user-add.component.html',
  styleUrls: ['./demande-formation-user-add.component.css']
})
export class DemandeFormationUserAddComponent implements OnInit {

  constructor(private formationService: NewFormationService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private specialiteService: TbListeningService,
    private signalService: SignalRService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetSpecList();

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
  // Get Specilite List

  SpecList: TbListening[] = [];

  GetSpecList() {
    this.specialiteService.Get().subscribe(res => {
      this.SpecList = res
    })
  }


  UserIdConnected: string;
  UserNameConnected: string;
  dir: string;
  dirid: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }


  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  fm: NewFormation = new NewFormation();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.fm.etat = 'في الإنتظار';
      this.fm.attribut2 = "غير منجزة"
      this.fm.idUserCreator = this.UserIdConnected;
      this.fm.userNameCreator = this.UserNameConnected;
      this.formationService.Add(this.fm).subscribe(res => {

        this.dirId = res.userId1;
        this.dirName = res.userName1;
        this.text = "طلب دورة تدريبية";
        this.autoNotif.serviceId = res.id;
        this.autoNotif.pageUrl = "demande-formation-listdir"
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
            this.autoNotif.text = "طلب دورة تدريبية";
          this.autoNotif.vu = "0";
          this.autoNotif.reponse = "1";
          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })


        })  
        form.resetForm();
        this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");

        this.succ = true;
        this.failed = false;


        this.msg = "  تمت الإضافة بنجاح"
      },
        err => {
          this.toastr.error("فشل التسجيل  الطلب", " تسجيل ")
          this.failed = true;
          this.succ = false;

          this.msg = " فشل عند الإضافة"
        }
      )
    }
  }
}
