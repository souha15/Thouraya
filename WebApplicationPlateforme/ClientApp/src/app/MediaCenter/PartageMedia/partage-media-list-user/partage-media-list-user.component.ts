import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { FilesPartageMedia } from '../../../shared/Models/MediaCenter/PartageMedia/files-partage-media.model';
import { PartageMedia } from '../../../shared/Models/MediaCenter/PartageMedia/partage-media.model';
import { PartageMediaService } from '../../../shared/Services/MediaCenter/PartageMedia/partage-media.service';
import { FilesPartageMediaService } from '../../../shared/Services/MediaCenter/PartageMedia/files-partage-media.service';

@Component({
  selector: 'app-partage-media-list-user',
  templateUrl: './partage-media-list-user.component.html',
  styleUrls: ['./partage-media-list-user.component.css']
})
export class PartageMediaListUserComponent implements OnInit {


  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: PartageMediaService,
    private filesService: FilesPartageMediaService,
    public serviceupload: UploadDownloadService,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
    this.GetDemandList();
    this.SettingsList();
  }


  p: Number = 1;
  count: Number = 5;


  /* Demand List */

  DemandListGlobal: PartageMedia[] = [];
  DemandList: PartageMedia[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })

  }
  /* Populate Form */


  oc: boolean = false;
  ho: boolean = false;
  Id: number;
  populateForm(dem: PartageMedia) {
    this.dem = Object.assign({}, dem);
    this.Id = this.dem.id;
    this.GetfilesList();
  }

  // Files List
  listfiles: FilesPartageMedia[] = [];
  Listfiles: FilesPartageMedia[] = [];
  TestListFiles: boolean = false;
  GetfilesList() {
    this.filesService.List().subscribe(res => {
      this.Listfiles = res;
      this.listfiles = this.Listfiles.filter(item => item.idPartageMedia == this.Id)
      if (this.listfiles.length != 0) {
        this.TestListFiles = true;
      } else {
        this.TestListFiles = false;
      }
    })
  }

  del(Id) {
    this.filesService.Delete(Id).subscribe(res => {
      this.GetfilesList();
    })
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
      this.idEtab = res.idDepartement;
      this.nomEtab = res.nomDepartement;
    })

  }

  /** Get Type ExThechnique **/

  settingList: TbListening[] = [];
  settingList2: TbListening[] = [];

  SettingsList() {
    this.menuSettings.GetPartageMedia().subscribe(res => {
      this.settingList = res;
    })
  }

  /** OnSubmit **/

  dem: PartageMedia = new PartageMedia();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;

      this.demService.PutObservableE(this.dem).subscribe(res => {
        this.pj.idPartageMedia = this.Id;
        this.fileslist.forEach(item => {
          this.pj.path = item;

          this.filesService.Create(this.pj).subscribe(res => {
            this.serviceupload.refreshList();
            this.GetFileName();
          })

        })
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.GetDemandList();
        this.fileslist = [];
        this.TestListFiles = false;
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }

  occ: boolean = false;
  getOccasion(event) {

    if (event.target.value == "أخرى") {
      this.occ = true;

    } else {
      this.occ = false;

    }



  }

  sm: boolean = false;
  getSocialMedia(event) {

    if (event.target.value == "أخرى") {
      this.sm = true;

    } else {
      this.sm = false;

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
  public pj: FilesPartageMedia = new FilesPartageMedia();
  public pjs: FilesPartageMedia[];
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
      let ext: string;
      ext = this.file.name.substring(this.file.name.indexOf('.') + 1);

      if (ext == "pdf" || ext == "txt" || ext == 'doc' || ext == "docx") {
        this.fileslist.push(this.file.name);
      } else {
        this.toastr.warning("يجب ارفاق رابط الملف", "");
      }


    }
  }
}
