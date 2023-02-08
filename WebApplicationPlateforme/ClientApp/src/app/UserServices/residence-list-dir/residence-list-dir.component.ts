import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { ResidenceService } from '../../shared/Services/User Services/residence.service';
import { Residence } from '../../shared/Models/User Services/residence.model';
import { SignalRService, connection, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-residence-list-dir',
  templateUrl: './residence-list-dir.component.html',
  styleUrls: ['./residence-list-dir.component.css']
})
export class ResidenceListDirComponent implements OnInit {
  constructor(private residenceService: ResidenceService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private signalService: SignalRService) { }

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

  openInNewTab(url) {
    window.open(url, '_blank').focus();
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

    this.signalService.GetConnectionByIdUser(this.dem.iddir).subscribe(res => {
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
    if (this.users.filter(item => item.userId == this.dem.iddir).length > 0) {
      this.userConnected = true
    }
  }

  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;
  rs: Residence = new Residence();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.residenceService.GetDemand(this.UserIdConnected).subscribe(res => {
        this.filtredCongeList = res;
      }
      )
    })

  }


  congeList: Residence[] = [];
  dem: Residence = new Residence();
  filtredCongeList: Residence[] = [];
  CongeList() {
    this.residenceService.GetDemand(this.UserIdConnected).subscribe(res => {
      this.filtredCongeList = res;
    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  autoNotif: AutomaticNotification = new AutomaticNotification();
  updateRecord(form: NgForm) {
    this.residenceService.EditDemandByRole(this.dem.id, this.etat).subscribe(res3 => {
      this.dem = res3;  
      this.residenceService.PutObservableE(this.dem).subscribe(res => {
        if (this.etat == "موافق" && this.dem.etat != 'موافق') {
          this.autoNotif.serviceId = this.dem.id;
          this.autoNotif.pageUrl = "residence-list-dir"
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "2";
          this.text = " طلب تجديد الإقامة ";
          this.signalService.GetConnectionByIdUser(this.dem.iddir).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dem.nomdir;
            this.autoNotif.receiverId = this.dem.iddir;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " طلب تجديد الإقامة ";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        } if (this.dem.etat == "رفض") {
          this.autoNotif.serviceId = this.dem.id;
          this.autoNotif.pageUrl = "residence-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "2";
          this.text = " لقد تم رفض طلب تجديد الإقامة ";
          this.signalService.GetConnectionByIdUser(this.dem.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dem.creatorName;
            this.autoNotif.receiverId = this.dem.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.autoNotif.text = " لقد تم رفض طلب تجديد الإقامة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        } if (this.dem.etat == "موافق") {
          this.autoNotif.serviceId = this.dem.id;
          this.autoNotif.pageUrl = "residence-list"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "2";
          this.text = " لقد تمت الموافقة على طلب تجديد الإقامة ";
          this.signalService.GetConnectionByIdUser(this.dem.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dem.creatorName;
            this.autoNotif.receiverId = this.dem.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
              this.autoNotif.text = " لقد تمت الموافقة على طلب تجديد الإقامة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }


        this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.CongeList();
      form.resetForm();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )
    }


    )

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }
  testEdit: boolean = false;
  populateForm(conge: Residence) {
    this.residenceService.formData = Object.assign({}, conge)
    this.dem = Object.assign({}, conge)

  }

}
