import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { TacheService } from '../../../shared/Services/Taches/tache.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Tache } from '../../../shared/Models/Taches/tache.model';
import { PiecesJointes } from '../../../shared/Models/Taches/pieces-jointes.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { PathSharedService } from '../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-task-edit-admin',
  templateUrl: './task-edit-admin.component.html',
  styleUrls: ['./task-edit-admin.component.css']
})
export class TaskEditAdminComponent implements OnInit {
  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private UserService: UserServiceService,
    private tacheService: TacheService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService,
    private route: ActivatedRoute,
    private rootUrl: PathSharedService,
    private http: HttpClient,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getFilesTask();
    this.getUsersList();
    this.getFiles();
  }


  // Get Task

  tache: Tache = new Tache();
  Idt: number;
  retarde: string;
  redorgreen: boolean = false;

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Idt = params['id']

      this.tacheService.GetById(this.Idt).subscribe(res => {
        this.tache = res

      })
    });
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

  //get files
  FilesImg: PiecesJointes[] = [];
  FilesG: PiecesJointes[] = [];
  getFilesTask() {
    this.serviceupload.getall().subscribe(res => {
      this.FilesG = res
      this.FilesImg = this.FilesG.filter(item => item.idTache == this.Idt)
    })
  }

  //Get Users List

  FUsersList: UserDetail[] = [];
  UsersList: UserDetail[] = [];

  getUsersList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.FUsersList = res
      this.UsersList = this.FUsersList.filter(item => item.id != this.UserIdConnected)
    })
  }

  // Select Event

  isEmployeeSelected: boolean = false;

  affected: string;
  selectInput(event) {
    let selected = event.target.value;
    if (selected == "employee") {
      this.isEmployeeSelected = true;
      this.affected = "employee"
      this.testchamp = true;

    } else {
      this.isEmployeeSelected = false;
      this.affected = "all"
      this.testchamp = true;
    }

  }

  Id: string;
  userAffectedName: string;
  selectInput2(event) {
    this.Id = event.target.value;

    this.UserService.GetUserById(this.Id).subscribe(res => {
      this.tache.Attribut1 = res.fullName
      this.userAffectedName = res.fullName;
    })
  }


  attachments: File[] = [];
  CreatedTache: Tache = new Tache();
  tacheId: number;
  testchamp: boolean;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {

    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true;

      this.testchamp = true;
      this.tache.createur = this.userAffectedName;
      this.tacheService.PutObservableE(this.tache).subscribe(
        (res: any) => {
    

          let datef = Date.now();
          this.pj.dateTime = new Date(datef);
          this.pj.dateTime

          this.pj.idTache = this.tache.id;
          let path = this.rootUrl.getPath();
          this.fileslist.forEach(item => {
            this.pj.path = item;
            console.log(item)
            this.http.post(path + '/PiecesJointes', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshList();
                this.GetFileName();
              });
          })




           this.files1 = [];
          
           form.resetForm();   
          this.toastr.success("تم تعديل  المهمة بنجاح", " تسجيل المهمة");
          this.isValidFormSubmitted = false;
        },
        err => {
          this.toastr.error("فشل تعديل  المهمة", " تسجيل المهمة")
        }

      )

    }

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
  public pj: PiecesJointes = new PiecesJointes();
  public pjs: PiecesJointes[];
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

  //Save it ToDatabase
  Idtransaction: number;
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

  //Test Date

  datecreation: Date;
  datec: any;

  testdate(event) {
    this.datecreation = new Date(event.target.value);
    this.datecreation.toDateString();
    this.datec = this.datecreation.toLocaleDateString();
  }


  //test Nom
  nomt: string;
  testnom(event) {
    this.nomt = event.target.value;
    this.nomt.toString();
  }
}
