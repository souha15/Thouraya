import { Component, OnInit, EventEmitter, ElementRef, ViewChild, Output, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ActivatedRoute, Router } from '@angular/router';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { FilsProjetFilesOrgService } from '../../../shared/Services/ProjetOrg/fils-projet-org.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ProjetOrgService } from '../../../shared/Services/ProjetOrg/projet-org.service';
import { OuvrierProjetOuvrierOrgService } from '../../../shared/Services/ProjetOrg/ouvrier-projet-org.service';
import { ProjetOrg } from '../../../shared/Models/ProjetOrg/projet-org.model';
import { FilesProjet } from '../../../shared/Models/Projet/files-projet.model';
import { ProjetFiles } from '../../../shared/Models/ProjetOrg/projet-files.model';
import { ProjetOuvrier } from '../../../shared/Models/ProjetOrg/projet-ouvrier.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-details-projet-org',
  templateUrl: './details-projet-org.component.html',
  styleUrls: ['./details-projet-org.component.css']
})
export class DetailsProjetOrgComponent implements OnInit {
  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  displayUrl;
  constructor(private route: ActivatedRoute,
    public serviceupload: UploadDownloadService,
    private router: Router,
    private UserService: UserServiceService,
    private fileService: FilsProjetFilesOrgService,
    private projetService: ProjetOrgService,
    private ouvrierService: OuvrierProjetOuvrierOrgService,
  ) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getFiles();
    this.getOuvriers();
    this.getUserConnected()
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

  eventId: number;
  ev: ProjetOrg = new ProjetOrg();
  edit: boolean = false;
  pathvid: string;
  bo: boolean = false;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.projetService.GetById(this.eventId).subscribe(res => {
        this.ev = res
        
      })
    });



  }

  files1: ProjetFiles[] = [];
  filesList: ProjetFiles[] = [];
  getFiles() {
    this.fileService.Get().subscribe(res => {
      this.files1 = res
      this.filesList = this.files1.filter(item => item.idprojet == this.eventId)
    })
  }

  OuvList: ProjetOuvrier[] = [];
  OuvList2: ProjetOuvrier[] = [];
  getOuvriers() {
    this.ouvrierService.Get().subscribe(res => {
      this.OuvList2 = res
      this.OuvList = this.OuvList2.filter(item => item.idprojet == this.eventId)
    })
  }


  download1() {
    this.filesList.forEach(item => {
      this.download(item.pathc)
    })
  }

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
