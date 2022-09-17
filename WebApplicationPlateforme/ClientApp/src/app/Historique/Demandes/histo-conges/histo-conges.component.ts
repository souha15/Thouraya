import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CongeService, CongeFiles } from '../../../shared/Services/Rh/conge.service';
import { Conge } from '../../../shared/Models/RH/conge.model';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
@Component({
  selector: 'app-histo-conges',
  templateUrl: './histo-conges.component.html',
  styleUrls: ['./histo-conges.component.css']
})
export class HistoCongesComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  filter;
  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    public serviceupload: UploadDownloadService, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.CongeList();
    this.resetForm();
  }

  p: Number = 1;
  count: Number = 5;

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  filtredCongeList2: Conge[] = [];
  CongeList() {
    this.congeService.Get().subscribe(res => {
      this.filtredCongeList = res
      //this.filtredCongeList = this.filtredCongeList2.filter(item => item.attribut6 == "إعتماد بخصم" || item.attribut6 =="إعتماد بغير خصم")
    })
  }


  per: Conge = new Conge();
  val: string;
  test0: boolean = false;
  test25: boolean = false;
  test50: boolean = false;
  test70: boolean = false;
  test100: boolean = false;
  filesList: CongeFiles[] = [];
  populateForm(conge: Conge) {
    this.per = Object.assign({}, conge)
    this.congeService.formData = Object.assign({}, conge)
    if (this.per.etat == "100%") {
      this.val = this.per.etat;
      this.test0 = false;
      this.test100 = true;
      this.test25 = false;
      this.test50 = false;
      this.test70 = false;
    } else if (this.per.etat == "50%") {
      this.val = this.per.etat;
      this.test0 = false;
      this.test100 = false;
      this.test25 = false;
      this.test50 = true;
      this.test70 = false;
    } else if (this.per.etat == "5%") {
      this.val = this.per.etat;
      this.test0 = true;
      this.test100 = false;
      this.test25 = false;
      this.test50 = false;
      this.test70 = false;
    }
    else if (this.per.etat == "25%") {
      this.val = this.per.etat;
      this.test0 = false;
      this.test100 = false;
      this.test25 = true;
      this.test50 = false;
      this.test70 = false;
    }
    else {
      this.val = "70%";
      this.test70 = true;
      this.test100 = false;
      this.test0 = false;
      this.test25 = false;
      this.test50 = false;

    }
    if (this.per.etatetab == "موافق" && this.per.etat !="50%") {
      this.val = "50%";
      this.test70 = false;
      this.test100 = false;
      this.test0 = false;
      this.test25 = false;
      this.test50 = true;
    }

    if (this.per.etatd == "موافق" && this.per.etat != "25%") {
      this.val = "25%";
      this.test70 = false;
      this.test100 = false;
      this.test0 = false;
      this.test25 = false;
      this.test50 = true;
    }

    //console.log(this.per)
    //if (this.per.etatd == 'في الانتظار') {
    //  this.val = '0%'
    //  this.test0 = true;
    //  this.test100 = false;
    //  this.test25 = false;
    //  this.test50 = false;
    //  this.test70 = false;
    //}
    //else if (this.per.attribut2 == 'موافق') {
    //  this.test100 = true;
    //  this.test0 = false;
    //  this.test25 = false;
    //  this.test50 = false;
    //  this.test70 = false;
    //}
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
    this.congeService.formData.dated = this.date;
    this.congeService.formData.etat = "100%";
    this.congeService.Edit().subscribe(res => {
     
        this.toastr.success('تم التحديث بنجاح', 'نجاح')
        this.resetForm();
        this.CongeList();

    
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      })
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
      etatetab: '',
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
      etatrh: '',
      directeurid: '',
      directeurnom: '',
      rhid: '',
      rhnom: '',
      dated: '',
      daterh: '',
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

  onDelete(id: number) {


    if (confirm('هل أنت متأكد من حذف هذا السجل؟')) {
      this.congeService.Delete(id)
        .subscribe(res => {
          this.CongeList();
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
