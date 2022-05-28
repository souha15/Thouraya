import { Component, OnInit, Input, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { DesignImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/design-impression.service';
import { FilesImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/files-impression.service';
import { FilesImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/files-impression.model';
import { DesignImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/design-impression.model';
import { TypeImpressionService } from '../../../shared/Services/MediaCenter/ImpressionDesign/type-impression.service';
import { TypeImpression } from '../../../shared/Models/MediaCenter/ImpressionDesign/type-impression.model';

@Component({
  selector: 'app-design-details',
  templateUrl: './design-details.component.html',
  styleUrls: ['./design-details.component.css']
})
export class DesignDetailsComponent implements OnInit {
  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private demService: DesignImpressionService,
    private filesService: FilesImpressionService,
    private nomdesignService: TypeImpressionService,
    public serviceupload: UploadDownloadService, ) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }


  ngOnInit(): void {
    this.getIdUrl()
  }

  /**** Selected Type Event ***/

  elec: boolean = false;
  bruch: boolean = false;
  imp: boolean = false;
  rap: boolean = false;
  ban: boolean = false;
  dip: boolean = false;
  drou: boolean = false;
  autre: boolean = false;

  //get the id in Url

  Id: number;
  listFiles2: FilesImpression[] = [];
  listFiles: FilesImpression[] = [];
  listnomdesign: TypeImpression[] = [];
  TypeImpList: TypeImpression[] = [];
  dem: DesignImpression = new DesignImpression();
  testFiles: boolean = false;
  TypeImpTest: boolean = false;
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

 

        this.nomdesignService.List().subscribe(res => {
          this.listnomdesign = res;
          this.TypeImpList = this.listnomdesign.filter(item => item.idImpression == this.Id)
          if (this.TypeImpList.length > 0) {
            if (this.dem.attribut2 == "تصميم للنشر الإلكتروني فقط") {
              this.elec = true;

            } else if (this.dem.attribut2 == "تصميم وطباعة بروشور") {
         
              this.bruch = true;

            } else if (this.dem.attribut2 == "تصميم وطباعة استندات") {

              this.imp = true;

            } else if (this.dem.attribut2 == "تصميم وطباعة تقرير") {

              this.rap = true;

            } else if (this.dem.attribut2 == "تصميم وطباعة بنر واللوحات") {

              this.ban = true;

            } else if (this.dem.attribut2 == "تصميم وطباعة الشهادات") {

              this.dip = true;

            } else if (this.dem.attribut2 == "تصميم وطباعة الدروع") {

              this.drou = true;

            } else if (this.dem.attribut2 == "أخرى") {

              this.autre = true;
            }
            this.TypeImpTest = true;
          } else { this.TypeImpTest = false; }

          this.filesService.List().subscribe(res => {
            this.listFiles2 = res;
            this.listFiles = this.listFiles2.filter(item => item.idImpression == this.Id)
            if (this.listFiles.length > 0) {
              this.testFiles = true;
            } else { this.testFiles = false; }
          })
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
