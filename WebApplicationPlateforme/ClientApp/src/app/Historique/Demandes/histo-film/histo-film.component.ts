import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { FilesFilmService } from '../../../shared/Services/MediaCenter/film/files-film.service';
import { FilmService } from '../../../shared/Services/MediaCenter/film/film.service';
import { Film } from '../../../shared/Models/MediaCenter/film/film.model';
import { FilesFilm } from '../../../shared/Models/MediaCenter/film/files-film.model';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-histo-film',
  templateUrl: './histo-film.component.html',
  styleUrls: ['./histo-film.component.css']
})
export class HistoFilmComponent implements OnInit {


  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: FilmService,
    private filesService: FilesFilmService,
    public serviceupload: UploadDownloadService, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList()
  }
  p: Number = 1;
  count: Number = 5;


  /* Populate Form */

  dem: Film = new Film();
  oc: boolean = false;
  ho: boolean = false;
  Id: number;
  populateForm(dem: Film) {
    this.dem = Object.assign({}, dem);
    this.Id = this.dem.id;

    this.GetfilesList();

    if (this.dem.typefilm == "أخرى") {
      this.ho = true;
    } else {
      this.ho = false;
    }
  }


  // Files List
  listfiles: FilesFilm[] = [];
  Listfiles: FilesFilm[] = [];
  TestListFiles: boolean = false;
  GetfilesList() {
    this.filesService.List().subscribe(res => {
      this.Listfiles = res;
      this.listfiles = this.Listfiles.filter(item => item.idFilm == this.Id)
      if (this.listfiles.length != 0) {
        this.TestListFiles = true;
      } else {
        this.TestListFiles = false;
      }
    })
  }

  /* Demand List */

  DemandListGlobal: Film[] = [];
  DemandList: Film[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandList = res;

    })
  }

  occ: boolean = false;
  getOccasion(event) {

    if (event.target.value == "أخرى") {
      this.occ = true;

    } else {
      this.occ = false;

    }
  }

  /** Get User Connected **/

  UserId: string;
  UserName: string;
  idEtab: number;
  nomEtab: string;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.UserId = res.id;
      this.UserName = res.fullName;
      this.idEtab = res.idDepartement;
      this.nomEtab = res.nomDepartement;
    })

  }
  /*** Accepter *****/

  date = new Date().toLocaleDateString();
  accept() {
    this.dem.diretat = "موافقة"
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;
    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  قبول الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم  قبول الطلب', ' فشل');
      })

  }

  /**  Refuser **/

  refuse() {
    this.dem.diretat = "رفض"
    this.dem.dirdate = this.date
    this.dem.dirid = this.UserId;
    this.dem.dirnom = this.UserName;

    this.demService.PutObservableE(this.dem).subscribe(res => {
      this.GetDemandList();
      this.toastr.success("تم  رفض الطلب بنجاح", "نجاح");
    },
      err => {
        this.toastr.warning('لم يتم رفض الطلب ', ' فشل');
      })
  }


  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.demService.Delete(id)
        .subscribe(res => {
          this.GetDemandList();
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
