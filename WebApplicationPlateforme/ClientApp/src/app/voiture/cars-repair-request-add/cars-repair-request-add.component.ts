import { Component, OnInit, Input, Output, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { VoitureService } from '../../shared/Services/voiture/voiture.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { NgForm } from '@angular/forms';
import { Voiture } from '../../shared/Models/voiture/voiture.model';
import { RepairRequestService } from '../../shared/Services/voiture/repair-request.service';
import { RepairRequest } from '../../shared/Models/voiture/repair-request.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-cars-repair-request-add',
  templateUrl: './cars-repair-request-add.component.html',
  styleUrls: ['./cars-repair-request-add.component.css']
})
export class CarsRepairRequestAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private voitureService: RepairRequestService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private carService: VoitureService,
    private rootUrl: PathSharedService,
    private http: HttpClient,) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
  }

  mat: string;
  exists: boolean = false;
  idv: number;
  voiList: Voiture[] = [];
  voilist: Voiture[] = [];
  mattest(event) {
    this.mat = event.target.value;
    this.carService.Get().subscribe(res => {
      this.voiList = res
      this.voilist = this.voiList.filter(item => item.matricule == this.mat);
      if (this.voilist.length == 0) {
        this.toastr.error('يرجى التحقق من رقم اللوحة')
        this.exists = false;
      } else {
        this.exists = true;
      this.voilist.forEach(item => {
        this.idv = item.id;
        console.log(this.idv)
      })
    }
    })
  }
// Get User Connected

UserIdConnected: string;
UserNameConnected: string;
adminisgtrationName: any;
soldeconge: string;



getUserConnected() {

  this.UserService.getUserProfileObservable().subscribe(res => {
    this.UserIdConnected = res.id;
    this.UserNameConnected = res.fullName;
    this.soldeconge = res.soldeconge;

  })

}

  voiture: RepairRequest = new RepairRequest();
  isValidFormSubmitted = false;
  path: string;
date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {
      if (this.exists == false) {
        this.toastr.error('يرجى التحقق من رقم اللوحة')
      }
      else {
        this.isValidFormSubmitted = true
        this.voiture.idUserCreator = this.UserIdConnected;
        this.voiture.userNameCreator = this.UserNameConnected;
        this.voiture.dateenreg = this.date;
        this.voiture.etat = "في الإنتظار";
        this.voiture.etatdir = "غير معتمدة";
        this.voiture.etatrh = "غير جاهزة للصرف";
        this.voiture.idvoiture = this.idv;

        this.fileslist1.forEach(item => {
          this.voiture.prix1 = item;
        })

        this.fileslist2.forEach(item => {
          this.voiture.prix2 = item;
        })

        this.fileslist3.forEach(item => {
          this.voiture.prix3 = item;
        })

        this.voitureService.Add(this.voiture).subscribe(
          res => {
            this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            this.files1 = [];
            this.files2 = [];
            this.files3 = [];
            form.resetForm();

          },
          err => {
            this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
          }
        )

      }
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
