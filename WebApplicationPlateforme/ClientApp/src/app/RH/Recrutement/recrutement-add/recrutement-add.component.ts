import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesRc } from '../../../shared/Models/RH/pieces-jointes-rc.model';
import { Recrutement } from '../../../shared/Models/RH/recrutement.model';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { RecrutementService } from '../../../shared/Services/Rh/recrutement.service';

@Component({
  selector: 'app-recrutement-add',
  templateUrl: './recrutement-add.component.html',
  styleUrls: ['./recrutement-add.component.css']
})
export class RecrutementAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  filter;
  constructor(private toastr: ToastrService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    public recrutementService: RecrutementService,
    private http: HttpClient,
    private rootUrl: PathSharedService) { this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getFiles();
    this.getUserConnected();
    this.UserList();
  }

  // Get User Connected

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.rec.iddir = res.attribut1;
      this.rec.nomdir = res.directeur;
      this.rec.idUserCreator = res.id;
      this.rec.userNameCreator = res.fullName;
    })

  }

  //Get Users List
  user: UserDetail[] = [];
  UserList() {
    this.UserService.GetUsersList().subscribe(res => {
      this.user = res;
    })
  }


  //get Remplaçant Name

  getRemplacant(event) {
    this.UserService.GetUserById(event.target.value).subscribe(res => {
      this.rec.nomremplacant = res.fullName

    })
  }


  //Add Recrutement
  rec: Recrutement = new Recrutement();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  recId: number;
  onSubmit(form: NgForm) {
    this.rec.dateenreg = this.date;
    this.rec.etatdir = "في الانتظار";;
    this.rec.etatrh = "في الانتظار";
    this.rec.attribut2 = "في الانتظار";
    this.rec.attribut3 = "5%";

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true
      this.recrutementService.Add(this.rec).subscribe(
        res => {
          this.recId = res.id
          this.pj.creatorName = this.rec.userNameCreator;
          this.pj.datenereg = this.date
          this.pj.date = this.date;

          this.pj.idrec = this.recId;
          let path = this.rootUrl.getPath();
          this.fileslist.forEach(item => {
            this.pj.path = item;
            console.log(item)
            this.http.post(path + '/PiecesJointesRcs', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshListRc();
                this.GetFileName();
              });
          })


          this.toastr.success("تمت الإضافة بنجاح", "نجاح");
          form.resetForm();
        },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        }
      )
    }
  }
  //Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesRc = new PiecesJointesRc();
  public pjs: PiecesJointesRc[];
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
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist.push(this.file.name);
      console.log(this.fileslist)
    }
  }

  //DeleteFile

  onDelete(Id) {
    if (confirm('هل أنت متأكد من حذف هذا الملف ?')) {
      this.serviceupload.deletePjRc(Id)
        .subscribe(res => {
          this.serviceupload.refreshListRc();
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
