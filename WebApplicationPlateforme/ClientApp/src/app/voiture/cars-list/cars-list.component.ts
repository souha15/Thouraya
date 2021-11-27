import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { VoitureService } from '../../shared/Services/voiture/voiture.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Voiture } from '../../shared/Models/voiture/voiture.model';
import { NgForm } from '@angular/forms';
import { NotifCarsService } from '../../shared/Services/voiture/notif-cars.service';
import { NotifCars } from '../../shared/Models/voiture/notif-cars.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { FilesCarService } from '../../shared/Services/Supplies/files-car.service';
import { FilesCars } from '../../shared/Models/Supplies/files-cars.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-cars-list',
  templateUrl: './cars-list.component.html',
  styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  filter;
  constructor(
    private recpService: VoitureService,
    private UserService: UserServiceService,
    private toastr: ToastrService,
    private tabService: NotifCarsService,
    private filesCarService: FilesCarService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();

    this.getrecpList();
    this.getEmpList();
  }

  userId: string;
  getUserName(event) {
    this.userId = event.target.value
    this.UserService.GetUserById(this.userId).subscribe(res => {
      this.fact.recepeteur = res.fullName;
    })
  }
  //get Employee List
  usersList: UserDetail[] = [];
  getEmpList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.usersList = res;
    })
  }
  p: Number = 1;
  count: Number = 5;

  factList: Voiture[] = [];
  getrecpList() {
    this.recpService.Get().subscribe(res => {
      this.factList = res
    })
  }

  UserIdConnected: string;
  UserNameConnected: string;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }

  factId: number;
  fact: Voiture = new Voiture();

  tabsList: NotifCars[] = [];
  tabsList2: NotifCars[] = [];
  tabsTest: boolean = false;
  FilessList: FilesCars[] = [];
  FilessList2: FilesCars[] = [];
  populateForm(facture: Voiture) {
    this.recpService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    if (this.fact.recepteurinterne == "1") {
     
      this.int = true
      this.ext = false;
      } else {
        this.int = false;
    }


    if (this.fact.recepteurinterne== "0") {
      this.ext = true
      this.int = false;
    } else {
      this.ext = false;
    }
    this.filesCarService.Get().subscribe(res => {
      this.FilessList2 = res;
      this.FilessList = this.FilessList2.filter(item => item.idVoiture == this.factId)
    });
    this.tabService.Get().subscribe(res => {
      this.tabsList2 = res
      this.tabsList = this.tabsList2.filter(item => item.idvoiture == this.factId)
      if (this.tabsList.length != 0) {
        this.tabsTest = true;
      } else {
        this.tabsTest = false;
      }
    })
   
  }


  factur: Voiture = new Voiture();
  // Type Stock

  tabList: NotifCars[] = [];
  tabList2: NotifCars[] = [];
  i = 0;
  tabtest: boolean;
  tabmec: NotifCars = new NotifCars();
  addtab() {
    this.tabtest = true;
    this.tabList[this.i] = this.tabmec
    this.tabmec = new NotifCars();
    this.i = this.i + 1;
  }

  int: boolean = false;
  ext: boolean = false;
  inteext(event) {
    if (event.target.value == "1") {
      this.int = true
    } else {
      this.int = false;
    }

    if (event.target.value == "0") {
      this.ext = true
    } else {
      this.ext = false;
    }
  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.tabList.splice(this.tabList.indexOf(dp), 1);
    this.i = this.i - 1
    this.tabmec = new NotifCars();
  }

  getStockageType() {
    this.tabService.Get().subscribe(res => {
      this.tabsList2 = res
      this.tabsList = this.tabsList2.filter(item => item.idvoiture == this.factId)
      if (this.tabsList.length != 0) {
        this.tabsTest = true;
      } else {
        this.tabsTest = false;
      }
    })
  }

  del11(Id) {
    this.tabService.Delete(Id).subscribe(res => {
      this.getStockageType();
    })
  }


  idvoiture: number;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      this.recpService.PutObservable(this.fact).subscribe(
        res => {


          if (this.tabtest) {
            for (let i = 0; i < this.tabList.length; i++) {
              
              this.tabmec = this.tabList[i]
              this.tabmec.idvoiture = this.factId;
              this.tabService.Add(this.tabmec).subscribe(res => {
                this.tabList2[i] = res

              },
                err => {
                  this.toastr.error("  فشل في تسجيل	 ", "فشل")
                })
            }
          }
          //video

          this.pj1.idVoiture = this.factId;

          this.pj1.type = 'الإستمارة'
          let path = this.rootUrl.getPath();

          this.fileslist.forEach(item => {
            this.pj.path = item;
            this.http.post(path + '/FilesVoitures', this.pj)
              .subscribe(res => {

                this.GetFileName();

              })
          });



          //voc


          this.pj2.idVoiture = this.factId;

          this.pj2.type = 'التأمين'
          let path2 = this.rootUrl.getPath();
          this.fileslist1.forEach(item => {
            this.pj2.path = item;
            this.http.post(path2 + '/FilesVoitures', this.pj2)
              .subscribe(res => {

                this.GetFileName();

              })
          })

          //

          this.pj3.idVoiture = this.factId;

          this.pj3.type = 'الفحص'
          let path3 = this.rootUrl.getPath();
          this.fileslist3.forEach(item => {
            this.pj3.path = item;
            this.http.post(path2 + '/FilesVoitures', this.pj3)
              .subscribe(res => {

                this.GetFileName();

              })
          })


          this.pj4.idVoiture = this.factId;

          this.pj4.type = 'الفاتورة'
          let path4 = this.rootUrl.getPath();
          this.fileslist4.forEach(item => {
            this.pj2.path = item;
            this.http.post(path2 + '/FilesVoitures', this.pj4)
              .subscribe(res => {

                this.GetFileName();

              })
          })

          this.toastr.success("تم التسجيل بنجاح", "نجاح")
          form.resetForm();
          this.files1 = [];
          this.files2 = [];
          this.files3 = [];
          this.files4 = [];
          this.getrecpList();
          this.tabList.splice(0, this.tabList.length);
          this.tabtest = false;
          this.getrecpList();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        }
      )

    }
  }

  //Delete Dotation
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.recpService.Delete(Id)
        .subscribe(res => {
          this.getrecpList()
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

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

  //Files


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesCars = new FilesCars();
  public pjs: FilesCars[];
  public pj1: FilesCars = new FilesCars();
  public pjs1: FilesCars[];
  public pj2: FilesCars = new FilesCars();
  public pj4: FilesCars = new FilesCars();
  public pjs2: FilesCars[];

  public pj3: FilesCars = new FilesCars();
  public pjs3: FilesCars[];

  public files: string[];


  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  files4: File[] = [];
  onSelect1(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove1(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect4(event) {
    //console.log(event);
    this.files4.push(...event.addedFiles);
  }

  onRemove4(event) {
    this.files4.splice(this.files1.indexOf(event), 1);
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
  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

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

  //upload 1


  url: any;
  file: any;
  fileslist: string[] = [];
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
      this.fileslist.push(this.file.name);
      console.log(this.fileslist)
    }
  }


  // upload 1


  url1: any;
  file1: any;
  fileslist1: string[] = [];
  public upload2(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file1 = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file1).subscribe(
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
      this.fileslist1.push(this.file1.name);
    }
  }



  file3: any;
  fileslist3: string[] = [];
  public upload3(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file3 = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file3).subscribe(
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
      this.fileslist3.push(this.file3.name);
    }
  }

  file4: any;
  fileslist4: string[] = [];
  public upload4(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file3 = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file3).subscribe(
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
      this.fileslist4.push(this.file3.name);
    }
  }
}
