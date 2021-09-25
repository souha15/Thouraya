import { Component, OnInit, Input, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { MontageService } from '../../../shared/Services/MediaCenter/Montage/montage.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { FilesMontageService } from '../../../shared/Services/MediaCenter/Montage/files-montage.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { FilesMontage } from '../../../shared/Models/MediaCenter/Montage/files-montage.model';
import { Montage } from '../../../shared/Models/MediaCenter/Montage/montage.model';

@Component({
  selector: 'app-montage-details',
  templateUrl: './montage-details.component.html',
  styleUrls: ['./montage-details.component.css']
})
export class MontageDetailsComponent implements OnInit {

  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;


  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private demService: MontageService,
    private filesService: FilesMontageService,
    public serviceupload: UploadDownloadService, ) { this.downloadStatus = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getIdUrl();
  }


  //get the id in Url

  Id: number;
  listFiles2: FilesMontage[] = [];
  listFiles: FilesMontage[] = [];
  dem: Montage = new Montage();
  testFiles: boolean = false;
  recep: boolean = false;
  envoi: boolean = false; 
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.demService.GetById(this.Id).subscribe(res => {
        this.dem = res
        if (this.dem.etat == "مستلمة") {
          this.recep = true;
        } else {
          this.recep = false;
        }

        if (this.dem.etat == "منجزة") {
          this.envoi = true;
        } else {
          this.envoi = false;
        }

        this.filesService.List().subscribe(res => {
          this.listFiles2 = res;
          this.listFiles = this.listFiles2.filter(item => item.idmontage == this.Id)
          if (this.listFiles.length > 0) {
            this.testFiles = true;
          } else { this.testFiles = false; }
        })
      })
    });
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
