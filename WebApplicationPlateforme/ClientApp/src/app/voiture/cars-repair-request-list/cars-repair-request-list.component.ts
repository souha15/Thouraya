import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { PathSharedService } from '../../shared/path-shared.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { RepairRequestService } from '../../shared/Services/voiture/repair-request.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { RepairRequest } from '../../shared/Models/voiture/repair-request.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-cars-repair-request-list',
  templateUrl: './cars-repair-request-list.component.html',
  styleUrls: ['./cars-repair-request-list.component.css']
})
export class CarsRepairRequestListComponent implements OnInit {

  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  filter;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private recpService: RepairRequestService,
    private UserService: UserServiceService,
    private toastr: ToastrService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}


  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
    this.getrecpList();
    this.resetForm();
  }

  GfactList: RepairRequest[] = [];
  factList: RepairRequest[] = [];
  getrecpList() {
    this.recpService.Get().subscribe(res => {
      this.GfactList = res
      this.factList = this.GfactList.filter(item => item.idUserCreator == this.UserIdConnected)
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
  fact: RepairRequest = new RepairRequest();
  populateForm(facture: RepairRequest) {
    this.recpService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.updateRecord(form)
    }
  }

  factur: RepairRequest = new RepairRequest();

  updateRecord(form: NgForm) {
    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;
    if (this.recpService.formData.etat == "في الإنتظار") {
      this.fileslist1.forEach(item => {
        this.recpService.formData.prix1 = item;
      })

      this.fileslist2.forEach(item => {
        this.recpService.formData.prix2 = item;
      })

      this.fileslist3.forEach(item => {
        this.recpService.formData.prix3 = item;
      })
    this.recpService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.files1 = [];
      this.files2 = [];
      this.files3 = [];
      this.resetForm();
      this.getrecpList();
    },
      err => {
        this.toastr.error(' لم يتم التحديث ', ' فشل');
      }
    )
    } else
      this.toastr.error(' الطلب تحت الإجراء ', ' فشل');
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


  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.recpService.formData = {
      id: null,
      matricule: '',
      type: '',
      daterepair: '',
      prix1: '',
      prix2: '',
      prix3: '',
      panne: '',
      iddir: '',
      idrh: '',
      nomdir: '',
      nomrh: '',
      datedir: '',
      daterh: '',
      etat: '',
      etatdir: '',
      etatrh: '',
      req: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
      idvoiture: null,

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

  onSelect1(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove1(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect2(event) {
    //console.log(event);
    this.files2.push(...event.addedFiles);
  }

  onRemove2(event) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  onSelect3(event) {
    //console.log(event);
    this.files3.push(...event.addedFiles);
  }

  onRemove3(event) {
    console.log(event);
    this.files3.splice(this.files3.indexOf(event), 1);
  }

  public files: string[];
  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }


  GetFileName() {
    let sa: any;
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

  //Save it ToDatabase
  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
  url: any;
  file: any;
  fileslist1: string[] = [];
  fileslist2: string[] = [];
  fileslist3: string[] = [];
  public upload1(event) {
    /* if (event.addedFiles && event.addedFiles.length > 0) {
       this.file = event.addedFiles;
       console.log(this.file)
   
    *     this.file = event.addedFiles
       console.log(this.file)
    */
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      console.log(this.file)
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
      console.log(this.fileslist1)
    }
  }

  public upload2(event) {
    /* if (event.addedFiles && event.addedFiles.length > 0) {
       this.file = event.addedFiles;
       console.log(this.file)
   
    *     this.file = event.addedFiles
       console.log(this.file)
    */
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      console.log(this.file)
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

  public upload3(event) {
    /* if (event.addedFiles && event.addedFiles.length > 0) {
       this.file = event.addedFiles;
       console.log(this.file)
   
    *     this.file = event.addedFiles
       console.log(this.file)
    */
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      console.log(this.file)
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
      console.log(this.fileslist1)
    }
  }
}
