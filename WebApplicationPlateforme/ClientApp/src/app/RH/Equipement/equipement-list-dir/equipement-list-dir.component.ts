import { Component, OnInit } from '@angular/core';
import { EquipementService } from '../../../shared/Services/Rh/equipement.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Equipement } from '../../../shared/Models/RH/equipement.model';
import { NgForm } from '@angular/forms';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';
@Component({
  selector: 'app-equipement-list-dir',
  templateUrl: './equipement-list-dir.component.html',
  styleUrls: ['./equipement-list-dir.component.css']
})
export class EquipementListDirComponent implements OnInit {


  constructor(private equipementService: EquipementService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private signalService: SignalRService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.EquipementList();
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

    this.signalService.GetConnectionByIdUser(this.equi.iddir).subscribe(res => {
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
    if (this.users.filter(item => item.userId == this.equi.iddir).length > 0) {
      this.userConnected = true
    }
  }
  p: Number = 1;
  count: Number = 5;



  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.equipementService.GetEquipementDemand(this.UserIdConnected).subscribe(res => {
        this.equipementList = res;
      }
      )
    })

  }



  //Get Conge Demand Lis

  equipementList: Equipement[] = [];
  EquipementList() {
    this.equipementService.GetEquipementDemand(this.UserIdConnected).subscribe(res => {
      this.equipementList = res;
    }
    )
  }


  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }


  autoNotif: AutomaticNotification = new AutomaticNotification();
  updateRecord(form: NgForm) {

    this.equipementService.EditDemandByRole(this.equi.id, this.etat).subscribe(res => {
      this.equi = res;
      this.equipementService.PutObservableE(this.equi).subscribe(res1 => {

        if (this.etat == "موافق" && this.equi.etat != 'موافق') {
          this.autoNotif.serviceId = this.equi.id;
          this.autoNotif.pageUrl = "equipement-list-dir"
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "2";
          this.text = " طلب عهدة ";
          this.signalService.GetConnectionByIdUser(this.equi.iddir).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.equi.nomdir;
            this.autoNotif.receiverId = this.equi.iddir;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " طلب عهدة ";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        } if (this.equi.etat == "رفض") {
          this.autoNotif.serviceId = this.equi.id;
          this.autoNotif.pageUrl = "equipement-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "2";
          this.text = " لقد تم رفض طلب العهدة ";
          this.signalService.GetConnectionByIdUser(this.equi.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.equi.userNameCreator;
              this.autoNotif.receiverId = this.equi.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " لقد تم رفض طلب العهدة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }
      if (this.equi.etat == "موافق") {
        this.autoNotif.serviceId = this.equi.id;
        this.autoNotif.pageUrl = "equipement-list"
        this.autoNotif.userType = "0";
        this.autoNotif.reponse = "2";
        this.text = " لقد تمت الموافقة على طلب العهدة ";
        this.signalService.GetConnectionByIdUser(this.equi.idUserCreator).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.equi.userNameCreator;
          this.autoNotif.receiverId = this.equi.idUserCreator;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تمت الموافقة على طلب العهدة";
          this.autoNotif.vu = "0";


          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      }
   
      })

      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      form.resetForm();
      this.EquipementList();

    }, err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
        })

  }

  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }
  equi: Equipement = new Equipement();
  populateForm(conge: Equipement) {
    this.equi = Object.assign({}, conge)
  }

}
