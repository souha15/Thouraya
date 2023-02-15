import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { CongeService, CongeFiles } from '../../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { SoldeCongeService } from '../../../shared/Services/Rh/solde-conge.service';
import { SoldeConge } from '../../../shared/Models/RH/solde-conge.model';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-rh-conge-list',
  templateUrl: './rh-conge-list.component.html',
  styleUrls: ['./rh-conge-list.component.css']
})
export class RhCongeListComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private soldeCongeService: SoldeCongeService,
    public serviceupload: UploadDownloadService,
    private signalService: SignalRService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }
  p: Number = 1;
  count: Number = 5;
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

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.congeService.GetCongeDemand(this.UserIdConnected).subscribe(res => {
        this.filtredCongeList = res
      })
    })



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
  text: string ="طلب إجازة إستثنائية";
  sendMsgInv(): void {

    this.signalService.GetConnectionByIdUser(this.conge.directeurid).subscribe(res => {
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
    if (this.users.filter(item => item.userId == this.conge.directeurid).length > 0) {
      this.userConnected = true
    }
  }


  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  filtredCongeList2: Conge[] = [];
  CongeList() {
    this.congeService.GetCongeDemand(this.UserIdConnected).subscribe(res => {
      this.filtredCongeList = res
      
      //this.filtredCongeList = this.congeList.filter(item => (item.transferera == "2" || item.transferera == "3" || item.attribut6 == "إعتماد بخصم" || item.attribut6 == "إعتماد بغير خصم") && item.etatrh == "في الانتظار")
      ////this.filtredCongeList = this.filtredCongeList2.filter(item => item.attribut6 == "إعتماد بخصم" || item.attribut6 =="إعتماد بغير خصم")
    })
  }


  conge: Conge = new Conge();
  filesList: CongeFiles[] = [];
  test: boolean = false; 
  populateForm(conge: Conge) {
    this.conge = Object.assign({}, conge);
    this.congeService.formData = Object.assign({}, conge);

    this.congeService.GetByCongesIdCF(this.conge.id).subscribe(res => {
      this.filesList = res
    })
  }

  reduit: string;
  testSolde(event) {
    this.reduit = event.target.value;
  }

  EditSoldeConge() {
    if (this.reduit == 'إعتماد بخصم') {
      this.conge.attribut2 = "إعتماد بخصم"
      this.congeService.CreditSoldeReduit(this.conge.idUserCreator, this.conge.id).subscribe(res => {
        this.toastr.success("تم الخصم من رصيد إجازة الموظف")
        this.msg = " تم الخصم من رصيد إجازة الموظف"

        this.succ = true;
        this.failed = false;

      }, err => {
          this.toastr.error("لم يتم الخصم من رصيد إجازة الموظف ", "فشل")

          this.msg = "  فشل عند التحديث"

          this.failed = true;
          this.succ = false;

      })
    } if (this.reduit == 'إعتماد بغير خصم') {
      this.conge.attribut2 = "إعتماد بغير خصم"
      this.congeService.PutObservableE(this.conge).subscribe(res => {
        this.toastr.success("تم التحديث بنجاح")
        this.msg = " إعتماد بغير خصم"

        this.succ = true;
        this.failed = false;
      }, err => {
          this.toastr.error("لم يتم التحديث ", "فشل")

          this.msg = "  فشل عند التحديث"

          this.failed = true;
          this.succ = false;

      })
    }
  }
  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  autoNotif: AutomaticNotification = new AutomaticNotification();
  updateRecord(form: NgForm) {
    this.congeService.EditDemandByRole(this.conge.id, this.etat).subscribe(res => {
      this.conge = res;
      this.congeService.PutObservableE(this.conge).subscribe(res1 => {
        if (this.etat == "موافق" && this.conge.etat != 'موافق') {
          this.autoNotif.serviceId = this.conge.id;
          this.autoNotif.pageUrl = "rh-conge-list"
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "1";
          this.text = "طلب إجازة إستثنائية";
          this.signalService.GetConnectionByIdUser(this.conge.directeurid).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.conge.directeurnom;
            this.autoNotif.receiverId = this.conge.directeurid;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
             this.autoNotif.text = "طلب إجازة إستثنائية";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        } if (this.conge.etat == "رفض") {
          this.autoNotif.serviceId = this.conge.id;
          this.autoNotif.pageUrl = "my-list-conge"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "1";
          this.text = " لقد تم رفض طلب الإجازة ";
          this.signalService.GetConnectionByIdUser(this.conge.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.conge.userNameCreator;
            this.autoNotif.receiverId = this.conge.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.text = " لقد تم رفض طلب الإجازة ";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }
        if (this.conge.etat == "موافق") {
          this.autoNotif.serviceId = this.conge.id;
          this.autoNotif.pageUrl = "my-list-conge"
          this.autoNotif.userType = "0";
          this.autoNotif.reponse = "1";
          this.text = " لقد تمت الموافقة على طلب الإجازة ";
          this.signalService.GetConnectionByIdUser(this.conge.idUserCreator).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.conge.userNameCreator;
            this.autoNotif.receiverId = this.conge.idUserCreator;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.text = " لقد تمت الموافقة على طلب الإجازة";
            this.autoNotif.vu = "0";


            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        }
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.msg = "  تم التحديث بنجاح"

        this.succ = true;
        this.failed = false;

        this.CongeList();
        if (this.conge.type == "إجازة إستثنائية" || this.conge.type == "إجازة إعتيادية" || this.conge.type == "إجازة إضطرارية") {
          this.congeService.TestTheLastUser(this.conge.id).subscribe(res => {
            this.test = res
          })
      }
      }, err => {
          this.toastr.error('لم يتم التحديث  ', ' فشل');
          this.msg = "  فشل عند التحديث"

          this.failed = true;
          this.succ = false;
      })

      if (this.etat == "موافق") {

      }
    })
  }

  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';
  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }


  //Download

  public download(filepath) {
    this.downloadStatus.emit({ status: ProgressStatusEnum.START });
    this.serviceupload.downloadFile(filepath).subscribe(
      data => {
        switch (data.type) {
          case HttpEventType.DownloadProgress:
            this.downloadStatus.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
            break;
          case HttpEventType.Response:
            this.downloadStatus.emit({ status: ProgressStatusEnum.COMPLETE });
            const downloadedFile = new Blob([data.body], { type: data.body.type });
            const a = document.createElement('a');
            a.setAttribute('style', 'display:none;');
            document.body.appendChild(a);
            a.download = filepath;
            a.href = URL.createObjectURL(downloadedFile);
            a.target = '_blank';
            a.click();
            document.body.removeChild(a);
            break;
        }
      },
      error => {
        this.downloadStatus.emit({ status: ProgressStatusEnum.ERROR });
      }
    );
  }
}
