import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { ToastrService } from 'ngx-toastr';
import { PlaintService } from '../../shared/Services/User Services/plaint.service';
import { FilesPlaintFilesService } from '../../shared/Services/User Services/plaint-files.service';
import { FilesPlaint } from '../../shared/Models/User Services/files-plaint.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { Plaint } from '../../shared/Models/User Services/plaint.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-plaint-add',
  templateUrl: './plaint-add.component.html',
  styleUrls: ['./plaint-add.component.css']
})
export class PlaintAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private plaintService: PlaintService,
    private FilesService: FilesPlaintFilesService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private toastr: ToastrService,)
  {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
   this.getUserConnected();
    this.UsersList();
    this.getFiles();
  
  }

  //getUsers Lis
  user1: UserDetail []=[]
  user3: UserDetail []=[]
  user: UserDetail []=[]
  userg: UserDetail[] = []
  roleslist: any = [];
  UsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.userg = res
      this.user = this.userg.filter(item => item.position == "مسؤول شؤون توظيف")
      this.user3 = this.userg.filter(item => item.position == "المدير التنفيذي")
    })
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  dirdirect: UserDetail = new UserDetail();
   userrol: UserDetail = new UserDetail();
  dirid: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.dirid = res.attribut1;
      this.UserService.GetUserById(this.dirid).subscribe(res => {
        this.dirdirect = res
        this.user1.push(this.dirdirect)
      })

    })
  }


  //OnSubmit
  pl: Plaint = new Plaint();
  date = new Date().toLocaleDateString();
  id: number;

  onSubmit(form: NgForm) {
    this.pl.datenereg = this.date;
    this.pl.creatorName = this.UserNameConnected;
    this.pl.idUserCreator = this.UserIdConnected;
    this.plaintService.Add(this.pl).subscribe(
      res => {
        this.id = res.id
        // Files

        this.pj.idPlaint = this.id;
        this.fileslist.forEach(item => {
          this.pj.path = item;
          this.FilesService.Add(this.pj).subscribe(res => {
          })

    
        })

        this.files1 = [];

        form.resetForm();
        this.toastr.success("تم تسجيل  بنجاح", " تسجيل ");
      },
      err => {
        this.toastr.error("فشل تسجيل ", " تسجيل ")
      })

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
  public pj: FilesPlaint = new FilesPlaint();
  public pjs: FilesPlaint[];
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
