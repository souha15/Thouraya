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
  selector: 'app-film-add',
  templateUrl: './film-add.component.html',
  styleUrls: ['./film-add.component.css']
})
export class FilmAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private menuSettings: TblSettingsMediaCenterService,
    private demService: FilmService,
    private filesService: FilesFilmService,
    public serviceupload: UploadDownloadService,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();
    this.getFiles();
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


  /** OnSubmit **/

  dem: Film = new Film();
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.dem.dateenreg = this.date;
      this.dem.diretat = "في الانتظار";
      this.dem.idUserCreator = this.UserId;
      this.dem.userNameCreator = this.UserName;
      this.dem.etabid = this.idEtab.toString();
      this.dem.etabnom = this.nomEtab;
      this.demService.Create(this.dem).subscribe(res => {
        this.pj.idFilm = res.id;
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
      
      if (ext == "pdf" || ext == "txt" || ext == 'doc' || ext == "docx") {
        this.fileslist.push(this.file.name);
      } else {
        this.toastr.warning("يجب ارفاق رابط الملف", "");
      }
   
 
    }
  }
}
