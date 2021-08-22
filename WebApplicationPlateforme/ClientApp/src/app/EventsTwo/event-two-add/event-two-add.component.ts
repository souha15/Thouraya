import { Component, OnInit, ElementRef, ViewChild, Output, Input, EventEmitter } from '@angular/core';
import { EventsTwoService } from '../../shared/Services/EventsTwo/events-two.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { ToastrService } from 'ngx-toastr';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesEventsTwo } from '../../shared/Models/EventsTwo/pieces-jointes-events-two.model';
import { NgForm } from '@angular/forms';
import { EventsTwo } from '../../shared/Models/EventsTwo/events-two.model';

@Component({
  selector: 'app-event-two-add',
  templateUrl: './event-two-add.component.html',
  styleUrls: ['./event-two-add.component.css']
})
export class EventTwoAddComponent implements OnInit {


  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
    private rcChequeService: EventsTwoService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
  }


  UserIdConnected: string;
  UserNameConnected: string;
  datee: string;
  ev: EventsTwo = new EventsTwo();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.ev.idUserCreator = res.id;
      this.ev.userNameCreator = res.fullName;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.datee = this.date
    })
  }
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  id: number;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.ev.dateenreg = this.date;
      this.ev.attribut2 = this.attribut2
      this.rcChequeService.Add(this.ev).subscribe(
        res => {
          this.id = res.id;
          this.pj.idUserCreator = this.UserIdConnected;
          this.pj.date = this.date;
          this.pj.creatorName = this.UserNameConnected;
          this.pj.idEv = this.id;
       
          let path = this.rootUrl.getPath();

          this.fileslist.forEach(item => {
            this.pj.type = "photos"
            this.pj.path = item;
            console.log(item)
            this.http.post(path + '/PiecesJointesEvTzoes', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshListEvTwoe();
                this.GetFileName();
              });
          })

         
          this.fileslist2.forEach(item => {
            this.pj.type = "files"
            this.pj.path = item;
            console.log(item)
            this.http.post(path + '/PiecesJointesEvTzoes', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshListEvTwoe();
                this.GetFileName();
              });
          })
          this.files1 = [];
          this.files2 = [];
          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }

  //

  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }
  files2: File[] = [];
  onSelect1(event) {
    //console.log(event);
    this.files2.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onRemove2(event) {
    console.log(event);
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  //Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesEventsTwo = new PiecesJointesEventsTwo();
  public pjs: PiecesJointesEventsTwo[];
  //public files: string[];

  //get List of Files
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

  //Upload

  //Save it ToDatabase
  files1: File[] = [];
  url: any;
  file: any;
  fileslist: string[] = [];
  attribut2: string;
  public upload(event) {
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
      this.fileslist.push(this.file.name);
      this.attribut2 = this.fileslist[0];
    }
  }

  url2: any;
  file2: any;
  fileslist2: string[] = [];
  public upload2(event) {
    /* if (event.addedFiles && event.addedFiles.length > 0) {
       this.file = event.addedFiles;
       console.log(this.file)
   
    *     this.file = event.addedFiles
       console.log(this.file)
    */
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file2 = event.addedFiles[0];
      console.log(this.file2)
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
      this.fileslist2.push(this.file.name);
   
      console.log(this.fileslist)
    }
  }

}
