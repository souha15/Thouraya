import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { MsgInterneService } from '../../shared/Services/Msg Interne/msg-interne.service';
import { NotifMsgInterneService } from '../../shared/Services/Msg Interne/notif-msg-interne.service';
import { FilesMsgInterne } from '../../shared/Models/Msg Interne/files-msg-interne.model';
import { FilesMsgInterneService } from '../../shared/Services/Msg Interne/files-msg-interne.service';
import { MsgInterne } from '../../shared/Models/Msg Interne/msg-interne.model';
import { NgForm } from '@angular/forms';
import { NotifMsgInterne } from '../../shared/Models/Msg Interne/notif-msg-interne.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-msg-interne-details',
  templateUrl: './msg-interne-details.component.html',
  styleUrls: ['./msg-interne-details.component.css']
})
export class MsgInterneDetailsComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  displayUrl;
  constructor(private UserService: UserServiceService,
    private MsgInterneService: MsgInterneService,
    private NotifMsgInterneService: NotifMsgInterneService,
    private FilesMsgInterneService: FilesMsgInterneService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
    private route: ActivatedRoute,
    public serviceupload: UploadDownloadService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.getIdUrl();
    this.getFiles();
  }

  Id: number;
  msg: MsgInterne = new MsgInterne();
  FilesList2: FilesMsgInterne[] = [];
  FilesList: FilesMsgInterne[] = [];
  notifMsgList1: NotifMsgInterne[] = [];
  notifMsgList: NotifMsgInterne[] = [];
  notifmsg: NotifMsgInterne = new NotifMsgInterne();
  replytest: boolean = false;

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
      this.MsgInterneService.GetById(this.Id).subscribe(res => {
        this.msg = res;
        if (this.msg.userIdReceiver == this.UserIdConnected) {
          this.replytest = true;
          //MsgInterne Edit
          this.msg.seen = 1;
          this.MsgInterneService.PutObservableE(this.msg).subscribe(res => {

          })

          //notif Edit
          this.NotifMsgInterneService.ListNotifMsgInterne().subscribe(res => {
            this.notifMsgList1 = res
            this.notifMsgList = this.notifMsgList1.filter(item => item.idMsg == this.msg.id)
            this.notifmsg = this.notifMsgList[0];
            this.notifmsg.seen = 1;

            this.NotifMsgInterneService.PutObservableE(this.notifmsg).subscribe(res => {

            })
          })
        } else {
          this.replytest = false; 
        }


        this.FilesMsgInterneService.ListFilesMsgInterne().subscribe(res => {
          this.FilesList2 = res
          this.FilesList = this.FilesList2.filter(item => item.idMsg == this.Id)
        })
      })
    });
    }

  showForm: boolean = false;

  reply() {
    this.showForm = true;
  }
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

  }


  msgInterne: MsgInterne = new MsgInterne();
  CreatedmsgInterne: MsgInterne = new MsgInterne();
  notifMsgInterne: NotifMsgInterne = new NotifMsgInterne();
  isValidFormSubmitted = false;
  date = new Date().toLocaleString();
  onSubmit(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }

    else {
      this.isValidFormSubmitted = true;
      this.msgInterne.date = this.date;
      this.msgInterne.userIdSender = this.UserIdConnected;
      this.msgInterne.userNameSender = this.UserNameConnected;
      this.msgInterne.vu = "not yet";
      this.msgInterne.seen = 0;
      this.msgInterne.attribut1 = this.msg.id;
      this.msgInterne.userNameReceiver = this.msg.userNameSender;
      this.msgInterne.userIdReceiver = this.msg.userIdSender;
      this.MsgInterneService.CreateMsgInterne(this.msgInterne).subscribe(res => {
        this.CreatedmsgInterne = res

        //Files Add

        this.pj.idMsg = this.CreatedmsgInterne.id;
        let path = this.rootUrl.getPath();
        this.fileslist.forEach(item => {
          this.pj.path = item;
          this.FilesMsgInterneService.CreateFilesMsgInterne(this.pj).subscribe(res => {
            this.serviceupload.refreshList();
            this.GetFileName();
          })
        })
        //Notif Add

        this.notifMsgInterne.date = this.date;
        this.notifMsgInterne.idMsg = this.CreatedmsgInterne.id;
        this.notifMsgInterne.userIdReceiver = this.CreatedmsgInterne.userIdReceiver;
        this.notifMsgInterne.userNameReceiver = this.CreatedmsgInterne.userNameReceiver;
        this.notifMsgInterne.seen = 0;
        this.notifMsgInterne.userIdSender = this.UserIdConnected;
        this.notifMsgInterne.userNameSender = this.UserNameConnected;
        this.NotifMsgInterneService.CreateNotifMsgInterne(this.notifMsgInterne).subscribe(res => {

        })
        form.resetForm();
        this.toastr.success("تم التسجيل  بنجاح", " تسجيل ");
        this.files1 = [];
      },
        err => {
          this.toastr.error("فشل التسجيل  ", " تسجيل ")
        })
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
  public pj: FilesMsgInterne = new FilesMsgInterne();
  public pjs: FilesMsgInterne[];
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


}
