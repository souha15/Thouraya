import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Output, Input } from '@angular/core';
import { CongeService, CongeFiles } from '../../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { SoldeCongeService } from '../../../shared/Services/Rh/solde-conge.service';
import { SoldeConge } from '../../../shared/Models/RH/solde-conge.model';
import { NotifService } from '../../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../../shared/Models/NotifSystem/notif.model';
import { HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { SignalRService, connection, AutomaticNotification } from '../../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-validate-conge',
  templateUrl: './validate-conge.component.html',
  styleUrls: ['./validate-conge.component.css']
})
export class ValidateCongeComponent implements OnInit {

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private soldeCongeService: SoldeCongeService,
    private notifService: NotifService,
    public serviceupload: UploadDownloadService,
    private signalService: SignalRService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }
  p: Number = 1;
  count: Number = 5;
  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
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

  // Get Etab Fin List Comptable
  ComptaList: UserDetail[] = [];
  dirId: string;
  dirName: string;
  GetEtabFinList() {
    this.UserService.GetEtabFinList().subscribe(res => {
      this.ComptaList = res; 
    })
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = " تمت الموافقة على طلب الإجازة  من قبل  " + res.fullName
      this.notif.serviceName = "طلب إجازة"
      this.notif.readUnread = "0";

    })

  }

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => item.etatd == "موافق" && item.attribut6 == "في الانتظار" && item.transferera == null)
    })
  }


  per: Conge = new Conge();
  soldecongel: SoldeConge[] = [];
  soldecongel1: SoldeConge[] = [];
  soldeconge: SoldeConge = new SoldeConge();
  solde2: SoldeConge = new SoldeConge();
  soldeconge1: SoldeConge[] = [];
  soldexist: boolean = false;
  solde: string;
  filesList: CongeFiles[] = [];
  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.solde = this.per.adr
    this.congeService.formData = Object.assign({}, conge)

    this.soldeCongeService.Get().subscribe(res => {
      this.soldecongel1 = res
      this.soldeconge1 = this.soldecongel1.filter(item => item.idUserCreator == this.per.idUserCreator);
      if (this.soldecongel1.length > 0) {

        this.solde2 = this.soldecongel1[this.soldecongel1.length - 1];
      }

      this.soldeCongeService.Get().subscribe(res => {
        this.soldecongel = res
        this.soldecongel.filter(item => item.idUserCreator == this.per.idUserCreator);
        this.soldeconge = this.soldecongel[this.soldecongel.length - 1];
        this.sc = this.soldecongel[this.soldecongel.length - 1]
        console.log(this.sc)
      })
    })

    this.congeService.GetByCongesIdCF(this.per.id).subscribe(res => {
      this.filesList = res
    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  conge: Conge = new Conge();

  updateRecord1(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.attribut5 = this.date;
    this.congeService.formData.attribut3 = this.UserIdConnected;
    this.congeService.formData.attribut4 = this.UserNameConnected;
    if (this.etat == "رفض") {
      this.congeService.formData.attribut6 = "رفض"
    } else {


      this.congeService.formData.attribut6 = "إعتماد بغير خصم"
      this.congeService.formData.etat = "70%";
    }
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }
  sc: SoldeConge = new SoldeConge()
  updateRecord2(form: NgForm) {


    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.attribut5 = this.date;
    this.congeService.formData.attribut6 = "إعتماد بخصم"
    this.congeService.formData.etat = "70%";
    this.congeService.formData.attribut3 = this.UserIdConnected;
    this.congeService.formData.attribut4 = this.UserNameConnected;
    this.congeService.Edit().subscribe(res => {

      if (this.per.type == "إجازة سنوية") {
        this.sc.dateenreg = this.date;

        let solde = +this.soldeconge.soldenormal - +this.per.duree
        this.sc.soldenormal = solde.toString();

        this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.CongeList();
        })

      }
      if (this.per.type == "إجازة إضطرارية") {

        this.sc.dateenreg = this.date;
        let solde = +this.soldeconge.soldeurgent - +this.per.duree
        this.sc.soldeurgent = solde.toString();
        this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.CongeList();
        })

      }

      if (this.per.type == "إجازة إستثنائية") {

        this.sc.dateenreg = this.date;
        let solde = +this.soldeconge.soldemaladie - +this.per.duree
        this.sc.soldemaladie = solde.toString();
        this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
          this.toastr.success('تم التحديث بنجاح', 'نجاح')
          this.resetForm();
          this.CongeList();
        })

      }

    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }

  onSubmit(form: NgForm) {

    if (this.etat == "إعتماد بخصم") {
      this.updateRecord2(form)
    } else {
      this.updateRecord1(form)
    }

  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      transferera: '',
      transfereretab: '',
      transfertrh: '',
      transfertdeux: '',
      datetransfert: '',
      idtrh: '',
      idtetab: '',
      nomtrh: '',
      nomtetab: '',
      etatetab: '',
      dateetab: '',
      tran1: '',
      tran2: '',
      tran3: '',
      tran4: '',
      tran5: '',
      tran6: '',
      datedebut: '',
      datefin: '',
      duree: '',
      tel: '',
      type: '',
      adr: '',
      idremplacant: '',
      nomremplacant: '',
      etat: '',
      etatd: '',
      etatrh: '',
      directeurid: '',
      directeurnom: '',
      rhid: '',
      rhnom: '',
      dated: '',
      daterh: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

    }
  }
  notif2: Notif = new Notif();
  transfererA: string;
  transfertData(event) {
    this.transfererA = event.target.value;
    if (this.transfererA == '1') {

      this.notif.serviceId = 5;
      this.UserService.GetEtabFin().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })
    }
    if (this.transfererA == "2") {
      this.notif.serviceId = 6;
      this.UserService.GetRhDepartement().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })
    }

  }


  autoNotif: AutomaticNotification = new AutomaticNotification();
  transferer() {
    this.per.transferera = this.transfererA;
  
    this.congeService.PutObservableE(this.per).subscribe(res => {
      if (this.transfererA == '1') {
        this.UserService.GetEtabFinList().subscribe(res => {
          this.ComptaList = res
          let rand = Math.floor(Math.random() * (1 - 0 + 1) + 0);
          this.dirId = this.ComptaList[rand].id
          this.dirName = this.ComptaList[rand].fullName
          //Send Notification
          this.text = "لقد تم تحويل طلب الإجازة من مدير إدارة المالية إلى قسم المحاسبة";
          this.autoNotif.serviceId = this.per.id;
          this.autoNotif.pageUrl = "salaire-report-print"
          this.autoNotif.userType = "5";
          this.autoNotif.reponse = "1";
          this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dirName;
            this.autoNotif.receiverId = this.dirId;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.text = "لقد تم تحويل طلب الإجازة من مدير إدارة المالية إلى قسم المحاسبة";
            this.autoNotif.vu = "0";
          

            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })
        this.notif.serviceId = 5;
        this.UserService.GetEtabFin().subscribe(resDir => {
          this.notif.userReceiverId = resDir.id;
          this.notif.userReceiverName = resDir.fullName;

        })
      }
      if (this.transfererA == "2") {
        this.notif.serviceId = 6;
        this.UserService.GetRhDepartement().subscribe(resDir => {
          this.notif.userReceiverId = resDir.id;
          this.notif.userReceiverName = resDir.fullName;
          this.autoNotif.serviceId = this.per.id;
          this.autoNotif.pageUrl = "rh-conge-list"
          this.autoNotif.userType = "3";
          this.autoNotif.reponse = "1";
          this.text = "لقد تم تحويل طلب الإجازة من مدير إدارة المالية إلى  شؤون الموظفين ";

          this.signalService.GetConnectionByIdUser(this.notif.userReceiverId).subscribe(res1 => {
            this.userOnline = res1;
            this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
              .catch(err => console.error(err));
          }, err => {
            this.autoNotif.receiverName = this.dirName;
            this.autoNotif.receiverId = this.dirId;
            this.autoNotif.transmitterId = this.UserIdConnected;
            this.autoNotif.transmitterName = this.UserNameConnected;
            this.text = "لقد تم تحويل طلب الإجازة من مدير إدارة المالية إلى  شؤون الموظفين ";
            this.autoNotif.vu = "0";
      

            this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

            })
          })
        })

      }
      this.notifService.Add(this.notif).subscribe(res => {
        this.toastr.success("تم  تحويل  الطلب بنجاح", "نجاح");
        this.CongeList();
      })
    },
      err => {
        this.toastr.warning('لم يتم  تحويل  الطلب بنجاح', ' فشل');
      })
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

