import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { DesignImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/design-impression.service';
import { TypeImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/type-impression.service';
import { DesignImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/design-impression.model';
import { NgForm } from '@angular/forms';
import { TypeImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/type-impression.model';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-design-add',
  templateUrl: './design-add.component.html',
  styleUrls: ['./design-add.component.css']
})
export class DesignAddComponent implements OnInit {

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: DesignImpressionService,
    private typeService: TypeImpressionService,
    private signalService: SignalRService
) { }

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


/**** Selected Type Event ***/

  typeSelected: string;
  elec: boolean = false;
  bruch: boolean = false;
  imp: boolean = false;
  rap: boolean = false;
  ban: boolean = false;
  dip: boolean = false;
  drou: boolean = false;
  autre: boolean = false;

  getTypeSelected(event) {
    if (event.target.value == "0") {

      this.typeSelected = "تصميم للنشر الإلكتروني فقط";
      this.elec = true;
      this.bruch = false;
      this.imp = false;
      this.rap = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "1") {

      this.typeSelected = "تصميم وطباعة بروشور";
      this.bruch = true;
      this.elec = false;
      this.imp = false;
      this.rap = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;

      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "2") {

      this.typeSelected = "تصميم وطباعة استندات";
      this.imp = true;
      this.bruch = false;
      this.elec = false;
      this.rap = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;

      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "3") {

      this.typeSelected = "تصميم وطباعة تقرير"
      this.rap = true;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.ban = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;

      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "4") {

      this.typeSelected = "تصميم وطباعة بنر واللوحات"
      this.ban = true;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.dip = false;
      this.drou = false;
      this.autre = false;
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "5") {

      this.typeSelected = "تصميم وطباعة الشهادات"
      this.dip = true;
      this.ban = false;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.drou = false;
      this.autre = false;
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "6") {

      this.typeSelected = "تصميم وطباعة الدروع"
      this.drou = true;
      this.dip = false;
      this.ban = false;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;
      this.autre = false;
    
      this.dem.nomdesign = this.typeSelected;

    } else if (event.target.value == "7") {

      this.typeSelected = "أخرى"
      this.autre = true;
      this.drou = false;
      this.dip = false;
      this.ban = false;
      this.rap = false;
      this.imp = false;
      this.bruch = false;
      this.elec = false;

      this.dem.nomdesign = this.typeSelected;

    }
  }


  TypeImp: TypeImpression = new TypeImpression();
  TypeImpList: TypeImpression[] = [];
  i: number = 0;
  TypeImpTest: boolean = false;

  add() {
    this.TypeImpTest = true;
    this.TypeImpList[this.i] = this.TypeImp;
    this.TypeImp = new TypeImpression();
    this.i = this.i + 1;
  }

  del(dp, i) {
    this.TypeImpList.splice(this.TypeImpList.indexOf(dp), 1);
    this.i = this.i - 1
    this.TypeImp = new TypeImpression();
  }
  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      if (res.idDepartement != null) {
        this.idEtab = res.idDepartement;
        this.nomEtab = res.nomDepartement;
      }

    })

  }


  /** OnSubmit **/

  dem: DesignImpression = new DesignImpression();
  dem2: DesignImpression = new DesignImpression();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.attribut2 = this.typeSelected;
      this.dem.dateenreg = this.date;
      this.dem.etat = "في الانتظار";
      this.dem.idUserCreator = this.UserId;
      this.dem.userNameCreator = this.UserName;
      if (this.idEtab != null) {
        this.dem.etabid = this.idEtab.toString();
        this.dem.etabnom = this.nomEtab;
      }

      this.demService.Create(this.dem).subscribe(res => {
        this.dem2 = res
        for (let i = 0; i < this.TypeImpList.length; i++) {
          this.TypeImp = this.TypeImpList[i]
          this.TypeImp.idImpression = this.dem2.id;
          this.typeService.Create(this.TypeImp).subscribe(res => {

          },
            err => {
              this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
            })
        }
        this.UserService.GetMediaDir().subscribe(resDir => {
          this.dirId = resDir.id;
          this.dirName = resDir.fullName
          this.autoNotif.serviceId = res.id;
          this.autoNotif.pageUrl = "design-list-recep"
          this.autoNotif.userType = "media dir";
          this.autoNotif.reponse = "media";
          this.text = "طلب تصميم وطباعة ";
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
              this.text = "طلب تصميم وطباعة ";
            this.autoNotif.vu = "0";
            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })

        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.TypeImpList.splice(0, this.TypeImpList.length)
        this.TypeImpList = [];
        this.TypeImpTest = false;
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }
}
