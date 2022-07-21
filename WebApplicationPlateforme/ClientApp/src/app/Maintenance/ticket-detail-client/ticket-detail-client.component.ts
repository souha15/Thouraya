import { Component, OnInit, Output, Input, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { TicketService } from '../../shared/Services/Maintenance/ticket.service';
import { ToastrService } from 'ngx-toastr';
import { FilesFilesTicketService } from '../../shared/Services/Maintenance/files-ticket.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { Ticket } from '../../shared/Models/Maintenance/ticket.model';
import { NgForm } from '@angular/forms';
import { FilesTicket } from '../../shared/Models/Maintenance/files-ticket.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CommentsTicketService } from '../../shared/Services/Maintenance/comments-ticket.service';
import { CommentsTickets } from '../../shared/Models/Maintenance/comments-tickets.model';
@Component({
  selector: 'app-ticket-detail-client',
  templateUrl: './ticket-detail-client.component.html',
  styleUrls: ['./ticket-detail-client.component.css']
})
export class TicketDetailClientComponent implements OnInit {
  htmlContent = '';

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  filter;
  private routeSub: Subscription;
  constructor(private ticketService: TicketService,
    private toastr: ToastrService,
    private filesTicketService: FilesFilesTicketService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private route: ActivatedRoute,
    private commentsService: CommentsTicketService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getIdUrl();
    this.getFiles();
    this.getUserConnected();
    this.ListOfComments();
  }


  // Get Task

  ev: Ticket = new Ticket();
  ticketfilesG: FilesTicket[] = []
  ticketfiles: FilesTicket[] = []
  existFiles: boolean = false;
  Id: number;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.ticketService.GetById(this.Id).subscribe(res => {
        this.ev = res

        let path = this.rootUrl.getPath();
        this.http.get<FilesTicket[]>(path + '/FilesGestionTickets')
          .subscribe(res => {
            this.ticketfilesG = res
            this.ticketfiles = this.ticketfilesG.filter(item => item.idTicket == this.ev.id)
            if (this.ticketfiles.length != 0) {
              this.existFiles = true;
            } else {
              this.existFiles = false;
            }
          });
      })
    });
  }


  getFileData() {
    let path = this.rootUrl.getPath();
    this.http.get<FilesTicket[]>(path + '/FilesGestionTickets')
      .subscribe(res => {
        this.existFiles = true;
        this.ticketfilesG = res
        this.ticketfiles = this.ticketfilesG.filter(item => item.idTicket == this.ev.id)
      });

  }
  txtMessage: string = '';
  messages = new Array<CommentsTickets>();
  message: CommentsTickets = new CommentsTickets();
  listmessage: CommentsTickets[] = [];
  //list of comments
  ListOfComments() {
    this.commentsService.List().subscribe(res => {
      this.listmessage = res;
      this.messages = this.listmessage.filter(item =>
        item.idTicket == this.ev.id
      );
      this.messages.reverse();
    })


  }


  //Create Comment
  sendMessage(): void {
    if (this.txtMessage) {

      this.message.idTicket = this.ev.id;
      this.message.text = this.txtMessage;
      this.message.dateTime = new Date().toLocaleTimeString();
      this.message.userId = this.UserIdConnected;
      this.message.userName = this.UserNameConnected;
      this.message.attribut1 = "0";
      this.commentsService.Create(this.message).subscribe(res => {

        //   this.messages.push(this.message);
        this.messages.splice(this.messages.length + 1, 0, this.message)
        this.txtMessage = '';
      })


      //this.chatService.sendMessage(this.message);

    }
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

  // Files

  onSelect(event) {

    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files1.splice(this.files1.indexOf(event), 1);
  }


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesTicket = new FilesTicket();
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
      let path = this.rootUrl.getPath();
      this.pj.idTicket = this.ev.id;
      this.pj.path = this.file.name;
      this.http.post(path + '/FilesGestionTickets', this.pj)
        .subscribe(res => {
          this.serviceupload.refreshList();
          this.GetFileName();
          this.getFileData();
        });

    }
  }

}
