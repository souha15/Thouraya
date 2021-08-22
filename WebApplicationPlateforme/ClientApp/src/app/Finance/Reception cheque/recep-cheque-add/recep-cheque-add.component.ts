import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ReceptionChequeService } from '../../../shared/Services/Finance/reception-cheque.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { ToastrService } from 'ngx-toastr';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { RecepCheque } from '../../../shared/Models/Finance/recep-cheque.model';
import { NgForm } from '@angular/forms';
import { PiecesJointesRecepCheque } from '../../../shared/Models/Finance/pieces-jointes-recep-cheque.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-recep-cheque-add',
  templateUrl: './recep-cheque-add.component.html',
  styleUrls: ['./recep-cheque-add.component.css']
})
export class RecepChequeAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  constructor(private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
    private rcChequeService: ReceptionChequeService, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
  }

  UserIdConnected: string;
  UserNameConnected: string;
  datee: string;
  rc: RecepCheque = new RecepCheque();
  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.rc.idUserCreator = res.id;
      this.rc.userNameCreator = res.fullName;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.datee =this.date
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
      this.rc.dateenreg = this.date;
      this.rcChequeService.Add(this.rc).subscribe(
        res => {
          this.id = res.id;
          this.pj.idUserCreator = this.UserIdConnected;
          this.pj.date = this.date;
          this.pj.creatorName = this.UserNameConnected;
          this.pj.idRC = this.id;
          let path = this.rootUrl.getPath();

          this.fileslist.forEach(item => {
            this.pj.path = item;
            console.log(item)
            this.http.post(path + '/PiecesJointesReceptionCs', this.pj)
              .subscribe(res => {
                this.serviceupload.refreshListReceptionCheque();
                this.GetFileName();
              });
          })
          this.files1 = [];
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

  onRemove(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  //Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesRecepCheque = new PiecesJointesRecepCheque();
  public pjs: PiecesJointesRecepCheque[];
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
      console.log(this.fileslist)
    }
  }

}
