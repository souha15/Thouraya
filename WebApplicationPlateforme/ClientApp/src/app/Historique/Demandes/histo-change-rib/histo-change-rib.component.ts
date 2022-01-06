import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ChangerRibService } from '../../../shared/Services/ChangeRib/changer-rib.service';
import { ChangerRib } from '../../../shared/Models/ChangeRib/changer-rib.model';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { FilesChangerRibService } from '../../../shared/Services/ChangeRib/files-changer-rib.service';
import { FilesChangerRib } from '../../../shared/Models/ChangeRib/files-changer-rib.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-histo-change-rib',
  templateUrl: './histo-change-rib.component.html',
  styleUrls: ['./histo-change-rib.component.css']
})
export class HistoChangeRibComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private demService: ChangerRibService,
    public serviceupload: UploadDownloadService,
    private filesService: FilesChangerRibService,) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.GetDemandList();
  }

  p: Number = 1;

  count: Number = 5;
  /* Demand List */

  DemandListGlobal: ChangerRib[] = [];
  DemandList: ChangerRib[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res
      this.DemandList = this.DemandListGlobal.filter(item => item.etatrh == "في الانتظار")

    })
  }
  /* Populate Form */

  dem: ChangerRib = new ChangerRib();
  oc: boolean = false;
  ho: boolean = false;
  Id: number;
  populateForm(dem: ChangerRib) {
    this.dem = Object.assign({}, dem);
    this.Id = this.dem.id;
    this.GetfilesList();
  }

  // Files List
  listfiles: FilesChangerRib[] = [];
  Listfiles: FilesChangerRib[] = [];
  TestListFiles: boolean = false;
  GetfilesList() {
    this.filesService.List().subscribe(res => {
      this.Listfiles = res;
      this.listfiles = this.Listfiles.filter(item => item.idDem == this.Id)
      if (this.listfiles.length != 0) {
        this.TestListFiles = true;
      } else {
        this.TestListFiles = false;
      }
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
