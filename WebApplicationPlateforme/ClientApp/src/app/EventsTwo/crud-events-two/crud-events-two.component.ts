import { Component, OnInit, Input, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { EventsTwoService } from '../../shared/Services/EventsTwo/events-two.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { EventsTwo } from '../../shared/Models/EventsTwo/events-two.model';
import { NgForm } from '@angular/forms';
import { PiecesJointesEventsTwo } from '../../shared/Models/EventsTwo/pieces-jointes-events-two.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-crud-events-two',
  templateUrl: './crud-events-two.component.html',
  styleUrls: ['./crud-events-two.component.css']
})
export class CrudEventsTwoComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  filter;
  constructor(private newsService: EventsTwoService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.getNewsList();
    this.getFiles();
    this.resetForm();
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

  // Get New List

  newsList: EventsTwo[] = [];
  FnewsList: EventsTwo[] = [];
  getNewsList() {
    this.newsService.Get().subscribe(res => {
      this.newsList = res


    })
  }

  fact: EventsTwo = new EventsTwo();
  populateForm(facture: EventsTwo) {
    this.newsService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);
    console.log(this.factId)
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

  factur: EventsTwo = new EventsTwo();
  factId: number;
  updateRecord(form: NgForm) {

    this.factur = Object.assign(this.factur, form.value);
    this.factId = this.factur.id;
 
    this.pj.idUserCreator = this.UserIdConnected;
    this.pj.date = this.date;
    this.pj.creatorName = this.UserNameConnected;
    this.pj.idEv = this.newsService.formData.id;
    let path = this.rootUrl.getPath();

    this.newsService.Edit().subscribe(res => {


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
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.getNewsList();
    },
      err => {
        this.toastr.error(' لم يتم التحديث  ', ' فشل');
      }


    )
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.newsService.formData = {
      id: null,
      adr: '',
      date: '',
      bref: '',
      detail: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',
    }
  }

  //Files

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

  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.newsService.Delete(Id)
        .subscribe(res => {
          this.getNewsList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }
}
