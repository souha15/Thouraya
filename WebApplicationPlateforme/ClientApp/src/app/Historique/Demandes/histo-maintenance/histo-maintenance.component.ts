import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MaintenanceRequestService } from '../../../shared/Services/ServiceRh/maintenance-request.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { MaintenanceRequest } from '../../../shared/Models/ServiceRh/maintenance-request.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-histo-maintenance',
  templateUrl: './histo-maintenance.component.html',
  styleUrls: ['./histo-maintenance.component.css']
})
export class HistoMaintenanceComponent implements OnInit {
  filter;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private mnService: MaintenanceRequestService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private toastr: ToastrService) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getCreance();
  }
  //Populate Form 
  factId: number
  fact: MaintenanceRequest = new MaintenanceRequest();
  etatok: boolean;
  cheque: boolean = false;
  banque: boolean = false;
  populateForm(facture: MaintenanceRequest) {
    this.mnService.formData = Object.assign({}, facture)
    this.factId = facture.id;
    this.fact = Object.assign({}, facture);

    if (this.fact.etat == "في الإنتظار") {
      this.etatok = false;
    } else
      this.etatok = true
  }

  factList: MaintenanceRequest[] = [];
  GfactList: MaintenanceRequest[] = [];

  getCreance() {
    this.mnService.Get().subscribe(res => {
      this.factList = res;
    })

  }

  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.mnService.Delete(id)
        .subscribe(res => {
          this.getCreance();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');
          }
        )

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
