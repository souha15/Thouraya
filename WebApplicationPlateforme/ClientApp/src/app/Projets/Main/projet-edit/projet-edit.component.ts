import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { ProjetService } from '../../../shared/Services/Projets/projet.service';
import { ToastrService } from 'ngx-toastr';
import { OrganismeService } from '../../../shared/Services/AdministrativeCommunication/organisme.service';
import { OrgSuppService } from '../../../shared/Services/Projets/org-supp.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { FilesProjet } from '../../../shared/Models/Projet/files-projet.model';
import { RapportProjet } from '../../../shared/Models/Projet/rapport-projet.model';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { OrganismeSupp } from '../../../shared/Models/Projet/organisme-supp.model';
import { NgForm } from '@angular/forms';
import { Projet } from '../../../shared/Models/Projet/projet.model';
import { PayementProjet } from '../../../shared/Models/Projet/payement-projet.model';
import { PayementProjetService } from '../../../shared/Services/Projets/payement-projet.service';
import { PathSharedService } from '../../../shared/path-shared.service';
import { ButProjetService } from '../../../shared/Services/Projets/but-projet.service';
import { ButProjet } from '../../../shared/Models/Projet/but-projet.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { FilesProjetService } from '../../../shared/Services/Projets/files-projet.service';
import { RapportProjetService } from '../../../shared/Services/Projets/rapport-projet.service';

@Component({
  selector: 'app-projet-edit',
  templateUrl: './projet-edit.component.html',
  styleUrls: ['./projet-edit.component.css']
})
export class ProjetEditComponent implements OnInit {


  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;
  constructor(private listeningService: ListeningProjetService,
    private projetService: ProjetService,
    private payService: PayementProjetService,
    private toastr: ToastrService,
    private orgSuppService: OrgSuppService,
    public serviceupload: UploadDownloadService,
    private UserService: UserServiceService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private butService: ButProjetService,
    private router: Router,
    private route: ActivatedRoute,
    private filesService: FilesProjetService,
    private rapportService: RapportProjetService,

  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getDataTbL();
    this.getOrgSupp();
    this.getUserConnected();
    this.getBut();
    this.getActivate();
    this.getFiles();
    this.getFilesList();
    this.getRapportList();

  }

