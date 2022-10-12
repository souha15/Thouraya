import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { CongeService, CongeFiles } from '../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Conge } from '../../shared/Models/RH/conge.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { DatePipe } from '@angular/common';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { SignalRService, connection, AutomaticNotification } from '../../shared/Services/signalR/signal-r.service';

@Component({
  selector: 'app-dem-conge-marriage',
  templateUrl: './dem-conge-marriage.component.html',
  styleUrls: ['./dem-conge-marriage.component.css']
})
export class DemCongeMarriageComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private congeService: CongeService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private notifService: NotifService, private rootUrl: PathSharedService,
    private http: HttpClient,
    public serviceupload: UploadDownloadService,
    private signalService: SignalRService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }


  ngOnInit(): void {
    this.getUserConnected();
    this.UserList();
    const datePipe = new DatePipe('en-Us');
    this.today = datePipe.transform(new Date(), 'yyyy-MM-dd');
    this.getFiles();

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
  today;

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

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  userc: UserDetail = new UserDetail();
  notif: Notif = new Notif();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      if (res.attribut1 != null) {
        this.conge.directeurnom = res.directeur;
        this.conge.directeurid = res.attribut1;
        this.notif.userReceiverId = res.attribut1;
        this.notif.userReceiverName = res.directeur;
        this.dirId = res.attribut1;
        this.dirName = res.directeur
      }
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب إجازة زواج من الموظف  " + res.fullName
      this.notif.readUnread = "0";
      this.conge.userNameCreator = res.fullName;
      this.conge.idUserCreator = res.id;

    })

  }

  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }

  //get Remplaçant Name

  getRemplacant(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.conge.nomremplacant = res.fullName

    })
  }


  //date fin
  datef;
  cdates: boolean = false;
  tdatefin(event) {
    this.datef = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0

    } else {
      this.cdates = false;
      if (this.dated == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }


  }

  //date debut
  dated;
  tdatedebut(event) {
    this.dated = event.target.value;
    this.comparedates();
    if (this.testdates == "bad") {
      this.cdates = true;
      this.diffDays = 0

    } else {
      this.cdates = false;
      if (this.datef == null) {
        this.diffDays = 0
      } else {
        this.diff();
      }
    }
  }

  //Difference
  diffDays: number = 0;
  testdays: boolean = false;
  diff() {
    let newDated = new Date(this.dated)
    let newDatef = new Date(this.datef);
    var diff = Math.abs(newDated.getTime() - newDatef.getTime());
    this.diffDays = Math.ceil(diff / (1000 * 3600 * 24)) + 1;
    this.conge.duree = this.diffDays.toString();
    if (this.diffDays <= 5) {
      this.testdays = true;
    } else {
      this.testdays = false;
    }

  }

  testdates: string;
  comparedates() {
    let d1 = new Date(this.dated);
    let d2 = new Date(this.datef);
    if (d1.getTime() < d2.getTime()) {
      this.testdates = "good"
    } else if (d1.getTime() > d2.getTime()) {
      this.testdates = "bad"
    } else {
      this.testdates = "equal"
    }
  }


  //Conge Submit
  conge: Conge = new Conge();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  dateTime = new Date();
  onSubmit(form: NgForm) {
    this.conge.dateenreg = this.date;
    this.conge.etat = "5%";
    this.conge.etatd = "في الانتظار";
    this.conge.etatrh = "في الانتظار";
    this.conge.attribut2 = "في الانتظار";
    this.conge.type = "إجازة الزواج"
    this.conge.attribut6 = "في الانتظار";
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true

      if (this.testdays) {
        this.congeService.Add(this.conge).subscribe(
          res => {
            this.notif.serviceId = res.id;
            this.notif.serviceName = "طلب إجازة";
            this.pj.idConge = res.id;
            this.fileslist.forEach(item => {
              this.pj.path = item;
              this.congeService.AddCF(this.pj).subscribe(res => {
                this.Files = [];
                this.bool = false;
              })
            })
            this.notifService.Add(this.notif).subscribe(res => {

            this.diffDays = 0
            this.toastr.success(" تم تقديم الطلب بنجاح", "نجاح");
              form.resetForm();


              this.text = "طلب إجازة زواج";
              this.autoNotif.serviceId = res.id;
              this.autoNotif.pageUrl = "menurequests"
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
                  this.autoNotif.text = "طلب إجازة زواج";
                this.autoNotif.vu = "0";
                this.autoNotif.reponse = "1";

                this.signalService.CreateNotif(this.autoNotif).subscribe(res => {

                })
              })

            })
          },
          err => {
            this.toastr.error("لم يتم تقديم الطلب", "فشل ")
            this.diffDays = 0
          })


      } else {
        this.toastr.error("لا يمكنك تجاوز 5 أيام", "فشل ")
      }
    }



  }
  //Files


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: CongeFiles = new CongeFiles();
  public pjs: CongeFiles[];

  public files: string[];


  Files: File[] = [];

  onSelect(event) {
    //console.log(event);
    this.Files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.Files.splice(this.files.indexOf(event), 1);
  }


  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

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

  //upload 1


  url: any;
  file: any;
  fileslist: string[] = [];
  bool: boolean = false;
  public upload(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
          console.log(error)
        }
      );
      this.fileslist.push(this.file.name);
      if (this.fileslist.length != null) {
        this.bool = true;
      }
    }
  }
  del(dp, i) {
    this.fileslist.splice(this.fileslist.indexOf(dp), 1);
  }
}
