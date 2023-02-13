import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Montage } from '../../../shared/Models/MediaCenter/Montage/montage.model';
import { MontageService } from '../../../shared/Services/MediaCenter/Montage/montage.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Etablissement } from '../../../shared/Models/Etablissement/etablissement.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { EtablissementService } from '../../../shared/Services/Etablissement/etablissement.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { FilesMontageService } from '../../../shared/Services/MediaCenter/Montage/files-montage.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { FilesMontage } from '../../../shared/Models/MediaCenter/Montage/files-montage.model';
import { FilesImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/files-impression.service';
import { DesignImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/design-impression.service';
import { DesignImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/design-impression.model';
import { FilesImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/files-impression.model';

@Component({
  selector: 'app-design-list-employee',
  templateUrl: './design-list-employee.component.html',
  styleUrls: ['./design-list-employee.component.css']
})
export class DesignListEmployeeComponent implements OnInit {


  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: DesignImpressionService,
    private filesService: FilesImpressionService,
    public serviceupload: UploadDownloadService,
    private etabService: EtablissementService) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList();
    this.getFiles();
  }

  p: Number = 1;
  count: Number = 5;

  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      this.idEtab = res.idDepartement;
      this.nomEtab = res.nomDepartement;
    })

  }


  /* Demand List */

  DemandListGlobal: DesignImpression[] = [];
  DemandList: DesignImpression[] = [];
  DemandList2: DesignImpression[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList2 = this.DemandListGlobal.filter(item => item.transfertEmployee == "1" && item.idEmp == this.UserId)
      this.DemandList = this.DemandList2.filter(item => item.etat == "مرسلة" || item.etat == "مستلمة")

    })
  }


  /* Populate Form */

  dem: DesignImpression = new DesignImpression();

  populateForm(dem: DesignImpression) {
    this.dem = Object.assign({}, dem);

  }
  //Reception
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Reception(form: NgForm) {
    if (this.dem.etat == "مرسلة") {
      this.dem.etat = "مستلمة";
      this.dem.dateReceptiondateEmp = this.date;

      this.demService.PutObservableE(this.dem).subscribe(res => {
        this.toastr.success('تم الإستلام   بنجاح', 'نجاح')
        form.resetForm();
        this.GetDemandList();
        this.succ = true;
        this.failed = false;
        this.msg ="تم الإستلام   بنجاح"
      },
        err => {
          this.toastr.error(' لم يتم الإستلام  ', ' فشل');

          this.failed = true;
          this.succ = false;
          this.msg =" لم يتم الإستلام"
        })
    } else {
      this.toastr.error('تم إستلام الطلب', ' فشل');

      this.failed = true;
      this.succ = false;
      this.msg ="تم إستلام الطلب"
    }
  }

  //Renvoi
  succ: boolean = false;
  failed: boolean = false;
  msg: string = '';

  Renvoi(form: NgForm) {
    if (this.dem.etat == "مستلمة") {
      this.dem.etat = "منجزة";
      this.dem.dateDoneadminEmp = this.date;
      this.dem.tavailfait = "1";
      this.demService.PutObservableE(this.dem).subscribe(res => {
        this.pj.idImpression = this.dem.id;
        this.fileslist.forEach(item => {
          this.pj.path = item;

          this.filesService.Create(this.pj).subscribe(res => {
            this.serviceupload.refreshList();
            this.GetFileName();

          })
        })

        this.toastr.success('تم التسليم    بنجاح', 'نجاح')
        form.resetForm();
        this.GetDemandList();
        this.succ = true;
        this.failed = false;
        this.msg ="تم التسليم    بنجاح"
      },
        err => {
          this.toastr.error(' لم يتم التسليم   ', ' فشل');

          this.failed = true;
          this.succ = false;
          this.msg ="لم يتم التسليم "
        })
    } else {
      this.toastr.error('لم يتم  إستلام الطلب', ' فشل');

      this.failed = true;
      this.succ = false;
      this.msg ="لم يتم  إستلام الطلب"
    }
  }


  //Files
  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }
  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesImpression = new FilesImpression();
  public pjs: FilesImpression[];
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

  //Upload

  //Save it ToDatabase
  Idtransaction: number;
  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
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
        }
      );
      this.fileslist.push(this.file.name);

    }
  }
}
