import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { GestBenService } from '../../../shared/Services/GestBen/gest-ben.service';
import { GestBen } from '../../../shared/Models/GestBen/gest-ben.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { FamilleService } from '../../../shared/Services/GestBen/famille.service';
import { Famille } from '../../../shared/Models/GestBen/famille.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsBenService } from '../../../shared/Services/GestBen/settings-ben.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { RevenusBenService } from '../../../shared/Services/GestBen/revenus-ben.service';
import { RevenusBen } from '../../../shared/Models/GestBen/revenus-ben.model';
import { ResidanceService } from '../../../shared/Services/GestBen/residance.service';
import { ResidanceBen } from '../../../shared/Models/GestBen/residance-ben.model';
import { CompteBenService } from '../../../shared/Services/GestBen/compte-ben.service';
import { CompteBen } from '../../../shared/Models/GestBen/compte-ben.model';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { FilesBenService } from '../../../shared/Services/GestBen/files-ben.service';
import { FilesBen } from '../../../shared/Models/GestBen/files-ben.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gest-ben-detail',
  templateUrl: './gest-ben-detail.component.html',
  styleUrls: ['./gest-ben-detail.component.css']
})
export class GestBenDetailComponent implements OnInit {
  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  constructor(private benService: GestBenService,
    private UserService: UserServiceService,
    private familleService: FamilleService,
    private toastr: ToastrService,
    private settingsService: SettingsBenService,
    private revBenService: RevenusBenService,
    private residanceService: ResidanceService,
    private compteService: CompteBenService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private route: ActivatedRoute,
    private filesService: FilesBenService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {

    this.getIdUrl();
    this.getUserConnected();
    this.getFiles();
    this.getFamille();
    this.getResidance();
    this.getRevenus();
    this.getCompte();
  }




  //Get UserConnected
  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  //get the id in Url

  Id: number;
  ben: GestBen = new GestBen();

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.benService.GetById(this.Id).subscribe(res => {
        this.ben = res

      })
    });

  }

  //get Files
  FilesBen: FilesBen[] = [];
  FilesBenList: FilesBen[] = [];
  file: boolean = false;
  getFiles() {
    this.filesService.ListFilesBen().subscribe(res => {
      this.FilesBenList = res
      this.FilesBen = this.FilesBenList.filter(item => item.idBen == this.Id)
      if (this.FilesBen.length != 0) {
        this.file = true;
      } else {
        this.file = false;
      }
    })
  }

  //get Residance

  ResiBenList: ResidanceBen[] = [];
  ResiList: ResidanceBen[] = [];
  residance: boolean = false;
  getResidance() {
    this.residanceService.ListResidanceBen().subscribe(res => {
      this.ResiBenList = res
      this.ResiList = this.ResiBenList.filter(item => item.idBen == this.Id)
      if (this.ResiList.length != 0) {
        this.residance = true;
      } else {
        this.residance = false;
      }
    })
  }

  // get Revenus

  RevBenList: RevenusBen[] = [];
  RevBen: RevenusBen[] = [];
  revenus: boolean = false;
  getRevenus() {

    this.revBenService.ListRevenusBen().subscribe(res => {
      this.RevBenList = res
      this.RevBen = this.RevBenList.filter(item => item.idBen == this.Id)
      if (this.RevBen.length != 0) {
        this.revenus = true;
      }
      else {
        this.revenus = false;
      }
    })
  }

  // get Famille

  FamilleBenList: Famille[] = [];
  FamilleBen: Famille[] = [];
  famille: boolean = false;

  getFamille() {
    this.familleService.ListFamille().subscribe(res => {
      this.FamilleBenList = res
      this.FamilleBen = this.FamilleBenList.filter(item => item.idBen == this.Id)
      if (this.FamilleBen.length != 0) {
        this.famille = true;
      } else {
        this.famille = false;
      }
    })
  }


  //Get Compte

  CompteBenList: CompteBen[] = [];
  CompteBen: CompteBen[] = [];
  compte: boolean = false;
  getCompte() {
    this.compteService.ListCompteBen().subscribe(res => {
      this.CompteBenList = res
      this.CompteBen = this.CompteBenList.filter(item => item.idBen == this.Id)
      if (this.CompteBen.length != 0) {
        this.compte = true
      } else {
        this.compte = false;
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
