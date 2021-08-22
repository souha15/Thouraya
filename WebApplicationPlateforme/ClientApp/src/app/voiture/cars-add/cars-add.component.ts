import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { VoitureService } from '../../shared/Services/voiture/voiture.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { Voiture } from '../../shared/Models/voiture/voiture.model';
import { NgForm } from '@angular/forms';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { FilesCars } from '../../shared/Models/Supplies/files-cars.model';

@Component({
  selector: 'app-cars-add',
  templateUrl: './cars-add.component.html',
  styleUrls: ['./cars-add.component.css']
})
export class CarsAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private voitureService: VoitureService,
    private UserService: UserServiceService,
    private tblService: TbListeningService,
    private rootUrl: PathSharedService,
    private toastr: ToastrService,
    private http: HttpClient,
    public serviceupload: UploadDownloadService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();
    this.getrecpList();
  }

  // voitureList
  factList: Voiture[] = [];
  getrecpList() {
    this.voitureService.Get().subscribe(res => {
      this.factList = res
    })
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

  voiture: Voiture = new Voiture();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  idvoiture: number;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.voiture.idUserCreator = this.UserIdConnected;
      this.voiture.userNameCreator = this.UserNameConnected;
      this.voiture.dateenreg = this.date
      this.voitureService.Add(this.voiture).subscribe(
        res => {
          this.idvoiture = res.id
          //video

          this.pj1.idVoiture = this.idvoiture;

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


          this.pj2.idVoiture = this.idvoiture;

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

          this.pj3.idVoiture = this.idvoiture;

          this.pj3.type = 'الفحص'
          let path3 = this.rootUrl.getPath();
          this.fileslist3.forEach(item => {
            this.pj3.path = item;
            this.http.post(path2 + '/FilesVoitures', this.pj2)
              .subscribe(res => {
          
                this.GetFileName();

              })
          })


          this.toastr.success("تم التسجيل بنجاح", "نجاح")
          form.resetForm();
          this.files1 = [];
          this.files2 = [];
          this.files3 = [];
          this.getrecpList();


        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        }
      )

    }
  }


  //Files


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesCars = new FilesCars();
  public pjs: FilesCars[];
  public pj1: FilesCars = new FilesCars();
  public pjs1: FilesCars[];
  public pj2: FilesCars = new FilesCars();
  public pjs2: FilesCars[];

  public pj3: FilesCars = new FilesCars();
  public pjs3: FilesCars[];

  public files: string[];


  files1: File[] = [];
  files2: File[] = [];
  files3: File[] = [];
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
}
