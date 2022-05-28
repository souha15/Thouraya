import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { NgForm } from '@angular/forms';
import { CongeService, CongeFiles } from '../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Conge } from '../../shared/Models/RH/conge.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';

@Component({
  selector: 'app-salaire-report-print',
  templateUrl: './salaire-report-print.component.html',
  styleUrls: ['./salaire-report-print.component.css']
})
export class SalaireReportPrintComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }
  p: Number = 1;
  count: Number = 5;
  ngOnInit(): void {
    this.getUserConnected();
    this.CongeList();
    this.resetForm();
  }

  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  filtredCongeList2: Conge[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.congeList = res
      this.filtredCongeList = this.congeList.filter(item => (item.transferera == "1" || item.transferera == "3") && item.etatetab == null)
      //this.filtredCongeList = this.filtredCongeList2.filter(item => item.attribut6 == "إعتماد بخصم" || item.attribut6 =="إعتماد بغير خصم")
    })
  }


  per: Conge = new Conge();
  filesList: CongeFiles[] = [];
  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
    this.congeService.GetByCongesIdCF(this.per.id).subscribe(res => {
      this.filesList = res
    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }
  date = new Date().toLocaleDateString();
  conge: Conge = new Conge();

  updateRecord(form: NgForm) {

    this.conge = Object.assign(this.conge, form.value);
    this.congeService.formData.datefin = this.date;
    this.congeService.formData.idtetab = this.UserIdConnected;
    this.congeService.formData.nomtetab = this.UserNameConnected;
    this.congeService.formData.etatetab = this.etat

    if (this.etat == "رفض") {
      this.congeService.formData.attribut2 = "رفض"
    }
    this.congeService.formData.etat = "100%";
    this.congeService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.resetForm();
      this.CongeList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )

  }

  onSubmit(form: NgForm) {

    this.updateRecord(form)
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.congeService.formData = {
      id: null,
      transferera: '',
      transfereretab: '',
      transfertrh: '',
      transfertdeux: '',
      datetransfert: '',
      idtrh: '',
      idtetab: '',
      nomtrh: '',
      nomtetab: '',
      etatrh: '',
      etatetab: '',
      daterh: '',
      dateetab: '',
      tran1: '',
      tran2: '',
      tran3: '',
      tran4: '',
      tran5: '',
      tran6: '',
      datedebut: '',
      datefin: '',
      duree: '',
      tel: '',
      type: '',
      adr: '',
      idremplacant: '',
      nomremplacant: '',
      etat: '',
      etatd: '',
      directeurid: '',
      directeurnom: '',
      rhid: '',
      rhnom: '',
      dated: '',
      attribut1: null,
      attribut2: '',
      attribut3: '',
      attribut4: '',
      attribut5: '',
      attribut6: '',
      dateenreg: '',
      userNameCreator: '',
      idUserCreator: '',

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
