import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { CreanceFinaciereService } from '../../shared/Services/Finance/creance-finaciere.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { PathSharedService } from '../../shared/path-shared.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { CreanceFinanciere } from '../../shared/Models/Finance/creance-financiere.model';
import { PiecesJointesCF } from '../../shared/Models/Finance/pieces-jointes-cf.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { SignalRService, connection, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';


@Component({
  selector: 'app-salaire-menu2',
  templateUrl: './salaire-menu2.component.html',
  styleUrls: ['./salaire-menu2.component.css']
})
export class SalaireMenu2Component implements OnInit {

  filter;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  constructor(private creanceService: CreanceFinaciereService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private signalService: SignalRService) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
    this.getAllPj();

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
  dirId: string;
  dirName: string;
  autoNotif: AutomaticNotification = new AutomaticNotification();
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
  p: Number = 1;
  count: Number = 5;

  UserIdConnected: string;
  UserNameConnected: string;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factList: CreanceFinanciere[] = [];
  GfactList: CreanceFinanciere[] = [];

  getCreance() {
    this.creanceService.Get().subscribe(res => {
      this.GfactList = res;

      this.factList = this.GfactList.filter(item => item.iddirproj == this.UserIdConnected && item.etatdirproj == "في الإنتظار")

    })

  }
 
  //Populate Form 
  factId: number
  fact: CreanceFinanciere = new CreanceFinanciere();
  factur: CreanceFinanciere = new CreanceFinanciere();
  etatok: boolean;
  cheque: boolean = false;
  banque: boolean = false;
  populateForm(facture: CreanceFinanciere) {
    this.creanceService.formData = Object.assign({}, facture)
    this.factId = this.creanceService.formData.id;
    console.log(this.factId)
    this.fact = Object.assign({}, facture);
    this.listPjFiltred = this.listPj.filter(item => item.idCF == this.creanceService.formData.id)
    console.log(this.listPjFiltred)
    console.log(this.listPj)
    if (this.fact.typePayement == "تحويل بنكي") {
      this.banque = true;
    }
    if (this.fact.typePayement == "شيك") {
      this.cheque = true;
    }

  }


  accept() {
    this.fact.etatdirproj = "موافقة"
    this.fact.datedirproj = this.date
    this.fact.iddirproj = this.UserIdConnected;
    this.fact.nomdirproj = this.UserNameConnected;
    this.creanceService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  موافقة الطلب بنجاح", "نجاح");

      this.UserService.GetRhDepartement().subscribe(resDir => {
        this.dirId = resDir.id;
        this.dirName = resDir.fullName
        this.autoNotif.serviceId = this.fact.id;
        this.autoNotif.pageUrl = "cre-finan-list-accepted"
        this.autoNotif.userType = "3";
        this.autoNotif.reponse = "5";
        this.text = "طلب تسديد مستحقات مالية";
        this.autoNotif.receiverName = this.dirName;
        this.autoNotif.receiverId = this.dirId;
        this.signalService.GetConnectionByIdUser(this.dirId).subscribe(res1 => {
          this.userOnline = res1;
          this.signalService.hubConnection.invoke("sendMsg", this.userOnline.signalrId, this.text, this.autoNotif)
            .catch(err => console.error(err));
        }, err => {
          this.autoNotif.receiverName = this.dirName;
          this.autoNotif.receiverId = this.dirId;
          this.autoNotif.transmitterId = this.UserIdConnected;
          this.autoNotif.transmitterName = this.UserNameConnected;
            this.text = "طلب تسديد مستحقات مالية";
            this.autoNotif.vu = "0";
          this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

          })
        })
      })

    },
      err => {
        this.toastr.warning('لم  موافقة الطلب ', ' فشل');
      })
  }

  refuse() {
    this.fact.etatdirproj = "رفض"
    this.fact.etat = "رفض"
    this.fact.datedirproj = this.date
    this.fact.iddirproj = this.UserIdConnected;
    this.fact.nomdirproj = this.UserNameConnected;
    this.creanceService.PutObservableE(this.fact).subscribe(res => {
      this.getCreance();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم  ترفض الطلب ', ' فشل');
      })
  }


  //Get the list of files
  //Get the list of files

  listPj: PiecesJointesCF[] = [];
  listPjFiltred: PiecesJointesCF[] = [];

  getAllPj() {
    this.serviceupload.SearchCf().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idCF == this.factId)
    })

  }
  //Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesCF = new PiecesJointesCF();
  public pjs: PiecesJointesCF[];
  public files: string[];

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }


  //Get file name for Database

  GetFileName() {
    let sa: string;
    let s: any;
    let finalres: any;
    let i: number = 0;
    let tlistnew: any[] = [];
    for (var k = 0; k < this.files.length; k++) {
      sa = <string>this.files[k]
      s = sa.toString().split('uploads\\,', sa.length - 1);
      finalres = s.toString().split('uploads\\', sa.length - 1);

      tlistnew[i] = finalres[1]
      i++;

    }


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
