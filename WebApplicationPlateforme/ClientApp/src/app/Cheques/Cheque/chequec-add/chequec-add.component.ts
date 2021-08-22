import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PathSharedService } from '../../../shared/path-shared.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { ChequeCService } from '../../../shared/Services/Cheques/cheque-c.service';
import { ChequesC } from '../../../shared/Models/Cheques/cheques-c.model';
import { NgForm } from '@angular/forms';
import { PayChequeService } from '../../../shared/Services/Cheques/pay-cheque.service';
import { PayChequesC } from '../../../shared/Models/Cheques/pay-cheques-c.model';
import { FilesChequesC } from '../../../shared/Models/Cheques/files-cheques-c.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { EtatListCompte } from '../../../shared/Models/Comptes/etat-list-compte.model';

@Component({
  selector: 'app-chequec-add',
  templateUrl: './chequec-add.component.html',
  styleUrls: ['./chequec-add.component.css']
})
export class ChequecAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private chequeService: ChequeCService,
    private articleService: PayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();
    this.getClasses();
    this.getFiles();
    this.getComptes();
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


  // Get Compte List
  cptLis: EtatListCompte[] = [];
  getComptes() {
    this.tbLProjetService.GetCompte().subscribe(res => {
      this.cptLis = res;
    })
  }
  //Get Classes List
  classesList: TbListening[] = [];
  getClasses() {
    this.tbLService.GetClasseCheque().subscribe(res => {
      this.classesList = res;
    })
  }


  //Article Add

  ar: PayChequesC = new PayChequesC();
  arlis: PayChequesC[] = [];
  arlis2: PayChequesC[] = [];
  artest: boolean = false;
  i: number = 0;
  addar() {
    this.artest = true
    this.arlis[this.i] = this.ar
    this.ar = new PayChequesC();
    this.i = this.i + 1
  }

  //Delete Article


  delar(dp, i) {
    this.arlis.splice(this.arlis.indexOf(dp), 1);
    this.i = this.i - 1
    this.ar = new PayChequesC();
  }



  //Create Cheque

  ch: ChequesC = new ChequesC();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  chId: number;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {
      this.isValidFormSubmitted = true;
      this.ch.dateenreg = this.date;
      this.ch.creatorName = this.UserNameConnected;
      this.ch.idUserCreator = this.UserIdConnected;
      this.chequeService.Add(this.ch).subscribe(
        res => {
          this.chId = res.id

          //Create article
          if (this.artest) {
            for (let i = 0; i < this.arlis.length; i++) {
              this.ar = this.arlis[i]

              this.ar.idCheque = this.chId;
              this.ar.idUserCreator = this.UserIdConnected;
              this.ar.creatorName = this.UserNameConnected;
              this.articleService.Add(this.ar).subscribe(res => {
                this.arlis2[i] = res
              },
                err => {
                  this.toastr.error("  فشل في تسجيل بنود الصرف", "فشل")
                })
            }

          }

          // Files type صورة الشيك

          this.pj1.idCheque = this.chId;
          this.pj1.type = 'صورة الشيك'
          let path1 = this.rootUrl.getPath();
          this.fileslist1.forEach(item => {
            this.pj1.path = item;
            this.http.post(path1 + '/FilesCheques', this.pj1)
              .subscribe(res => {
                this.GetFileName();

              })
          });
          //files Type طلب الصرف

          this.pj2.idCheque = this.chId;
          this.pj2.type = 'طلب الصرف'
          let path2 = this.rootUrl.getPath();
          this.fileslist2.forEach(item => {
            this.pj2.path = item;
            this.http.post(path2 + '/FilesCheques', this.pj2)
              .subscribe(res => {

                this.GetFileName();

              })
          });


          //files Type سند الاستلام

          this.pj3.idCheque = this.chId;
          this.pj3.type = 'سند الاستلام'
          let path3 = this.rootUrl.getPath();
          this.fileslist3.forEach(item => {
            this.pj3.path = item;
            this.http.post(path3 + '/FilesCheques', this.pj3)
              .subscribe(res => {

                this.GetFileName();

              })
          });
          //files Type كشف الحساب

          this.pj4.idCheque = this.chId;
          this.pj4.type = 'كشف الحساب'
          let path4 = this.rootUrl.getPath();
          this.fileslist4.forEach(item => {
            this.pj4.path = item;
            this.http.post(path4 + '/FilesCheques', this.pj4)
              .subscribe(res => {

                this.GetFileName();

              })
          });

          //files Type مستندات الصرف

          this.pj5.idCheque = this.chId;
          this.pj5.type = 'مستندات الصرف'
          let path5 = this.rootUrl.getPath();
          this.fileslist5.forEach(item => {
            this.pj5.path = item;
            this.http.post(path5 + '/FilesCheques', this.pj5)
              .subscribe(res => {

                this.GetFileName();

              })
          });

          this.files1 = [];
          this.files2 = [];
          this.files3 = [];
          this.files4 = [];
          this.files5 = [];

          this.artest = false;
          this.arlis.splice(0, this.arlis.length)
          this.i = 0;
          this.toastr.success("تم التسجيل بنجاح", "نجاح")
          form.resetForm();
        },
        err => {
          this.toastr.error("فشل في التسجيل", "فشل")
        }
      )
    }
  }

//Files



  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;


  //Files
  public files: string[];
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
  file1: any;
  fileslist1: string[] = [];
  public upload1(event) {
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
      console.log(this.fileslist1)
    }
  }


  // upload 1

  public pj1: FilesChequesC = new FilesChequesC();
  public pj2: FilesChequesC = new FilesChequesC();
  public pj3: FilesChequesC = new FilesChequesC();
  public pj4: FilesChequesC = new FilesChequesC();
  public pj5: FilesChequesC = new FilesChequesC();

  public pjs: FilesChequesC[];



  url1: any;
  file2: any;
  fileslist2: string[] = [];
  public upload2(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file2 = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file2).subscribe(
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
      this.fileslist2.push(this.file2.name);
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
      this.file4 = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file4).subscribe(
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
      this.fileslist4.push(this.file4.name);
      console.log(this.fileslist4)
    }
  }

  file5: any;
  fileslist5: string[] = [];
  public upload5(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file5 = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file5).subscribe(
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
      this.fileslist5.push(this.file5.name);

    }
  }

}
