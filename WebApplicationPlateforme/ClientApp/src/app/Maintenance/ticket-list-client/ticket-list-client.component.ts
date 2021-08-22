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

@Component({
  selector: 'app-ticket-list-client',
  templateUrl: './ticket-list-client.component.html',
  styleUrls: ['./ticket-list-client.component.css']
})
export class TicketListClientComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  filter;
  constructor(private ticketService: TicketService,
    private toastr: ToastrService,
    private filesTicketService: FilesFilesTicketService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    public serviceupload: UploadDownloadService, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getTicketsList();
    this.resetForm();
    this.getFiles();
  }



  // This Get Tickets List
  p: Number = 1;
  count: Number = 5;
  ticketList: Ticket[] = [];
  getTicketsList() {
    this.ticketService.List().subscribe(res => {
      this.ticketList = res;
    })
  }




  ticket: Ticket = new Ticket();
  ticketfilesG: FilesTicket[]=[]
  ticketfiles: FilesTicket[]=[]
  id: number;
  populateForm(facture: Ticket) {
    this.ticketService.formData = Object.assign({}, facture)
    this.id = facture.id;
    this.ticket = Object.assign({}, facture);
    this.filesTicketService.List().subscribe(res => {
      this.ticketfilesG = res
      this.ticketfiles = this.ticketfilesG.filter(item => item.idTic == this.id)
    })
  }

  date = new Date().toLocaleDateString();
  isValidFormSubmitted = false;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {

      this.isValidFormSubmitted = true

      if (this.ticket.etat == "في الإنتظار") {
        this.updateRecord(form);
        this.getTicketsList();
      } else {
        this.toastr.error("التذكرة  تحت الإجراء","فشل")
      }
     
    }
  }

  updateRecord(form: NgForm) {

    this.ticketService.Edit().subscribe(
      res => {
      this.pj.idTic = this.id;
      let path = this.rootUrl.getPath();
      this.fileslist.forEach(item => {
        this.pj.path = item;
        console.log(item)
        this.http.post(path + '/FilesTickets', this.pj)
          .subscribe(res => {
            this.serviceupload.refreshList();
            this.GetFileName();
          });
      })

        this.toastr.success("تم تحديث التذكرة  بنجاح", " تحديث التذكرة ");
        form.resetForm();
        this.files1 = [];
        this.isValidFormSubmitted = false;
      }, err => {
        this.toastr.error("فشل تحديث التذكرة", " تحديث التذكرة")
      }
        )
  }


  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.ticketService.formData = {
      id: null,
      date: '',
      titre: '',
      prob: '',
      details: '',
      pageUrl: '',
      remarque: '',
      etat: '',
      etatdate:'',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',

    }
  }

  onDelete(Id) {
    if (this.ticket.etat == "في الإنتظار") {
      if (confirm('Are you sure to delete this record ?')) {
        this.ticketService.Delete(Id)
          .subscribe(res => {
            this.getTicketsList();
            this.toastr.success("تم الحذف  بنجاح", "نجاح");
          },

            err => {
              console.log(err);
              this.toastr.warning('لم يتم الحذف  ', ' فشل');

            }
          )

      }
    } else {
      this.toastr.error("التذكرة  تحت الإجراء", "فشل")
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
