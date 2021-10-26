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

@Component({
  selector: 'app-change-rib-add',
  templateUrl: './change-rib-add.component.html',
  styleUrls: ['./change-rib-add.component.css']
})
export class ChangeRibAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private demService: ChangerRibService,
    private filesService: FilesChangerRibService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
  }

  //Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName
    })
  }


  //Submit

  dem: ChangerRib = new ChangerRib();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();


  onSubmit(form: NgForm) {
    if (form.invalid && this.fileslist.length != 0) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("الرجاء إدخال جميع الحقول")
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.dateenreg = this.date;
      this.dem.etat = "في الانتظار";
      this.dem.etatrh = "في الانتظار";
      this.dem.idUserCreator = this.UserIdConnected;
      this.dem.userNameCreator = this.UserNameConnected;

      this.demService.Create(this.dem).subscribe(res => {
        this.pj.idDem = res.id;
        this.fileslist.forEach(item => {
          this.pj.path = item;

          this.filesService.Create(this.pj).subscribe(res => {
            this.serviceupload.refreshList();
            this.GetFileName();
          })

        })
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.fileslist = [];
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
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
  public pj: FilesChangerRib = new FilesChangerRib();
  public pjs: FilesChangerRib[];
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
