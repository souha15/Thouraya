import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { MaintenanceRequestService } from '../../../shared/Services/ServiceRh/maintenance-request.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { PrivilegesService } from '../../../shared/Services/User/privileges.service';
import { PathSharedService } from '../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { MaintenanceRequest } from '../../../shared/Models/ServiceRh/maintenance-request.model';
import { NgForm } from '@angular/forms';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-maitenance-request-mecanical-list',
  templateUrl: './maitenance-request-mecanical-list.component.html',
  styleUrls: ['./maitenance-request-mecanical-list.component.css']
})
export class MaitenanceRequestMecanicalListComponent implements OnInit {


  filter;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private mnService: MaintenanceRequestService,
    private toastr: ToastrService,
    private tblService: TbListeningService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private privilegesService: PrivilegesService,
    private http: HttpClient,
    private rootUrl: PathSharedService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>(); 
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getCreance();
    this.getUsersList();
  }



  // GetUsersLis
  UsersLis: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersLis = res
    })
  }

  username: string
  userid: string;
  userselected(event) {
    this.userid = event.target.value
    this.UserService.GetUserById(this.userid).subscribe(res => {
      this.username = res.fullName
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }


  accept() {
 
    if (this.fact.etat != "تم التحويل") {
      this.fact.etattrans = "غير منجزة"
      this.fact.etat = "تم التحويل"
      this.fact.datetrans = this.date;
      this.fact.tarnsid = this.userid;
      this.fact.transnom = this.username;
      this.fact.attribut3 = this.UserIdConnected;
      this.fact.attribut4 = this.UserNameConnected
      this.fact.attribut5 = this.date
      this.mnService.PutObservableE(this.fact).subscribe(res => {
        this.getCreance();
        this.toastr.success("تم تحويل بنجاح", "نجاح");
      },
        err => {
          this.toastr.warning('لم يتم تحويل', ' فشل');
        })
  }else{
      this.toastr.warning('لقد تم تحويل الطلب مسبقا', ' فشل');
}
  }
  refuse() {
   
    if (this.fact.etat != "تم استلام الطلب") {
      this.fact.etatmec = "تم استلام الطلب"
      this.fact.etat = "تم استلام الطلب"
      this.fact.datemec = this.date;
      this.fact.idmec = this.UserIdConnected;
      this.fact.nommec = this.UserNameConnected;
      this.mnService.PutObservableE(this.fact).subscribe(res => {
        this.getCreance();
        this.toastr.success("تم استلام الطلب بنجاح", "نجاح");
      },
        err => {
          this.toastr.warning('لم يتم استلام الطلب', ' فشل');
        })
    } else {
      this.toastr.warning(' الطلب مستلم', ' فشل');
    }
  }

  date = new Date().toLocaleDateString();

  //Populate Form 
  factId: number
  fact: MaintenanceRequest = new MaintenanceRequest();
  etatok: boolean;
  cheque: boolean = false;
  banque: boolean = false;
  populateForm(facture: MaintenanceRequest) {
    this.mnService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

    if (this.fact.etat == "في الإنتظار") {
      this.etatok = false;
    } else
      this.etatok = true
  }

  factList: MaintenanceRequest[] = [];
  GfactList: MaintenanceRequest[] = [];

  getCreance() {
    this.mnService.Get().subscribe(res => {
      this.factList = res;
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
