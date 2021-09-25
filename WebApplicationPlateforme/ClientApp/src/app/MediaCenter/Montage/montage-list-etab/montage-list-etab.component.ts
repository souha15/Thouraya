import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Montage } from '../../../shared/Models/MediaCenter/Montage/montage.model';
import { MontageService } from '../../../shared/Services/MediaCenter/Montage/montage.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Etablissement } from '../../../shared/Models/Etablissement/etablissement.model';
import { UserDetail } from '../../../shared/Models/User/user-detail.model';
import { EtablissementService } from '../../../shared/Services/Etablissement/etablissement.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { FilesMontageService } from '../../../shared/Services/MediaCenter/Montage/files-montage.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';
import { FilesMontage } from '../../../shared/Models/MediaCenter/Montage/files-montage.model';

@Component({
  selector: 'app-montage-list-etab',
  templateUrl: './montage-list-etab.component.html',
  styleUrls: ['./montage-list-etab.component.css']
})
export class MontageListEtabComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private UserService: UserServiceService,
    private toastr: ToastrService,
    private demService: MontageService,
    private filesService: FilesMontageService,
    public serviceupload: UploadDownloadService,
    private etabService: EtablissementService) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getUserConnected();
    this.GetDemandList();
    this.getFiles();
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


  /* Demand List */

  DemandListGlobal: Montage[] = [];
  DemandList: Montage[] = [];
  DemandList2: Montage[] = [];
  GetDemandList() {
    this.demService.List().subscribe(res => {
      this.DemandListGlobal = res;
      this.DemandList2 = this.DemandListGlobal.filter(item => item.transfertAdmin == "1" && +item.etabid == +this.idEtab)
      this.DemandList = this.DemandList2.filter(item => item.etat == "مرسلة" || item.etat == "مستلمة")

    })
  }


  /* Populate Form */

  dem: Montage = new Montage();

  populateForm(dem: Montage) {
    this.dem = Object.assign({}, dem);

  }
  //Reception
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  Reception(form: NgForm) {
    if (this.dem.etat == "مرسلة") {
      this.dem.etat = "مستلمة";
      this.dem.dateReceptiondateEmp = this.date;
      this.dem.idEmp = this.UserId;
      this.dem.nomEmp = this.UserName;
      this.demService.PutObservable(this.dem).subscribe(res => {
        this.toastr.success('تم الإستلام   بنجاح', 'نجاح')
        form.resetForm();
        this.GetDemandList();
      },
        err => {
          this.toastr.error(' لم يتم الإستلام  ', ' فشل');
        })
    } else {
      this.toastr.error('تم إستلام الطلب', ' فشل');
    }
  }

  //Renvoi

  Renvoi(form: NgForm) {
    if (this.dem.etat == "مستلمة") {
      this.dem.etat = "منجزة";
      this.dem.dateDoneadminEmp = this.date;
      this.dem.dateReceptiondateEmp = this.date;
      this.dem.idEmp = this.UserId;
      this.dem.nomEmp = this.UserName;
      this.dem.tavailfait = "1";
      this.demService.PutObservable(this.dem).subscribe(res => {
        this.pj.idmontage = this.dem.id;
        this.fileslist.forEach(item => {
          this.pj.path = item;

          this.filesService.Create(this.pj).subscribe(res => {
            this.serviceupload.refreshList();
            this.GetFileName();

          })
        })

        this.toastr.success('تم التسليم    بنجاح', 'نجاح')
        form.resetForm();
        this.GetDemandList();
      },
        err => {
          this.toastr.error(' لم يتم التسليم   ', ' فشل');
        })
    } else {
      this.toastr.error('لم يتم  إستلام الطلب', ' فشل');
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
  public pj: FilesMontage = new FilesMontage();
  public pjs: FilesMontage[];
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
      this.fileslist.push(this.file.name);

    }
  }

}
