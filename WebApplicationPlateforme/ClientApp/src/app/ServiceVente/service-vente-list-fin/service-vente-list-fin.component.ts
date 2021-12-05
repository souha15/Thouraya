import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ServiceVenteervice } from '../../shared/Services/ServiceVente/service-vente.service';
import { TypeTypeServiceVenteservice } from '../../shared/Services/ServiceVente/type-service-vente.service';
import { OffreVenteService } from '../../shared/Services/ServiceVente/offre-vente.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ServiceVente } from '../../shared/Models/ServiceVente/service-vente.model';
import { NgForm } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { OffreVente } from '../../shared/Models/ServiceVente/offre-vente.model';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
@Component({
  selector: 'app-service-vente-list-fin',
  templateUrl: './service-vente-list-fin.component.html',
  styleUrls: ['./service-vente-list-fin.component.css']
})
export class ServiceVenteListFinComponent implements OnInit {

  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Input() public fileName: string;
  constructor(private demService: ServiceVenteervice,
    private typeService: TypeTypeServiceVenteservice,
    private offreService: OffreVenteService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getList();
    this.getUserConnected();
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
  // Get User Connected

  adminId: number;
  admin: string;
  userName: string;
  userId: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.userId = res.id;
      this.userName = res.fullName;
      if (res.idAdministration != null) {
        this.adminId = res.idAdministration
        this.admin = res.nomAdministration
      }


    })

  }

  dem: ServiceVente = new ServiceVente();
  isValidFormSubmitted = false;
  path: string;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {
      this.isValidFormSubmitted = true
      this.dem.datefin = this.date
      this.dem.idfin = this.userId;
      this.dem.nomfin = this.userName;
      this.toastr.success("تمت الإضافة بنجاح", "نجاح");
      this.demService.PutObservableE(this.dem).subscribe(res => {
       this.getList();
        form.resetForm();

      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }
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
