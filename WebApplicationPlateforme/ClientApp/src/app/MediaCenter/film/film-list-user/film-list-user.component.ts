import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { TblSettingsMediaCenterService } from '../../../shared/Services/MediaCenter/tbl-settings-media-center.service';
import { Film } from '../../../shared/Models/MediaCenter/film/film.model';
import { FilmService } from '../../../shared/Services/MediaCenter/film/film.service';
import { FilesFilmService } from '../../../shared/Services/MediaCenter/film/files-film.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { FilesFilm } from '../../../shared/Models/MediaCenter/film/files-film.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-film-list-user',
  templateUrl: './film-list-user.component.html',
  styleUrls: ['./film-list-user.component.css']
})
export class FilmListUserComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: FilmService,
    private filesService: FilesFilmService,
    public serviceupload: UploadDownloadService,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList()
  }

  p: Number = 1;
  count: Number = 5;


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

  /* Populate Form */

  dem: Film = new Film();
  oc: boolean = false;
  ho: boolean = false;
  Id: number;
  populateForm(dem: Film) {
    this.dem = Object.assign({}, dem);
    this.Id = this.dem.id;
    this.GetfilesList();
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

  del(Id) {
    this.filesService.Delete(Id).subscribe(res => {
      this.GetfilesList();
    })
  }

  /* Demand List */

  DemandListGlobal: Film[] = [];
  DemandList: Film[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList = this.DemandListGlobal.filter(item => item.idUserCreator == this.UserId)

    })
  }

  /** OnSubmit **/

  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;

      this.demService.PutObservableE(this.dem).subscribe(res => {
        this.pj.idFilm = this.Id;
        this.fileslist.forEach(item => {
          this.pj.path = item;

          this.filesService.Create(this.pj).subscribe(res => {
            this.serviceupload.refreshList();
            this.GetFileName();
          })

        })
        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        form.resetForm();
        this.fileslist = [];
        this.TestListFiles = false;
        this.GetDemandList();
      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل")
        })
    }
  }


  occ: boolean = false;
  getOccasion(event) {

    if (event.target.value == "أخرى") {
      this.occ = true;

    } else {
      this.occ = false;

    }



  }

  /*Delete*/
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.demService.Delete(Id)
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

  //Files
  files1: File[] = [];
  onSelect(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }
  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: FilesFilm = new FilesFilm();
  public pjs: FilesFilm[];
  public files: string[];

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

  //Get file name for Database

  GetFileName() {
    let sa: string;
    let s: any;
    let finalres: any;
    let i: number = 0;
    let tlistnew: any[] = [];
    for (var k = 0; k < this.files.length; k++) {
      sa = <string>this.files[k]
      s = sa.toString().split('uploads\\,', sa.length - 1);
      finalres = s.toString().split('uploads\\', sa.length - 1);

      tlistnew[i] = finalres[1]
      i++;


    }


  }

  //Upload

  //Save it ToDatabase
  Idtransaction: number;
  url: any;
  file: any;
  fileslist: string[] = [];
  public upload(event) {
    if (event.addedFiles && event.addedFiles.length > 0) {
      this.file = event.addedFiles[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                // this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          /// this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      let ext: string;
      ext = this.file.name.substring(this.file.name.indexOf('.') + 1);

      if (ext == "pdf" || ext == "txt" || ext == 'doc') {
        this.fileslist.push(this.file.name);
      } else {
        this.toastr.warning("يجب ارفاق رابط الملف", "");
      }


    }
  }
}
