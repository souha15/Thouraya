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
console.log(this.c)
    })
  }

  // Download

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


  //Files
  public pj: ConfigFrontSystem = new ConfigFrontSystem();

  public pjs: ConfigFrontSystem[];


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

  url: any;
  file1: any;
  file2: any;
  file3: any;
  file4: any;
  file5: any;
  fileslist1: string[] = [];
  filelist: ConfigFrontSystem[] = [];

  filetest: boolean = false;
  public upload1(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file1 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file1).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
     



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist1[0] = this.file1.name;
      this.c.icon1 = this.fileslist1[0];
      this.configService.PutObservableE(this.c).subscribe(res => {
        this.getConfig();
        this.toastr.success("نجاح في إضافة شعار الجمعية")
      },
        err => {
          this.toastr.error("فشل في إضافة شعار الجمعية")
        })
    }
  }

  public upload2(event) {
    console.log("before")
    if (event.target.files && event.target.files.length > 0) {
      console.log("after")
      this.file1 = event.target.files[0];
      console.log(this.file1)
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file1).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );

      this.fileslist1[1] = this.file1.name;
      this.c.homeBackground = this.fileslist1[1]
      console.log(this.file1.name)
      console.log(this.c.homeBackground)
      this.configService.PutObservableE(this.c).subscribe(res => {
        this.getConfig();
        this.toastr.success("نجاح في إضافةالخلفية")
      },
        err => {
          this.toastr.error("فشل في إضافة الخلفية")
        })

    }
  }

  public upload3(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file3).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist1[2] = this.file1.name;
      this.c.reportRightIcon = this.fileslist1[2]
    
      this.configService.PutObservableE(this.c).subscribe(res => {
        this.getConfig();
        this.toastr.success("نجاح في إضافة شعار التقارير (الأيمن)")
      },
        err => {
          this.toastr.error("فشل في إضافة شعار التقارير (الأيمن)")
        })
    }
  }


  public upload4(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file4).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist1[3] = this.file1.name;
      this.c.reportLeftIcon = this.fileslist1[3]
   
      this.configService.PutObservableE(this.c).subscribe(res => {
        this.getConfig();
        this.toastr.success("نجاح في إضافة شعار شعار التقارير (الأيسر)")
      },
        err => {
          this.toastr.error("فشل في إضافة شعار التقارير (الأيسر)")
        })
    }
  }

  public upload5(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file5 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file5).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist1[4] = this.file1.name;
      this.c.reportSignature = this.fileslist1[4]
      this.configService.PutObservableE(this.c).subscribe(res => {
        this.getConfig();
        this.toastr.success("نجاح في إضافة الإمضاء")
      },
        err => {
          this.toastr.error("فشل في إضافة الإمضاء")
        })
    }
  }
}
