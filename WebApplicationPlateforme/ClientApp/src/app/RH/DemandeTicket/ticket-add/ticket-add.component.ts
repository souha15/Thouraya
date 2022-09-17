import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { TicketService } from '../../../shared/Services/Maintenance/ticket.service';
import { PathSharedService } from '../../../shared/path-shared.service';
import { Ticket } from '../../../shared/Models/Maintenance/ticket.model';
import { NgForm } from '@angular/forms';
import { FilesTicket } from '../../../shared/Models/Maintenance/files-ticket.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-ticket-add',
  templateUrl: './ticket-add.component.html',
  styleUrls: ['./ticket-add.component.css']
})
export class TicketAddComponent implements OnInit {
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
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private ticketService: TicketService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private UserService: UserServiceService,
    private rootUrl: PathSharedService,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  num: number = 0;
  numTicket: string;
  ngOnInit(): void {

    this.getUserConnected();
    this.getFiles();

  }
  admin: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      if (res.num == "3012" || res.num == "3062" || res.num == "3014") {
        this.admin = true
      } else {
        this.admin = false;
      }
      this.ticket.clientId = res.id
      this.ticket.clientName = res.fullName;

    })

  }
  ticket: Ticket = new Ticket();
  isValidFormSubmitted = false;
  options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  date = new Date().toLocaleDateString('fr-Fr',this.options);
  onSubmit(form: NgForm) {

  if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {
      this.isValidFormSubmitted = true;
      this.ticket.numTicket = this.num;
      this.ticket.num = this.num.toString();
      this.ticket.clientDate = this.date;
      this.ticket.etat = "في الإنتظار";
      this.ticketService.Create(this.ticket).subscribe(res => {
        let id = res.id
        this.pj.idTicket = id;
        let path = this.rootUrl.getPath();
        this.fileslist.forEach(item => {
          this.pj.path = item;
          console.log(item)
          this.http.post(path + '/FilesGestionTickets', this.pj)
            .subscribe(res => {
              this.serviceupload.refreshList();
              this.GetFileName();
            });
        })

        this.toastr.success("تم تسجيل التذكرة  بنجاح", " تسجيل التذكرة ");
        form.resetForm();

        this.numTicket = '[' + res.numTicket +1 +']';
        this.files1 = [];
        this.isValidFormSubmitted = false;
      },
        err => {
          this.toastr.error("فشل تسجيل التذكرة", " تسجيل التذكرة")
        })
        }
   // this.toastr.error("لايمكن رفع تذكرة جديدة في الوقت الحالي")
    
  }
  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesTicket = new FilesTicket();
  public pjs: FilesTicket[];
  public files: string[];

  //get List of Files

  //Files
  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

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






}
