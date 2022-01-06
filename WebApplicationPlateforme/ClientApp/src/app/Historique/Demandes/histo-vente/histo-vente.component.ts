import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ServiceVenteervice } from '../../../shared/Services/ServiceVente/service-vente.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ServiceVente } from '../../../shared/Models/ServiceVente/service-vente.model';
import { OffreVente } from '../../../shared/Models/ServiceVente/offre-vente.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { TypeTypeServiceVenteservice } from '../../../shared/Services/ServiceVente/type-service-vente.service';
import { OffreVenteService } from '../../../shared/Services/ServiceVente/offre-vente.service';

@Component({
  selector: 'app-histo-vente',
  templateUrl: './histo-vente.component.html',
  styleUrls: ['./histo-vente.component.css']
})
export class HistoVenteComponent implements OnInit {
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Input() public fileName: string;
  constructor(private demService: ServiceVenteervice,
    private typeService: TypeTypeServiceVenteservice,
    private offreService: OffreVenteService,
    public serviceupload: UploadDownloadService, ) { this.downloadStatus = new EventEmitter<ProgressStatus>();}


  ngOnInit(): void {
    this.getList();
    this.getTypeService();
  }
  p: Number = 1;
  count: Number = 5;

  demList1: ServiceVente[] = [];
  demList: ServiceVente[] = [];
  getList() {
    this.demService.Get().subscribe(res => {
      this.demList = res
    })
  }

  populateForm(dem: ServiceVente) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);
    this.offreService.Get().subscribe(res => {
      this.lf = res
      this.lf1 = this.lf.filter(item => item.type == "التسعيرة الأولى" && item.idVente == this.dem.id)
      this.lf2 = this.lf.filter(item => item.type == "التسعيرة الثانية" && item.idVente == this.dem.id)
      this.lf3 = this.lf.filter(item => item.type == "التسعيرة الثالثة" && item.idVente == this.dem.id)
    })

  }

  //Get Type Data

  typeList: TbListening[] = [];
  getTypeService() {
    this.typeService.Get().subscribe(res => {
      this.typeList = res;
    });
  }


  dem: ServiceVente = new ServiceVente();
 
  //GetFiles
  lf1: OffreVente[] = [];
  lf2: OffreVente[] = [];
  lf3: OffreVente[] = [];
  lf: OffreVente[] = [];

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
