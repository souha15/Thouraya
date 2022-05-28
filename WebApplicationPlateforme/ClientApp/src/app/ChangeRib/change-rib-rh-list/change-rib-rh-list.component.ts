import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ChangerRib } from '../../shared/Models/ChangeRib/changer-rib.model';
import { ChangerRibService } from '../../shared/Services/ChangeRib/changer-rib.service';
import { FilesChangerRibService } from '../../shared/Services/ChangeRib/files-changer-rib.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ServiceBanque } from '../../shared/Models/Comptes/service-banque.model';
import { ServiceBanqueLisComponent } from '../../Comptes/service-banque-lis/service-banque-lis.component';
import { ServiceBanqueService } from '../../shared/Services/Comptes/service-banque.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { FilesChangerRib } from '../../shared/Models/ChangeRib/files-changer-rib.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-change-rib-rh-list',
  templateUrl: './change-rib-rh-list.component.html',
  styleUrls: ['./change-rib-rh-list.component.css']
})
export class ChangeRibRhListComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private demService: ChangerRibService,
    private filesService: FilesChangerRibService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList();
  }
  p: Number = 1;

  count: Number = 5;
  //Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  user: UserDetail = new UserDetail();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName
      
    })
  }
  /* Demand List */

  DemandListGlobal: ChangerRib[] = [];
  DemandList: ChangerRib[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res
      this.DemandList = this.DemandListGlobal.filter(item => item.etatrh == "في الانتظار")

    })
  }
  /* Populate Form */

  dem: ChangerRib = new ChangerRib();
  oc: boolean = false;
  ho: boolean = false;
  Id: number;
  populateForm(dem: ChangerRib) {
    this.dem = Object.assign({}, dem);
    this.Id = this.dem.id;
    this.GetfilesList();
    this.UserService.GetUserById(this.dem.idUserCreator).subscribe(res => {
      this.user = res
    })
  }

  // Files List
  listfiles: FilesChangerRib[] = [];
  Listfiles: FilesChangerRib[] = [];
  TestListFiles: boolean = false;
  GetfilesList() {
    this.filesService.List().subscribe(res => {
      this.Listfiles = res;
      this.listfiles = this.Listfiles.filter(item => item.idDem == this.Id)
      if (this.listfiles.length != 0) {
        this.TestListFiles = true;
      } else {
        this.TestListFiles = false;
      }
    })
  }
  /*** Accepter *****/

  date = new Date().toLocaleDateString();
  accept() {
    this.dem.etatrh = "موافقة"
    this.dem.daterh = this.date
    this.dem.idrh = this.UserIdConnected;
    this.dem.nomrh = this.UserNameConnected;
    this.user.dateQualification = this.dem.rib
    this.user.faculteEcole = this.dem.nomBanque
    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.UserService.PutObservable(this.user).subscribe(res => {
        this.GetDemandList();
        this.toastr.success("تم  قبول الطلب بنجاح و تعديل بيانات الموظف", "نجاح");
      })

    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }

  /**  Refuser **/

  refuse() {
    this.dem.etatrh = "رفض"
    this.dem.daterh = this.date
    this.dem.idrh = this.UserIdConnected;
    this.dem.nomrh = this.UserNameConnected;

    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
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
