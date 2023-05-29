import { Component, OnInit, Input, EventEmitter, ElementRef, ViewChild, Output } from '@angular/core';
import { ConfigFrontSystem } from '../../shared/Models/ConfigSystemShowing/config-front-system.model';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { ConfigSystemFrontservice } from '../../shared/Services/ConfigSystemShowing/config-front-system.service';

@Component({
  selector: 'app-config-front-system-crud',
  templateUrl: './config-front-system-crud.component.html',
  styleUrls: ['./config-front-system-crud.component.css']
})
export class ConfigFrontSystemCrudComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('inputFile1') inputFile1: ElementRef;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  constructor(private configService: ConfigSystemFrontservice,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getConfig();
    this.getFiles();
  }

  //getConfig
  c: ConfigFrontSystem = new ConfigFrontSystem();
  List: ConfigFrontSystem[] = [];
  getConfig() {
    this.configService.Get().subscribe(res => {
      this.List = res;
      this.c = this.List[0];
      if (this.c.loginText != null) {
        this.nameArabic = this.c.loginText;
      }
      if (this.c.icon8 != null) {
        this.nameEnglish = this.c.icon8
      }

      if (this.c.icon1 != null) {

      } if (this.c.homeBackground != null) {

      } if (this.c.reportRightIcon != null) {

      } if (this.c.reportLeftIcon != null) {

      } if (this.c.reportSignature != null) {

      }

    })
  }

  nameArabic: string;
  getNameArabic(event) {
    this.nameArabic = event.target.value;
  }

  nameEnglish: string;
  getNameEnglish(event) {
    this.nameEnglish = event.target.value;
  }
  succ: boolean = false;
  failed: boolean = false;
  msg: string;

  onSubmit() {
    if (this.fileslist1.length != 0) {
      this.c.icon1 = this.fileslist1[0];
    }
    if (this.fileslist2.length != 0) {
      this.c.homeBackground = this.fileslist2[0];

    }
    if (this.fileslist3.length != 0) {
      this.c.reportRightIcon = this.fileslist3[0];

    }
    if (this.fileslist4.length != 0) {
      this.c.reportLeftIcon = this.fileslist4[0];

    }
    if (this.fileslist5.length != 0) {
      this.c.reportSignature = this.fileslist5[0];

    }
    this.c.loginText = this.nameArabic;
    this.c.icon8 = this.nameEnglish;
      this.configService.PutObservableE(this.c).subscribe(res => {
        this.succ = true;
        this.failed = false;
        this.msg = "  نجاح  إضافة المرفقات"
      }, err => {
          this.failed = true;
          this.succ = false;

          this.msg = " فشل  إضافة المرفقات "})
    

   
  }


  //get List of Files
  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public files: string[];
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


  // onSelect On remove files
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  files4: File[] = [];
  files5: File[] = [];
  onSelect1(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove1(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect2(event) {
    //console.log(event);
    this.files2.push(...event.addedFiles);
  }

  onRemove2(event) {
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  onSelect3(event) {
    //console.log(event);
    this.files3.push(...event.addedFiles);
  }

  onRemove3(event) {
    this.files3.splice(this.files3.indexOf(event), 1);
  }


  onSelect4(event) {
    //console.log(event);
    this.files4.push(...event.addedFiles);
  }

  onRemove4(event) {
    this.files4.splice(this.files4.indexOf(event), 1);
  }

  onSelect5(event) {
    //console.log(event);
    this.files5.push(...event.addedFiles);
  }

  onRemove5(event) {
    this.files5.splice(this.files5.indexOf(event), 1);
  }

  //Upload
  url: any;
  file: any;
  fileslist1: string[] = [];
  public upload1(event) {
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
      this.fileslist1.push(this.file.name);
    }
  }

  fileslist2: string[] = [];
  public upload2(event) {
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
      this.fileslist2.push(this.file.name);
    }
  }

  fileslist3: string[] = [];
  public upload3(event) {
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
      this.fileslist3.push(this.file.name);
    }
  }

  fileslist4: string[] = [];
  public upload4(event) {
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
      this.fileslist4.push(this.file.name);
    }
  }

  fileslist5: string[] = [];
  public upload5(event) {
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
      this.fileslist5.push(this.file.name);
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
