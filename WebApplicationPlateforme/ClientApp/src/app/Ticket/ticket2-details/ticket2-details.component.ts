import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';

import { Subscription } from 'rxjs';

import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { EtablissementService } from '../../shared/Services/Etablissement/etablissement.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

import { FilesTicket2Service } from '../../shared/Services/Ticket2/files-ticket2.service';
import { NotifTicket2Service } from '../../shared/Services/Ticket2/notif-ticket2.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { ToastrService } from 'ngx-toastr';
import { Etablissement } from '../../shared/Models/Etablissement/etablissement.model';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { NgForm } from '@angular/forms';
import { Ticket2 } from '../../shared/Models/Ticket2/ticket2.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';

import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { FilesTicket2 } from '../../shared/Models/Ticket2/files-ticket2.model';
import { NotifTicket2 } from '../../shared/Models/Ticket2/notif-ticket2.model';
import { Ticket2Service } from '../../shared/Services/Ticket2/ticket2.service';

@Component({
  selector: 'app-ticket2-details',
  templateUrl: './ticket2-details.component.html',
  styleUrls: ['./ticket2-details.component.css']
})
export class Ticket2DetailsComponent implements OnInit {

  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
    downloadStatus: any;

  constructor(private ticketService: Ticket2Service,
    private route: ActivatedRoute,
    private UserService: UserServiceService,
    private filesticketService: FilesTicket2Service,
    private toastr: ToastrService,
    private http: HttpClient,
    public serviceupload: UploadDownloadService,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getFiles();
  }

  Id: number;
  ev: Ticket2 = new Ticket2();
  ToUser: boolean = false;
  ToAdmin: boolean = false;
  ToEtab: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']
      this.ticketService.GetById(this.Id).subscribe(res => {
        this.ev = res
        if (this.ev.attribut1 == "user") {
          this.ToUser = true;
          this.ToAdmin = false;
          this.ToEtab = false;
        } else if (this.ev.attribut1 =="admin") {
          this.ToUser = false;
          this.ToAdmin = true;
          this.ToEtab = false;
        } else {
          this.ToUser = false;
          this.ToAdmin = false;
          this.ToEtab = true;
        }

      })
    })

  }

  //get Files
  FilesList: FilesTicket2[] = [];
  FilesList2: FilesTicket2[] = [];
  getFiles() {
    this.filesticketService.ListFilesTicket2().subscribe(res => {
      this.FilesList2 = res
      this.FilesList = this.FilesList2.filter(item => item.idTicket == this.ev.id)
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
}
