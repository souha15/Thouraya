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
  selector: 'app-files-employee',
  templateUrl: './files-employee.component.html',
  styleUrls: ['./files-employee.component.css']
})
export class FilesEmployeeComponent implements OnInit {
  filter;

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private filesUser: FilesUserCinService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private privilegesService: PrivilegesService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private toastr: ToastrService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>(); 
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
  passlist2: FilesUserCin[] = [];
  contratlist: FilesUserCin[] = [];
  contratlist2: FilesUserCin[] = [];
  diplomelist: FilesUserCin[] = [];
  diplomelist2: FilesUserCin[] = [];
  emploilist: FilesUserCin[] = [];
  emploilist2: FilesUserCin[] = [];
  debutlist: FilesUserCin[] = [];
  debutlist2: FilesUserCin[] = [];
  formationlist: FilesUserCin[] = [];
  formationlist2: FilesUserCin[] = [];
  contrat: boolean = false;
  cin: boolean = false;
  pass: boolean = false;
  emploi: boolean = false;
  formation: boolean = false;
  debut: boolean = false;
  diplome: boolean = false;
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
        this.emploilist = [];
        this.diplomelist = [];
        this.debutlist = [];
        this.formationlist = [];
      })
    })


  }

  getfiles() {
    this.filesUser.Get().subscribe(res => {
      this.Gcinlist = res
    })
  }


  getDiplome(id: string): boolean {
    this.diplomelist = [];
    this.diplome = false;
    this.diplomelist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "الشهادة")

    if (this.diplomelist.length > 0) {
      this.diplome = true;
    } else {
      this.diplome = false
    }
    return this.diplome
  }

  getEmploi(id: string): boolean {
    this.emploilist = [];
    this.emploi = false;
    this.emploilist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "قرار التعيين")

    if (this.emploilist.length > 0) {
      this.emploi = true;
    } else {
      this.emploi = false
    }
    return this.emploi
  }

  getDebut(id: string): boolean {
    this.debutlist = [];
    this.debut = false;
    this.debutlist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "المباشرة")

    if (this.debutlist.length > 0) {
      this.debut = true;
    } else {
      this.debut = false
    }
    return this.debut
  }

  getFormation(id: string): boolean {
    this.formationlist = [];
    this.formation = false;
    this.formationlist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "الدورات و الخبرات")

    if (this.formationlist.length > 0) {
      this.formation = true;
    } else {
      this.formation = false
    }
    return this.formation
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
  idcin: number;
  getcin(id: string): boolean {
    this.cinlist = [];
    this.cin = false;
    this.cinlist = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "الهوية")
 
  /*  this.cinlist.forEach(item => {
      this.idcin = item.id
      console.log(this.idcin)
    })*/

    if (this.cinlist.length > 0) {
        this.cin = true;
      } else {
        this.cin
    }

    return this.cin
  }
  cinlist1: FilesUserCin[] = [];
  getdata(id) {
    this.cinlist1 = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "الهوية")
    this.cinlist1.forEach(item => {
       this.onDelete(item.id)
      this.GetUsersList();
    })
 
  }

  getdata1(id) {
    this.passlist2 = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "جواز السفر")
    this.passlist2.forEach(item => {
      this.onDelete(item.id)
      this.GetUsersList();
    })

  }

  getdata2(id) {
    this.contratlist2 = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "عقد العمل")
    this.contratlist2.forEach(item => {
      this.onDelete(item.id)
      this.GetUsersList();
    })

  }

  getdata3(id) {
    this.diplomelist2 = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "الشهادة")
    this.diplomelist2.forEach(item => {
      this.onDelete(item.id)
      this.GetUsersList();
    })

  }

  getdata4(id) {
    this.emploilist2 = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "قرار التعيين")
    this.emploilist2.forEach(item => {
      this.onDelete(item.id)
      this.GetUsersList();
    })

  }

  getdata5(id) {
    this.debutlist2 = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "المباشرة")
    this.debutlist2.forEach(item => {
      this.onDelete(item.id)
      this.GetUsersList();
    })

  }


  getdata6(id) {
    this.formationlist2 = this.Gcinlist.filter(item => item.idUser == id && item.attribut2 == "الدورات و الخبرات")
    this.formationlist2.forEach(item => {
      this.onDelete(item.id)
      this.GetUsersList();
    })

  }


  fact: UserDetail = new UserDetail();
  populateForm(facture: UserDetail) {
    this.UserService.formData = Object.assign({}, facture)
    this.fact = Object.assign({}, facture);
  }


  date = new Date().toLocaleDateString();
  fe: FilesUserCin = new FilesUserCin();
  onSubmit1() {
    this.fileslist.forEach(item => {
      this.fe.path = item;
    })
    this.fe.idUser = this.fact.id;
    this.fe.userName = this.fact.fullName
    this.fe.date = this.date;
    this.fe.userNameCreator = this.UserNameConnected;
    this.fe.idUserCreator = this.UserIdConnected;
    this.fe.attribut2 = "عقد العمل"

    this.filesUser.Add(this.fe).subscribe(res => {
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
      this.fe.path = item;
    })
    this.fe.idUser = this.fact.id;
    this.fe.userName = this.fact.fullName
    this.fe.date = this.date;
    this.fe.userNameCreator = this.UserNameConnected;
    this.fe.idUserCreator = this.UserIdConnected;
    this.fe.attribut2 = "الهوية"

    this.filesUser.Add(this.fe).subscribe(res => {
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
      this.fe.path = item;
    })
    this.fe.idUser = this.fact.id;
    this.fe.userName = this.fact.fullName
    this.fe.date = this.date;
    this.fe.userNameCreator = this.UserNameConnected;
    this.fe.idUserCreator = this.UserIdConnected;
    this.fe.attribut2 = "جواز السفر"

    this.filesUser.Add(this.fe).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files3 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })

  }

  onSubmit4() {
    this.fileslist4.forEach(item => {
      this.fe.path = item;
    })
    this.fe.idUser = this.fact.id;
    this.fe.userName = this.fact.fullName
    this.fe.date = this.date;
    this.fe.userNameCreator = this.UserNameConnected;
    this.fe.idUserCreator = this.UserIdConnected;
    this.fe.attribut2 = "الشهادة"

    this.filesUser.Add(this.fe).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files4 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })

  }


  onSubmit5() {
    this.fileslist5.forEach(item => {
      this.fe.path = item;
    })
    this.fe.idUser = this.fact.id;
    this.fe.userName = this.fact.fullName
    this.fe.date = this.date;
    this.fe.userNameCreator = this.UserNameConnected;
    this.fe.idUserCreator = this.UserIdConnected;
    this.fe.attribut2 = "قرار التعيين"

    this.filesUser.Add(this.fe).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files5 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })

  }


  onSubmit6() {
    this.fileslist6.forEach(item => {
      this.fe.path = item;
    })
    this.fe.idUser = this.fact.id;
    this.fe.userName = this.fact.fullName
    this.fe.date = this.date;
    this.fe.userNameCreator = this.UserNameConnected;
    this.fe.idUserCreator = this.UserIdConnected;
    this.fe.attribut2 = "المباشرة"

    this.filesUser.Add(this.fe).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files6 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })

  }


  onSubmit7() {
    this.fileslist7.forEach(item => {
      this.fe.path = item;
    })
    this.fe.idUser = this.fact.id;
    this.fe.userName = this.fact.fullName
    this.fe.date = this.date;
    this.fe.userNameCreator = this.UserNameConnected;
    this.fe.idUserCreator = this.UserIdConnected;
    this.fe.attribut2 = "الدورات و الخبرات"

    this.filesUser.Add(this.fe).subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.GetUsersList();
      this.files7 = [];
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      })

  }

  onDelete(id) {
    this.filesUser.Delete(id).subscribe(res => {
      this.GetUsersList();
    })
  }

  //Files1
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  files4: File[] = [];
  files5: File[] = [];
  files6: File[] = [];
  files7: File[] = [];
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

  onSelect6(event) {
    //console.log(event);
    this.files6.push(...event.addedFiles);
  }

  onRemove6(event) {
    this.files6.splice(this.files6.indexOf(event), 1);
  }

  onSelect7(event) {
    //console.log(event);
    this.files7.push(...event.addedFiles);
  }

  onRemove7(event) {
    this.files7.splice(this.files7.indexOf(event), 1);
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


  //Upload

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

  //Upload

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
      console.log(this.fileslist)
    }
  }

  //Upload

  fileslist6: string[] = [];
  public upload6(event) {
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
      this.fileslist6.push(this.file.name);
      console.log(this.fileslist)
    }
  }

  //Upload

  fileslist7: string[] = [];
  public upload7(event) {
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
      this.fileslist7.push(this.file.name);
      console.log(this.fileslist)
    }
  }
}
