import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { CongeService, CongeFiles } from '../../shared/Services/Rh/conge.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';

import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
import { Conge } from '../../shared/Models/RH/conge.model';
import { SoldeCongeService } from '../../shared/Services/Rh/solde-conge.service';
import { SoldeConge } from '../../shared/Models/RH/solde-conge.model';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-menurequests',
  templateUrl: './menurequests.component.html',
  styleUrls: ['./menurequests.component.css']
})
export class MenurequestsComponent implements OnInit {
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private congeService: CongeService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private soldeCongeService: SoldeCongeService,
    private notifService: NotifService,
    public serviceupload: UploadDownloadService, ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }
  p: Number = 1;
  count: Number = 5;
  ngOnInit(): void {
    this.getUserConnected();
    //this.CongeList();
    this.resetForm();
  }


  //Get UserConnected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  userc: UserDetail = new UserDetail();
  notif: Notif = new Notif();
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.userc = res
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = " تمت الموافقة على طلب الإجازة  من قبل" + ' ' +res.fullName
      this.notif.serviceName = "طلب إجازة"
      this.notif.readUnread = "0";
      this.notif.serviceId = 3;
      this.UserService.getAdminFinDir().subscribe(resDir => {
        this.notif.userReceiverId = resDir.id;
        this.notif.userReceiverName = resDir.fullName;
      })
      this.congeService.GetUsersDemands(this.UserIdConnected).subscribe(res => {
        this.filtredCongeList = res
        console.log(this.filtredCongeList)
      })

    })

  }

  congeList: Conge[] = [];
  filtredCongeList: Conge[] = [];
  CongeList() {
    console.log(this.UserIdConnected)
    this.congeService.GetUsersDemands(this.UserIdConnected).subscribe(res => {
      this.filtredCongeList = res
      console.log(this.filtredCongeList)
    })
  }


  per: Conge = new Conge();
  soldecongel: SoldeConge[] = [];
  soldecongel1: SoldeConge[] = [];
  soldeconge: SoldeConge = new SoldeConge();
  solde2: SoldeConge = new SoldeConge();
  soldeconge1: SoldeConge[] = [];
  soldexist: boolean = false;
  solde: string;
  sc: SoldeConge = new SoldeConge()
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
    this.congeService.formData.dated = this.date;
    if (this.etat == "رفض") {
      this.congeService.formData.attribut2 = "رفض"
    } else {
      //this.UserService.GetUserById(this.per.idUserCreator).subscribe(res => {
        //if (res.attribut1 == "318e6451-f404-43aa-8dcb-fcaef185d0af") {

     
          this.per.transferera = "2"
          this.per.attribut6 = "إعتماد بخصم"
          this.per.etat = "70%"
          this.soldeCongeService.Get().subscribe(res => {
            this.soldecongel1 = res
            this.soldeconge1 = this.soldecongel1.filter(item => item.idUserCreator == this.per.idUserCreator);
            if (this.soldecongel1.length > 0) {

              this.solde2 = this.soldecongel1[this.soldecongel1.length - 1];
            }

            this.soldeCongeService.Get().subscribe(res => {
              this.soldecongel = res
              this.soldecongel.filter(item => item.idUserCreator == this.per.idUserCreator);
              this.soldeconge = this.soldecongel[this.soldecongel.length - 1];
              this.sc = this.soldecongel[this.soldecongel.length - 1]

              if (this.per.type == "إجازة إعتيادية") {
                this.sc.dateenreg = this.date;

                let solde = +this.soldeconge.soldenormal - +this.per.duree
                this.sc.soldenormal = solde.toString();

                this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
                  this.toastr.success('تم التحديث بنجاح', 'نجاح')
                  this.congeService.Edit().subscribe(res => {
                    this.notifService.Add(this.notif).subscribe(res => {

                   
                    this.toastr.success('تم التحديث بنجاح', 'نجاح')
                    this.resetForm();
                      this.getUserConnected();
                    })
                  },
                    err => {
                      this.toastr.error('لم يتم التحديث  ', ' فشل');
                    }


                  )
                })

              }
             else if (this.per.type == "إجازة إضطرارية") {

                this.sc.dateenreg = this.date;
                let solde = +this.soldeconge.soldeurgent - +this.per.duree
                this.sc.soldeurgent = solde.toString();
                this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
                  this.toastr.success('تم التحديث بنجاح', 'نجاح')

                  this.congeService.Edit().subscribe(res => {

                    this.notifService.Add(this.notif).subscribe(res => {
                      this.toastr.success('تم التحديث بنجاح', 'نجاح')
                      this.resetForm();
                      this.getUserConnected();
                    })
         
                  },
                    err => {
                      this.toastr.error('لم يتم التحديث  ', ' فشل');
                    }


                  )
                })

              }

              else if (this.per.type == "إجازة إستثنائية") {

                this.sc.dateenreg = this.date;
                let solde = +this.soldeconge.soldemaladie - +this.per.duree
                this.sc.soldemaladie = solde.toString();
                this.soldeCongeService.PutObservable(this.sc).subscribe(res => {
                  this.toastr.success('تم التحديث بنجاح', 'نجاح')
                  this.congeService.Edit().subscribe(res => {
                    this.notifService.Add(this.notif).subscribe(res => {
                      this.toastr.success('تم التحديث بنجاح', 'نجاح')
                      this.resetForm();
                      this.getUserConnected();
                    })
                  },
                    err => {
                      this.toastr.error('لم يتم التحديث  ', ' فشل');
                    }


                  )
                })

              } else {

                this.congeService.formData.etat = "50%";
                this.congeService.Edit().subscribe(res => {
                  this.notifService.Add(this.notif).subscribe(res => {
                    this.toastr.success('تم التحديث بنجاح', 'نجاح')
                    this.resetForm();
                    this.getUserConnected();
                  })
                },
                  err => {
                    this.toastr.error('لم يتم التحديث  ', ' فشل');
                  }


                )
              }

            })
          })
        }
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
