import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ToastrService } from 'ngx-toastr';
import { PathSharedService } from '../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { RecueDons } from '../../../shared/Models/Dons/recue-dons.model';
import { RecueDonsService } from '../../../shared/Services/Dons/recue-dons.service';
import { NgForm } from '@angular/forms';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { PayementReceptionService } from '../../../shared/Services/Dons/payement-reception.service';
import { PayementReception } from '../../../shared/Models/Dons/payement-reception.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';

@Component({
  selector: 'app-recue-dons-add',
  templateUrl: './recue-dons-add.component.html',
  styleUrls: ['./recue-dons-add.component.css']
})
export class RecueDonsAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
    private donsService: RecueDonsService,
    private projetService: TbListeningService,
    private payService: PayementReceptionService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.usersListGet();
    this.getTbl();
    this.getFiles();
    
    
  }


  pd: TbListening[] = [];
  getTbl() {
    this.projetService.GetProjetDons().subscribe(res => {
      this.pd=res
    })
  }

  usersList: UserDetail[] = [];
  usersListGet() {
    this.UserService.GetUsersList().subscribe(res => {
      this.usersList = res;
    })
  }
  rd: RecueDons = new RecueDons();
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {
    this.UserService.getUserProfileObservable().subscribe(res => {
      this.rd.idUserCreator = res.id;
      this.rd.userNameCreator = res.fullName;
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
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
      if (this.test == true) {
        this.isValidFormSubmitted = true
        this.rd.dateenreg = this.date;

        this.fileslist.forEach(item => {
          this.rd.photoRecue = item;
        })



        this.donsService.Add(this.rd).subscribe(
          res => {

            this.toastr.success("تمت الإضافة بنجاح", "نجاح");
            this.files1 = [];
            form.resetForm();
          },
          err => {
            this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
          }
        )
      } else {
        this.toastr.error("رقم العملية موجود من قبل", "فشل في التسجيل")
      }

    }
  }

  op: string;
  rdList: RecueDons[] = [];
  FrdList: RecueDons[] = [];
  prList: PayementReception[] = [];
  FprList: PayementReception[] = [];
  test: boolean = true;
  testnumOp(event) {
    this.op = event.target.value;
    this.donsService.Get().subscribe(res => {
      this.rdList = res
      this.FrdList = this.rdList.filter(item => item.numOperation == this.op)
      console.log(this.FrdList)
      if (this.FrdList.length >0) {
        this.test = false
        console.log(this.test)
      } else
        this.test = true
    })

    this.payService.Get().subscribe(res => {
      this.prList = res
      this.FprList = this.prList.filter(item => item.numOperation == this.op)
      if (this.FprList.length >0) {
        console.log(this.test)
        this.test = false;
      }
    })


  }
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