  eventId: number;

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.projetService.GetById(this.eventId).subscribe(res => {
        this.pr = res

      })
    });
  }
  //Get User Connected
  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })

  }

  //etat test
  isEnabled: boolean = false;
  abel: string;
  etatest(event) {
    this.abel = event.target.value
    if (this.abel == "مغلق") {
      this.isEnabled = true;

    } else { this.isEnabled = false; }

    console.log(this.isEnabled)
  }

  // Payement Projet


  rf: RapportProjet = new RapportProjet();

  pay: PayementProjet = new PayementProjet();
  payList: PayementProjet[] = [];
  payListF: PayementProjet[] = [];
  payList2: PayementProjet[] = [];
  payList3: PayementProjet[] = [];
  i = 0;
  paytest: boolean;
  paytest2: boolean=false;
  sommepay: number;


  getActivate() {
    this.payService.Get().subscribe(res => {
      this.payListF = res;
      this.payList = this.payListF.filter(item => item.idprojet == this.eventId)
      if (this.payList.length != 0) {
        this.paytest = true;
      }
    })
  }
  addActivite() {
    this.paytest2 = true;
    this.pay.creatorName = this.UserNameConnected;
    this.pay.idUserCreator = this.UserIdConnected;
    this.pay.datenereg = this.date;
    this.sommepay = +this.pay.nb * +this.pay.prix
    this.pay.totprix = this.sommepay;
    this.payList3[this.i] = this.pay
    this.pay = new PayementProjet();
    this.i = this.i + 1;

  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.payList3.splice(this.payList3.indexOf(dp), 1);
    this.i = this.i - 1
    this.pay = new PayementProjet();

  }

  del11(Id) {
    this.payService.Delete(Id).subscribe(res => {
      this.getActivate();
    })
  }


  //But
  buti: ButProjet = new ButProjet();
  butList: ButProjet[] = [];
  butListF: ButProjet[] = [];
  butList2: ButProjet[] = [];
  butList3: ButProjet[] = [];
  j = 0;
  buttest: boolean;
  buttest2: boolean = false;

  getBut() {
    this.butService.Get().subscribe(res => {
      this.butListF = res
      this.butList = this.butListF.filter(item => item.idprojet == this.eventId)

      if (this.butList.length != 0) {
        this.buttest = true;
      }
    })
  }
  addbuti() {
    this.buttest2 = true;

    this.butList3[this.j] = this.buti
    this.buti = new ButProjet();
    this.j = this.j + 1;
  }

  del2(dp, i) {
    //this.benList.splice(i, 1)
    this.butList3.splice(this.butList3.indexOf(dp), 1);
    this.j = this.j - 1
    this.buti = new ButProjet();

  }

  del22(Id) {
    this.butService.Delete(Id).subscribe(res => {
      this.getBut();
    })
  }


  //tot paymenet
  tprix: boolean = false;
  testprix(event) {

    if (event.target.value != null) {
      this.tprix = true

    }
  }

  tnb: boolean = false;
  testnb(event) {
    if (event.target.value != null) {
      this.tnb = true
    }
  }

  test(event) {
    if (this.tprix && this.tnb) {

      this.sommepay = +this.pay.nb * +this.pay.prix

    }
  }

  //Files
  docList: FilesProjet[] = [];
  docListf: FilesProjet[] = [];
  doctest: boolean = false;
  getFilesList() {
    this.filesService.Get().subscribe(res => {
      this.docListf = res
      this.docList = this.docListf.filter(item => item.idprojet == this.eventId)
      if (this.docList.length != 0) {
        this.doctest = true;
      }
    })
  }

  del66(Id) {
    this.filesService.Delete(Id).subscribe(res => {
      this.getFilesList();
    })
  }

  rapportList: RapportProjet[] = [];
  rapportListF: RapportProjet[] = [];
  rapportList3: RapportProjet[] = [];
  rapportList2: RapportProjet[] = [];
  rap: RapportProjet = new RapportProjet();
  rapporttest: boolean = false;
  rapporttest2: boolean = false;
  k: number = 0;
  getRapportList() {
    this.rapportService.Get().subscribe(res => {
      this.rapportListF = res
      this.rapportList = this.rapportListF.filter(item => item.idprojet == this.eventId)
      if (this.rapportList.length != 0) {
        this.rapporttest = true;
      }
    })
  }

  addpar() {
    this.rapporttest2 = true
    this.rapportList3[this.k] = this.rap
    console.log(this.rapportList3[this.k] )
    this.rf = new RapportProjet();
    this.k = this.k + 1



  }

  del7(dp, i) {
    this.rapportList3.splice(this.rapportList3.indexOf(dp), 1);
    this.k = this.k - 1
    this.rf = new RapportProjet();
  }

  del77(Id) {
    this.rapportService.Delete(Id).subscribe(res => {
      this.getRapportList();
    })
  }
  //Get Listening Data
  compteList: TbListening[] = [];
  PayActList: TbListening[] = [];
  PayTypeList: TbListening[] = [];
  classeList: TbListening[] = [];

  getDataTbL() {
    this.listeningService.GetClass().subscribe(res => {
      this.classeList = res
    })

    this.listeningService.GetCompte().subscribe(res => {
      this.compteList = res
    })

    this.listeningService.GetPayAct().subscribe(res => {
      this.PayActList = res
    })

    this.listeningService.GetPayType().subscribe(res => {
      this.PayTypeList = res
    })
  }

  orSuppList: OrganismeSupp[] = []
  getOrgSupp() {
    this.orgSuppService.Get().subscribe(res => {
      this.orSuppList = res;
    });
  }

  //Date Calculate
  mois: boolean = false;
  jour: boolean = false;
  datecalculate(event) {
    if (event.target.value == "يوم") {
      this.jour = true;
    } else {
      this.jour = false;
    }
    if (event.target.value == "شهر") {
      this.mois = true;
    } else {
      this.mois = false;
    }

  }
  // Submit Form
  pr: Projet = new Projet();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  prId: number;
  path: string;
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {
      this.isValidFormSubmitted = true;

      this.pr.datenereg = this.date;
      this.pr.creatorName = this.UserNameConnected;
      this.pr.idUserCreator = this.UserIdConnected;

      if (this.mois) {
        var someDate = new Date(this.pr.date);
        var newDate = new Date(someDate.setMonth(someDate.getMonth() + +this.pr.duree))
        this.pr.dateFin = newDate.toISOString().substr(0, 10);

      }

      if (this.jour) {
        var someDate = new Date(this.pr.date);
        someDate.setDate(someDate.getDate() + +this.pr.duree); //number  of days to add, e.x. 15 days
        this.pr.dateFin = someDate.toISOString().substr(0, 10);
        
      }

      this.projetService.PutObservableE(this.pr).subscribe(
        res => {

          // but Add

          if (this.buttest2) {
            for (let i = 0; i < this.butList3.length; i++) {

              this.buti = this.butList3[i]
              this.buti.idprojet = this.eventId
              this.butService.Add(this.buti).subscribe(res => {
  

              },
                err => {
                  this.toastr.error("  فشل في تسجيل   الأهداف", "فشل")
                })
            }
          }


          //Pay add
          if (this.paytest2) {

            for (let i = 0; i < this.payList3.length; i++) {
              //this.dep = new Depenses();

              this.pay = this.payList3[i]
              this.pay.idprojet = this.eventId
              this.payService.Add(this.pay).subscribe(res => {
               

              },
                err => {
                  this.toastr.error("  فشل في تسجيل   بنود الصرف", "فشل")
                })

            }



          }

          this.pj1.idprojet = this.eventId;
          this.pj1.date = this.date;
          this.pj1.type = 'دراسة المشروع'
          let path1 = this.rootUrl.getPath();
          this.fileslist1.forEach(item => {
            this.pj1.path = item;
            this.http.post(path1 + '/FilesProjets', this.pj1)
              .subscribe(res => {

                this.GetFileName();

              })
          });

          this.pj2.idprojet = this.eventId;
          this.pj2.date = this.date;
          this.pj2.type = 'الإتفاقية'
          let path2 = this.rootUrl.getPath();
          this.fileslist2.forEach(item => {
            this.pj2.path = item;
            this.http.post(path2 + '/FilesProjets', this.pj2)
              .subscribe(res => {

                this.GetFileName();

              })
          });

          this.pj3.idprojet = this.eventId;
          this.pj3.date = this.date;
          this.pj3.type = 'صورة الشيك'
          let path3 = this.rootUrl.getPath();
          this.fileslist3.forEach(item => {
            this.pj3.path = item;
            this.http.post(path3 + '/FilesProjets', this.pj3)
              .subscribe(res => {

                this.GetFileName();

              })
          });

          this.pj4.idprojet = this.eventId;
          this.pj4.date = this.date;
          this.pj4.type = 'سند القبض'
          let path4 = this.rootUrl.getPath();
          this.fileslist4.forEach(item => {
            this.pj4.path = item;
            this.http.post(path4 + '/FilesProjets', this.pj4)
              .subscribe(res => {

                this.GetFileName();

              })
          });

          this.pj5.idprojet = this.eventId;
          this.pj5.date = this.date;
          this.pj5.type = ' كشف الحساب'
          let path5 = this.rootUrl.getPath();
          this.fileslist5.forEach(item => {
            this.pj5.path = item;
            this.http.post(path5 + '/FilesProjets', this.pj5)
              .subscribe(res => {

                this.GetFileName();

              })
          });


          this.rf.idprojet = this.eventId;
          this.rf.date = this.date;
          let path6 = this.rootUrl.getPath();
          this.fileslist6.forEach(item => {
            this.rf.path = item;
            this.http.post(path6 + '/RapportProjets', this.rf)
              .subscribe(res => {
                this.GetFileName();

              })
          });

          this.i = 0;
          this.j = 0;
          this.paytest = false;
          this.payList.splice(0, this.payList.length)
          this.buttest = false;
          this.butList.splice(0, this.butList.length)
          this.toastr.success("تم التسجيل بنجاح", "نجاح")
          form.resetForm();
        },
        err => {

        }
      )
    }
  }



  //Files
  public pj1: FilesProjet = new FilesProjet();
  public pj2: FilesProjet = new FilesProjet();
  public pj3: FilesProjet = new FilesProjet();
  public pj4: FilesProjet = new FilesProjet();
  public pj5: FilesProjet = new FilesProjet();
  public pj6: FilesProjet = new FilesProjet();
  public pjs: FilesProjet[];

  public pjr: RapportProjet = new RapportProjet();
  public pjrs: RapportProjet[];

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
  file1: any;
  fileslist1: string[] = [];
  public upload1(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file1 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file1).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist1.push(this.file1.name);
      console.log(this.fileslist1)
    }
  }


  file2: any;
  fileslist2: string[] = [];
  public upload2(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file2 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file2).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist2.push(this.file2.name);
      console.log(this.fileslist2)
    }
  }


  file3: any;
  fileslist3: string[] = [];
  public upload3(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file3 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file3).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist3.push(this.file3.name);
      console.log(this.fileslist3)
    }
  }

  file4: any;
  fileslist4: string[] = [];
  public upload4(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file4 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file4).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist4.push(this.file4.name);
      console.log(this.fileslist4)
    }
  }


  file5: any;
  fileslist5: string[] = [];
  public upload5(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file5 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file5).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist5.push(this.file5.name);
      console.log(this.fileslist5)
    }
  }



  file6: any;
  fileslist6: string[] = [];
  public upload6(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file6 = event.target.files[0];
      this.uploadStatuss.emit({ status: ProgressStatusEnum.START });
      this.serviceupload.uploadFile(this.file6).subscribe(
        data => {
          if (data) {
            switch (data.type) {
              case HttpEventType.UploadProgress:
                this.uploadStatuss.emit({ status: ProgressStatusEnum.IN_PROGRESS, percentage: Math.round((data.loaded / data.total) * 100) });
                break;
              case HttpEventType.Response:
                this.inputFile.nativeElement.value = '';
                this.uploadStatuss.emit({ status: ProgressStatusEnum.COMPLETE });
                break;
            }
            this.getFiles();
            this.GetFileName();



          }

        },

        error => {
          this.inputFile.nativeElement.value = '';
          this.uploadStatuss.emit({ status: ProgressStatusEnum.ERROR });
        }
      );
      this.fileslist6.push(this.file6.name);
      console.log(this.fileslist6)
    }
  }

}
