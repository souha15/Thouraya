import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { MediaService } from '../../shared/Services/Evenements/media.service';
import { OutilsEventService } from '../../shared/Services/Evenements/outils-event.service';
import { ParticipantService } from '../../shared/Services/Evenements/participant.service';
import { DepenseService } from '../../shared/Services/Evenements/depense.service';
import { EvenementService } from '../../shared/Services/Evenements/evenement.service';
import { BeneficiareEventService } from '../../shared/Services/Evenements/beneficiare-event.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { PiecesJointesEv } from '../../shared/Models/Evenements/pieces-jointes-ev.model';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Evenement } from '../../shared/Models/Evenements/evenement.model';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { Participant } from '../../shared/Models/Evenements/participant.model';
import { Depenses } from '../../shared/Models/Evenements/depenses.model';
import { Media } from '../../shared/Models/Evenements/media.model';
import { BeneficiaireEvent } from '../../shared/Models/Evenements/beneficiaire-event.model';
import { OutilsEvent } from '../../shared/Models/Evenements/outils-event.model';
import { NgForm } from '@angular/forms';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { EntrerDansIslamService } from '../../shared/Services/Evenements/entrer-dans-islam.service';
import { EntrerDansIslam } from '../../shared/Models/Evenements/entrer-dans-islam.model';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  styleUrls: ['./event-edit.component.css']
})
export class EventEditComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,
    private UserService: UserServiceService,
    private router: Router,
    private mediaService: MediaService,
    private outilService: OutilsEventService,
    private participationService: ParticipantService,
    private depenseService: DepenseService,
    private BeneficiareEventService: BeneficiareEventService,
    private eventService: EvenementService,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService,
    private tbLService: TbListeningService,
    private rootUrl: PathSharedService,
    private enterTosIslamService: EntrerDansIslamService,
    private http: HttpClient, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getIdUrl();
    this.getUserConnected();
    this.getBeneficiareList();
    this.getDataTbL();
    this.getFilesList();
    this.getMediaList();
    this.getOutilsList();
    this.getDepList();
    this.getParticipantList();
    this.getFiles();
    this.getlang();
    this.getIslam();
  }


  //get Languages
  lg: TbListening[] = [];
  getlang() {
    this.tbLService.GetLangue().subscribe(res => {
      this.lg= res
    })
  }
  //Get Event Details 
  eventId: number;
  ev: Evenement = new Evenement();


  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.eventId = params['id']

      this.eventService.GetById(this.eventId).subscribe(res => {
        this.ev = res

      })
    });
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })
  }


  //Get Islam Members

  entrer: EntrerDansIslam = new EntrerDansIslam();
  entrerlis: EntrerDansIslam[] = [];
  entrerlisf: EntrerDansIslam[] = [];
  entrerlis2: EntrerDansIslam[] = [];
  entrerlis3: EntrerDansIslam[] = [];
  entrertest: boolean = false;
  entrertest2: boolean = false;
  s = 0;
  getIslam() {
    this.enterTosIslamService.List().subscribe(res => {
      this.entrerlisf = res
      this.entrerlis = this.entrerlisf.filter(item => item.idEvent == this.eventId);
      if (this.entrerlis.length != 0) {
        this.entrertest = true;
    }
    })
  }

  entreradd() {
    this.entrertest2 = true;
    this.entrerlis3[this.s] = this.entrer
    this.entrer = new EntrerDansIslam();
    this.s = this.s + 1

  }

  del20(dp, i) {
    this.entrerlis3.splice(this.entrerlis3.indexOf(dp), 1);
    this.s = this.s - 1
    this.entrer = new EntrerDansIslam();
  }

  del2020(Id) {
    this.enterTosIslamService.Delete(Id).subscribe(res => {
      this.getIslam();
    })
  }
  //Get Media List

  media: Media = new Media();
  medialis: Media[] = [];
  medialisF: Media[] = [];
  medialis2: Media[] = [];
  medialis3: Media[] = [];
  mediatest: boolean = false;
  mediatest2: boolean = false;
  k = 0;
  getMediaList() {
    this.mediaService.GetM().subscribe(res => {
      this.medialisF = res
      this.medialis = this.medialisF.filter(item => item.idEvent == this.eventId)
      if (this.medialis.length != 0) {
        this.mediatest = true;
      }
    })

  }

  mediaadd() {
    this.mediatest2 = true;
    this.medialis3[this.k] = this.media
    this.media = new Media();
    this.k = this.k + 1

  }

  del5(dp, i) {
    this.medialis3.splice(this.medialis3.indexOf(dp), 1);
    this.k = this.k - 1
    this.media = new Media();
  }

  del55(Id) {
    this.mediaService.DeleteM(Id).subscribe(res => {
      this.getMediaList();
    })
  }

  //Get Depenses List

  dep: Depenses = new Depenses();
  deplis: Depenses[] = [];
  deplisF: Depenses[] = [];
  deplis2: Depenses[] = [];
  deplis3: Depenses[] = [];
  deptest: boolean = false;
  deptest2: boolean = false;
  j = 0;
  tot1: number = 0;
  tot2: number = 0; 
  getDepList() {
    this.depenseService.List().subscribe(res => {
      this.deplisF = res

      this.deplis = this.deplisF.filter(item => item.idEvent == this.eventId)
      if (this.deplis.length != 0) {
        this.deptest = true;
      }
      this.deplis.forEach(item => {
        this.tot1 = +item.prix * +item.nombre;
        item.attribut1 = this.tot1;
        this.tot2 = this.tot2 + this.tot1
      })
    });
  }


  depadd() {
    this.deptest2 = true;
    this.deplis3[this.j] = this.dep
    this.tot1 = +this.deplis3[this.j].prix * +this.deplis3[this.j].nombre;
    this.deplis3[this.j].attribut1 = this.tot1;
    this.tot2 = this.tot2 + this.tot1
    this.dep = new Depenses();
    this.j = this.j + 1
    console.log(this.deplis)
  }

  del4(dp: Depenses, i) {
    this.tot2 = this.tot2 - dp.attribut1;
    this.deplis3.splice(this.deplis3.indexOf(dp), 1);
    this.j = this.j - 1
    this.dep = new Depenses();

  }

  del44(Id) {
    this.depenseService.GetById(Id).subscribe(res => {
      let c: number = 0;
      c = +res.prix * +res.nombre; 
      this.tot2 = this.tot2 - c;
  
    this.depenseService.Delete(Id).subscribe(res => {
      this.getDepList();
    })
    })
  }

  //Get Outils List

  oti: OutilsEvent = new OutilsEvent();
  otiList: OutilsEvent[] = [];
  otiList3: OutilsEvent[] = [];
  otiListF: OutilsEvent[] = [];
  otiList2: OutilsEvent[] = [];
  otitest: boolean = false;
  otitest2: boolean = false;
  d = 0;
  getOutilsList() {

    this.outilService.List().subscribe(res => {
      this.otiListF = res
      this.otiList = this.otiListF.filter(item => item.idEvent == this.eventId)
      if (this.otiList.length != 0) {
        this.otitest = true;
      }
    })
  }

  addOutils() {
    this.otitest2 = true;
    this.otiList3[this.d] = this.oti;
    this.oti = new OutilsEvent();
    this.d = this.d + 1
  }


  del3(dp, i) {
    this.otiList3.splice(this.otiList3.indexOf(dp), 1);
    this.d = this.d - 1
    this.oti = new OutilsEvent();
  }

  del33(Id) {
    this.outilService.Delete(Id).subscribe(res => {
      this.getOutilsList();
    })
  }

  //Get Beneficiares List

  ben: BeneficiaireEvent = new BeneficiaireEvent();
  benList: BeneficiaireEvent[] = [];
  benListF: BeneficiaireEvent[] = [];
  benList2: BeneficiaireEvent[] = [];
  benList3: BeneficiaireEvent[] = [];
  bentest: boolean;
  bentest2: boolean;
  c = 0;
  getBeneficiareList() {
    this.BeneficiareEventService.List().subscribe(res => {
      this.benListF = res
      this.benList = this.benListF.filter(item => item.idEvent == this.eventId)
      if (this.benList.length != 0) {
        this.bentest = true;
      }
    })
  }

  addBen() {
    this.bentest2 = true;
    this.ev.beneficiaire = this.ben.categ;
    this.ev.langue = this.ben.langue;
    this.ev.nombre = this.ben.nombre;
    this.benList3[this.c] = this.ben;
    this.ben = new BeneficiaireEvent();
    this.c = this.c + 1
  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.benList3.splice(this.benList3.indexOf(dp), 1);
    this.c = this.c - 1
    this.ben = new BeneficiaireEvent();

  }

  del11(Id) {
    this.BeneficiareEventService.Delete(Id).subscribe(res => {
      this.getBeneficiareList();
    })
  }


  // Participant 
  parlis: Participant[] = [];
  parlisF: Participant[] = [];
  par: Participant = new Participant();
  parlis2: Participant[] = [];
  parlis3: Participant[] = [];
  partest: boolean = false;
  partest2: boolean = false;
  i = 0;
  getParticipantList() {
    this.participationService.List().subscribe(res => {
      this.parlisF = res
      this.parlis = this.parlisF.filter(item => item.idEvent == this.eventId)
      if (this.parlis.length != 0) {
        this.partest = true;
      }
    })
  }

  addpart() {
    this.partest2 = true
    this.parlis3[this.i] = this.par
    this.par = new Participant();
    this.i = this.i + 1

  }

  del2(dp, i) {
    this.parlis3.splice(this.parlis3.indexOf(dp), 1);
    this.i = this.i - 1
    this.par = new Participant();
  }

  del22(Id) {
    this.participationService.Delete(Id).subscribe(res => {
      this.getParticipantList();
    })
  }

  

  //get Files List
  FilesList: PiecesJointesEv[] = [];
  FilesVid: PiecesJointesEv[] = [];
  FilesVid1: PiecesJointesEv[] = [];
  FilesImg: PiecesJointesEv[] = [];
  FilesImg1: PiecesJointesEv[] = [];
  FilesVoc: PiecesJointesEv[] = [];
  FilesVoc1: PiecesJointesEv[] = [];
  pathvid: string;
  vidtest: boolean = false;
  imgtest: boolean = false;
  voctest: boolean = false;
  getFilesList() {
    this.serviceupload.SearchEv().subscribe(res => {
      this.FilesList = res
      this.FilesVid = this.FilesList.filter(item => item.idEvent == this.eventId && item.type == "vid");
      this.FilesVid.forEach(item => {
        this.pathvid = item.path
      })
      if (this.FilesVid.length != null) {
        this.vidtest = true;
      } else
        this.vidtest = false;
      
      this.FilesImg = this.FilesList.filter(item => item.idEvent == this.eventId)
      if (this.FilesImg.length != null) {
        this.imgtest = true;
      }
    })

  }

  del66(Id) {
    this.serviceupload.deletePjEv(Id).subscribe(res => {
      this.getFilesList();
    })
  }


  // Les Tables de listening

  beneficiaireList: TbListening[] = [];
  tacheEvList: TbListening[] = [];
  outilsList: TbListening[] = [];
  mediaList: TbListening[] = [];
  classList: TbListening[] = [];
  activityList: TbListening[] = [];
  depEventList: TbListening[] = [];

  getDataTbL() {
    this.tbLService.GetA().subscribe(res => {
      this.activityList = res
    });

    this.tbLService.GetB().subscribe(res => {
      this.beneficiaireList = res
    });

    this.tbLService.GetC().subscribe(res => {
      this.classList = res
    });

    this.tbLService.GetM().subscribe(res => {
      this.mediaList = res
    });

    this.tbLService.GetO().subscribe(res => {
      this.outilsList = res
    });

    this.tbLService.GetT().subscribe(res => {
      this.tacheEvList = res
    });

    this.tbLService.GetDep().subscribe(res => {
      this.depEventList = res
    })
  }

  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  ev2: Evenement = new Evenement();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      console.log(this.isValidFormSubmitted)
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {
      this.ev.dateenreg = this.date;
      this.ev.idUserCreator = this.UserIdConnected;
      this.ev.userNameCreator = this.UserNameConnected;

      this.eventService.PutObservableTr(this.ev).subscribe(
        res => {
          this.ev2 = res;

          //participant

          if (this.partest2) {
            for (let i = 0; i < this.parlis3.length; i++) {
              this.par = this.parlis3[i]

              this.par.idEvent = this.eventId;
              this.participationService.Create(this.par).subscribe(res => {

              },
                err => {
                  this.toastr.error("  فشل في تسجيل المستفيدون", "فشل")
                })
            }

          }

          //create depenses
          if (this.deptest2) {

            for (let i = 0; i < this.deplis3.length; i++) {
              //this.dep = new Depenses();
              this.dep = this.deplis3[i]
              this.dep.idEvent = this.eventId
              this.depenseService.Create(this.dep).subscribe(res => {


              },
                err => {
                  this.toastr.error("  فشل في تسجيل المصروفات", "فشل")
                })
            }


          }

          //create media


          if (this.mediatest2) {

            for (let i = 0; i < this.medialis3.length; i++) {
              //this.dep = new Depenses();
              this.media = this.medialis3[i]
              this.media.idEvent = this.eventId
              this.mediaService.AddM(this.media).subscribe(res => {

              },

                err => {
                  this.toastr.error("  فشل في تسجيل وسائل الاعلام", "فشل")
                })
            }


          }

          // Create Beneficiaire Event


          if (this.bentest2) {

            for (let i = 0; i < this.benList3.length; i++) {
              //this.dep = new Depenses();
              this.ben = this.benList3[i]
              this.ben.idEvent = this.eventId
              this.BeneficiareEventService.Create(this.ben).subscribe(res => {


              },
                err => {
                  this.toastr.error("  فشل في تسجيل  المستفيدون", "فشل")
                })
            }


          }

          // Create Outils Event

          if (this.otitest2) {

            for (let i = 0; i < this.otiList3.length; i++) {

              this.oti = this.otiList3[i]
              this.oti.idEvent = this.eventId
              this.outilService.Create(this.oti).subscribe(res => {

              },
                err => {
                  this.toastr.error("  فشل في تسجيل   الاعلام", "فشل")
                })
            }


          }

          // Create Islam 

          if (this.entrertest2) {

            for (let i = 0; i < this.entrerlis3.length; i++) {

              this.entrer = this.entrerlis3[i]
              this.entrer.idEvent = this.eventId
              this.enterTosIslamService.Create(this.entrer).subscribe(res => {

              },
                err => {
                  this.toastr.error("  فشل في تسجيل الداخلين في الإسلام", "فشل")
                })
            }


          }


          //img
          if (this.fileslist.length != null) {
            this.pj.idEvent = this.eventId;
            this.pj.date = this.date;
            this.pj.type = 'img'
            let path = this.rootUrl.getPath();
            this.fileslist.forEach(item => {
              this.pj.path = item;
              this.http.post(path + '/PiecesJointesEvents', this.pj)
                .subscribe(res => {
                  this.serviceupload.refreshListR();
                  this.GetFileName();

                })
            });
          }
          //vid

          if (this.pj1.path != null) {
            this.pj1.idEvent = this.eventId;

          this.pj1.date = this.date;
          this.pj1.type = 'vid';
          let path1 = this.rootUrl.getPath();
          this.http.post(path1 + '/PiecesJointesEvents', this.pj1)
            .subscribe(res => {

            })
          }
        
          //voc

          if (this.fileslist1.length != null) {
            this.pj2.idEvent = this.eventId;
            this.pj2.date = this.date;
            this.pj2.type = 'voc'
            let path2 = this.rootUrl.getPath();
            this.fileslist1.forEach(item => {
              this.pj2.path = item;
              this.http.post(path2 + '/PiecesJointesEvents', this.pj2)
                .subscribe(res => {
                  this.serviceupload.refreshListR();
                  this.GetFileName();

                })
            })
          }



          this.toastr.success("تم التسجيل بنجاح", "نجاح")
          form.resetForm();
          this.files1 = [];
          this.files2 = [];
          this.fileslist = [];
          this.bool = false;
          this.imgtest = false;
          this.deptest = false;
          this.partest = false;
          this.mediatest = false;
          this.otitest = false;
          this.bentest = false;
          this.entrertest = false;

          this.deptest2 = false;
          this.partest2 = false;
          this.mediatest2 = false;
          this.otitest2 = false;
          this.bentest2 = false;

          this.deplis.splice(0, this.deplis.length)
          this.otiList.splice(0, this.otiList.length)
          this.benList.splice(0, this.benList.length)
          this.medialis.splice(0, this.medialis.length)
          this.parlis.splice(0, this.parlis.length)

          this.deplis3.splice(0, this.deplis3.length)
          this.otiList3.splice(0, this.otiList3.length)
          this.benList3.splice(0, this.benList3.length)
          this.medialis3.splice(0, this.medialis3.length)
          this.parlis3.splice(0, this.parlis3.length)
          this.i = 0
          this.j = 0
          this.k = 0
          this.c = 0
          this.d = 0

        },

        err => {
          this.toastr.error("فشل في التسجيل", "فشل")
          console.log(this.ev2)
          console.log(err)
        }
      )
    }
  }

  //Download Files

  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesEv = new PiecesJointesEv();
  public pjs: PiecesJointesEv[];
  public pj1: PiecesJointesEv = new PiecesJointesEv();
  public pjs1: PiecesJointesEv[];
  public pj2: PiecesJointesEv = new PiecesJointesEv();
  public pjs2: PiecesJointesEv[];
  public files: string[];


  files1: File[] = [];
  files2: File[] = [];
  onSelect1(event) {
    //console.log(event);
    this.files1.push(...event.addedFiles);
  }

  onRemove1(event) {
    this.files1.splice(this.files1.indexOf(event), 1);
  }

  onSelect2(event) {
    //console.log(event);
    this.files2.push(...event.addedFiles);
  }

  onRemove2(event) {
    this.files2.splice(this.files2.indexOf(event), 1);
  }

  //get List of Files

  private getFiles() {
    this.serviceupload.getFiles().subscribe(
      data => {
        this.files = data

      }
    );

  }

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

  //upload 1

  url: any;
  file: any;
  fileslist: string[] = [];
  public upload1(event) {
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
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
          console.log(error)
        }
      );
      this.fileslist.push(this.file.name);
      if (this.fileslist.length != null) {
        this.bool = true;
      }

      console.log("fileslist", this.fileslist)
    }
  }
  bool: boolean = false;
  del7(dp, i) {
    this.fileslist.splice(this.fileslist.indexOf(dp), 1);
    console.log(this.fileslist)
  }


  // upload 1


  url1: any;
  file1: any;
  fileslist1: string[] = [];
  public upload2(event) {
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
          console.log(error)
        }
      );
      this.fileslist1.push(this.file1.name);

      console.log(this.fileslist1)
    }
  }

}
