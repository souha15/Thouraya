import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { TransactionService } from '../../../shared/Services/AdministrativeCommunication/transaction.service';
import { ReceptionService } from '../../../shared/Services/AdministrativeCommunication/reception.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { Transaction } from '../../../shared/Models/AdministrativeCommunication/transaction.model';
import { Reception } from '../../../shared/Models/AdministrativeCommunication/reception.model';
import { Chart } from 'node_modules/chart.js'
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { PiecesJointesTr } from '../../../shared/Models/AdministrativeCommunication/pieces-jointes-tr.model';
@Component({
  selector: 'app-main-page-ac',
  templateUrl: './main-page-ac.component.html',
  styleUrls: ['./main-page-ac.component.css']
})
export class MainPageACComponent implements OnInit {

  filter;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private transactionService: TransactionService,
    private UserService: UserServiceService,
    private rootUrl: PathSharedService,
    private http: HttpClient,
    private serviceupload: UploadDownloadService, ) {

    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.alltransaction();

  }

  alltr: Transaction[] = [];
  nbreceived: number = 0;
  nbwork: number = 0;
  nbregistred: number = 0;
  alltransaction() {
    this.transactionService.ListI().subscribe(res => {
      this.alltr = res
      this.nbreceived = this.alltr.length;
      this.nbwork = this.alltr.filter(item => item.etat == "تحت الإجراء").length;
      this.nbregistred = this.alltr.filter(item => item.etat == "محفوظة").length;
    })
  }
  p: Number = 1;
  count: Number = 5;
  tr: Transaction = new Transaction();
  listPj: PiecesJointesTr[] = [];
  listPjFiltred: PiecesJointesTr[] = [];
  populateForm(transaction: Transaction) {
    this.transactionService.formData = Object.assign({}, transaction);
    this.tr = Object.assign({}, transaction)

    this.serviceupload.SearchTrI().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idtransaction == this.tr.id)

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

