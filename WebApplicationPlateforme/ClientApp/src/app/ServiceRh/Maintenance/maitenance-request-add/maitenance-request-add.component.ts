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

@Component({
  selector: 'app-maitenance-request-add',
  templateUrl: './maitenance-request-add.component.html',
  styleUrls: ['./maitenance-request-add.component.css']
})
export class MaitenanceRequestAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private mnService: MaintenanceRequestService,
    private toastr: ToastrService,
    private tblService: TbListeningService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private privilegesService: PrivilegesService,
    private http: HttpClient,
    private rootUrl: PathSharedService
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getpannelist();
    this.getFiles();
  }


 // Get User Connected


  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.mnr.idUserCreator = res.id;
      this.mnr.userNameCreator = res.fullName;
      this.mnr.attribut2 = res.nomAdministration
    })

  }

  //Get Panne Lists

  panneList: TbListening[] = [];
  getpannelist() {
    this.tblService.GetP().subscribe(res => {
      this.panneList = res
    }
      )
  }

  mnr: MaintenanceRequest = new MaintenanceRequest();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.mnr.dateenreg = this.date;
      this.mnr.etat = "في الإنتظار"
      this.fileslist.forEach(item => {
        this.mnr.photoPanne = item;
      })

      this.mnService.Add(this.mnr).subscribe(res => {
        form.resetForm();
        this.files1 = [];
        this.toastr.success("تم تسجيل  الطلب بنجاح", " تسجيل ");
      },
        err => {
          this.toastr.error("فشل تسجيل  الطلب", " تسجيل ")
        }
      )
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
      console.log(this.fileslist)
    }
  }
}
