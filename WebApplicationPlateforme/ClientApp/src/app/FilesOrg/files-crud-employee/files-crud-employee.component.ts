import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FilesOrgService } from '../../shared/Services/ServiceRh/files-org.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ToastrService } from 'ngx-toastr';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { PrivilegesService } from '../../shared/Services/User/privileges.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { FilesOrg } from '../../shared/Models/ServiceRh/files-org.model';
import { NgForm } from '@angular/forms';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { FilesUserCin } from '../../shared/Models/ServiceRh/files-user-cin.model';
import { FilesUserCinService } from '../../shared/Services/ServiceRh/files-user-cin.service';
import { FilesUserPasseport } from '../../shared/Models/ServiceRh/files-user-passeport.model';

@Component({
  selector: 'app-files-crud-employee',
  templateUrl: './files-crud-employee.component.html',
  styleUrls: ['./files-crud-employee.component.css']
})
export class FilesCrudEmployeeComponent implements OnInit {
  filter;

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  constructor(private filesUser: FilesUserCinService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private privilegesService: PrivilegesService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private toastr: ToastrService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
    this.getfiles();
    this.GetUsersList();
  }




  // Get User Connected


  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  UsersList: UserDetail[] = [];
  Gcinlist: FilesUserCin[] = [];
  cinlist: FilesUserCin[] = [];
  passlist: FilesUserCin[] = [];
  contratlist: FilesUserCin[] = [];
  contrat: boolean = false;
  cin: boolean = false;
  pass: boolean = false;
  el: FilesUserPasseport = new FilesUserPasseport()
  ellist: FilesUserPasseport[] = [];
  iduser: string;

  GetUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.UsersList = res
      this.filesUser.Get().subscribe(res => {
        this.Gcinlist = res
        this.cinlist = [];
        this.passlist = [];
        this.contratlist = [];
      })
    })


  }

  getfiles() {
    this.filesUser.Get().subscribe(res => {
      this.Gcinlist = res
    })
  }
  getpass(id: string): boolean {
    this.passlist = [];
    this.pass = false;
    this.passlist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "جواز السفر")

    if (this.passlist.length > 0) {
      this.pass = true;
    } else {
      this.pass = false
    }
    return this.pass
  }
  getcontrat(id: string): boolean {
    this.contratlist = [];
    this.contrat = false;
    this.contratlist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "عقد العمل")
    if (this.contratlist.length > 0) {
      this.contrat = true;
    } else {
      this.contrat = false;
    }

    return this.contrat
  }
  getcin(id: string): boolean {
    this.cinlist = [];
    this.cin = false;
    this.cinlist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "الهوية")
    if (this.cinlist.length > 0) {
      this.cin = true;
    } else {
      this.cin
    }
    return this.cin
  }
  fact: UserDetail = new UserDetail();
  list: FilesUserCin[] = [];
  list2: FilesUserCin[] = [];
  list3: FilesUserCin[] = [];
  list4: FilesUserCin[] = [];
  objectlist2: FilesUserCin = new FilesUserCin();
  objectlist3: FilesUserCin = new FilesUserCin();
  objectlist4: FilesUserCin = new FilesUserCin();
  populateForm(facture: UserDetail) {
    this.UserService.formData = Object.assign({}, facture)
    this.fact = Object.assign({}, facture);
    this.filesUser.Get().subscribe(res => {
      this.list = res;
      this.list2 = this.list.filter(item => item.idUser == this.fact.id && item.attribut2 == "عقد العمل")
      this.list2.forEach(item => {
        this.objectlist2 = item
      }
        
      )

      this.list3 = this.list.filter(item => item.idUser == this.fact.id && item.attribut2 == "الهوية")
      this.list3.forEach(item => {
        this.objectlist3 = item
      }

      )

      this.list4 = this.list.filter(item => item.idUser == this.fact.id && item.attribut2 == "جواز السفر")
      this.list4.forEach(item => {
        this.objectlist4 = item
      }

      )
    })
  }


  date = new Date().toLocaleDateString();
  fe: FilesUserCin = new FilesUserCin();
  onSubmit1() {
    this.fileslist.forEach(item => {
      this.objectlist2.path = item;
    })
    this.objectlist2.idUser = this.fact.id;
    this.objectlist2.userName = this.fact.fullName
    this.objectlist2.date = this.date;
    this.objectlist2.userNameCreator = this.UserNameConnected;
    this.objectlist2.idUserCreator = this.UserIdConnected;
    this.objectlist2.attribut2 = "عقد العمل"

    this.filesUser.PutObservableE(this.objectlist2).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files1 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })
  }

  onSubmit2() {
    this.fileslist2.forEach(item => {
      this.objectlist3.path = item;
    })
    this.objectlist3.idUser = this.fact.id;
    this.objectlist3.userName = this.fact.fullName
    this.objectlist3.date = this.date;
    this.objectlist3.userNameCreator = this.UserNameConnected;
    this.objectlist3.idUserCreator = this.UserIdConnected;
    this.objectlist3.attribut2 = "الهوية"

    this.filesUser.PutObservableE(this.objectlist3).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files2 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })
  }

  onSubmit3() {
    this.fileslist3.forEach(item => {
      this.objectlist4.path = item;
    })
    this.objectlist4.idUser = this.fact.id;
    this.objectlist4.userName = this.fact.fullName
    this.objectlist4.date = this.date;
    this.objectlist4.userNameCreator = this.UserNameConnected;
    this.objectlist4.idUserCreator = this.UserIdConnected;
    this.objectlist4.attribut2 = "جواز السفر"

    this.filesUser.PutObservableE(this.objectlist4).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files3 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })

  }
  //Files1
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
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


  //Upload
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
      console.log(this.fileslist)
    }
  }

  //Upload

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
      console.log(this.fileslist)
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
