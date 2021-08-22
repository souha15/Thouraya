import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { UsersListComponent } from '../../User/users-list/users-list.component';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../shared/path-shared.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { EvenementService } from '../../shared/Services/Evenements/evenement.service';
import { Evenement } from '../../shared/Models/Evenements/evenement.model';
import { NgForm } from '@angular/forms';
import { Participant } from '../../shared/Models/Evenements/participant.model';
import { DepenseService } from '../../shared/Services/Evenements/depense.service';
import { Depenses } from '../../shared/Models/Evenements/depenses.model';
import { ParticipantService } from '../../shared/Services/Evenements/participant.service';
import { ToastrService } from 'ngx-toastr';
import { PiecesJointesEv } from '../../shared/Models/Evenements/pieces-jointes-ev.model';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { Media } from '../../shared/Models/Evenements/media.model';
import { MediaService } from '../../shared/Services/Evenements/media.service';
import { BeneficiareEventService } from '../../shared/Services/Evenements/beneficiare-event.service';
import { BeneficiaireEvent } from '../../shared/Models/Evenements/beneficiaire-event.model';
import { OutilsEvent } from '../../shared/Models/Evenements/outils-event.model';
import { OutilsEventService } from '../../shared/Services/Evenements/outils-event.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { EntrerDansIslamService } from '../../shared/Services/Evenements/entrer-dans-islam.service';
import { EntrerDansIslam } from '../../shared/Models/Evenements/entrer-dans-islam.model';
@Component({
  selector: 'app-event-register',
  templateUrl: './event-register.component.html',
  styleUrls: ['./event-register.component.css']
})
export class EventRegisterComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('htmlData') htmlData: ElementRef;
  constructor(private tbLService: TbListeningService,
    private UserService: UserServiceService,
    private eventService: EvenementService,
    public serviceupload: UploadDownloadService,
    public depenseService: DepenseService,
    public participantService: ParticipantService,
    private toastr: ToastrService,
    private http: HttpClient,
    private mediaService: MediaService,
    private BeneficiareEventService: BeneficiareEventService,
    private outilService: OutilsEventService,
    private enterTosIslamService: EntrerDansIslamService,
    private rootUrl: PathSharedService) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getDataTbL();
    this.getUserConnected();
    this.participantList();
    this.depensesList();
    this.getFiles();
    this.getlang();
  }

  lg: TbListening[] = [];
  getlang() {
    this.tbLService.GetLangue().subscribe(res => {
      this.lg = res
    })
  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

      console.log(this.adminisgtrationName)

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
      this.beneficiaireList =res
    });

    this.tbLService.GetC().subscribe(res => {
      this.classList = res
    });

    this.tbLService.GetM().subscribe(res => {
      this.mediaList = res
    });

    this.tbLService.GetO().subscribe(res => {
      this.outilsList =res
    });

    this.tbLService.GetT().subscribe(res => {
      this.tacheEvList =res
    });

    this.tbLService.GetDep().subscribe(res => {
      this.depEventList = res
    })

 
 }

  
  parttList: Participant[] = [];
  participantList() {
    this.participantService.List().subscribe(res => {
      this.parttList = res
    })
  }

  depensesLis: Depenses[] = [];
  depensesList() {
    this.depenseService.List().subscribe(res => {
      this.depensesLis = res
    })
  }

/****/

  entrer: EntrerDansIslam = new EntrerDansIslam();
  entrerlis: EntrerDansIslam[] = [];
  entrerlis2: EntrerDansIslam[] = [];
  entrertest: boolean = false;
  s = 0;
  addenter() {
    this.entrertest = true
    this.entrerlis[this.s] = this.entrer
    this.entrer = new EntrerDansIslam();
    this.s = this.s + 1

  }


  del20(dp, i) {
    this.entrerlis.splice(this.entrerlis.indexOf(dp), 1);
    this.s = this.s - 1
    this.entrer = new EntrerDansIslam();
  }

  /***/
  par: Participant = new Participant();
  parlis: Participant[] = [];
  parlis2: Participant[] = [];
  partest: boolean = false;
  i = 0;
  addpart() {   
    this.partest = true
    this.parlis[this.i] = this.par
    this.par = new Participant();
    this.i = this.i + 1
    
  }


  del2(dp, i) {
    this.parlis.splice(this.parlis.indexOf(dp), 1);
    this.i = this.i - 1
    this.par = new Participant();
  }


  dep: Depenses = new Depenses();
  deplis: Depenses[] = [];
  deplis2: Depenses[] = [];
  deptest: boolean = false;
  j = 0;
  tot1: number=1;
  tot2: number=0;
  depadd() {
    this.deptest = true;
    this.deplis[this.j] = this.dep
    this.tot1 = +this.deplis[this.j].prix * +this.deplis[this.j].nombre;
    this.deplis[this.j].attribut1 = this.tot1;
    this.tot2 = this.tot2 + this.tot1
    this.dep = new Depenses();
    this.j = this.j + 1
    console.log(this.deplis)
  }

  del4(dp: Depenses, i) {
    console.log(dp.nombre)
    this.tot2 = this.tot2 - dp.attribut1;
    this.deplis.splice(this.deplis.indexOf(dp), 1);
    this.j = this.j - 1
    this.dep = new Depenses();
  }

  media: Media = new Media();
  medialis: Media[] = [];
  medialis2: Media[] = [];
  mediatest: boolean = false;
  k = 0;
  mediaadd() {
    this.mediatest = true;
    this.medialis[this.k] = this.media
    this.media = new Media();
    this.k = this.k + 1
    console.log(this.medialis)
  }

  del5(dp, i) {
    this.medialis.splice(this.medialis.indexOf(dp), 1);
    this.k = this.k - 1
    this.media = new Media();
  }

  ben: BeneficiaireEvent = new BeneficiaireEvent();
  benList: BeneficiaireEvent[] = [];
  benList2: BeneficiaireEvent[] = [];
  bentest: boolean;
  c = 0; 
  addBen() {
    this.bentest = true;
   this.ev.beneficiaire = this.ben.categ;
    this.ev.langue = this.ben.langue;
    this.ev.nombre = this.ben.nombre;
    this.benList[this.c] = this.ben;
    this.ben = new BeneficiaireEvent();
    this.c= this.c+1
  }

  del1(dp, i) {
    //this.benList.splice(i, 1)
    this.benList.splice(this.benList.indexOf(dp), 1);
    this.c = this.c - 1
    this.ben = new BeneficiaireEvent();
  
  }


  oti: OutilsEvent = new OutilsEvent();
  otiList: OutilsEvent[] = [];
  otiList2: OutilsEvent[] = [];
  otitest: boolean = false;
  d =0;
  addOutils() {
    this.otitest = true;
    this.otiList[this.d] = this.oti;
    this.oti = new OutilsEvent();
    this.d = this.d + 1 
  }


  del3(dp, i) {
    this.otiList.splice(this.otiList.indexOf(dp), 1);
    this.d = this.d - 1 
    this.oti = new OutilsEvent();
  }


  ev: Evenement = new Evenement();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  ev2: Evenement = new Evenement();
 
  eventId: number;
  onSubmit(form: NgForm) {
    
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      console.log(this.isValidFormSubmitted)
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")
      
    } else {
      this.isValidFormSubmitted = true;
      this.ev.dateenreg = this.date;
      this.ev.userNameCreator = this.UserNameConnected;
      this.ev.idUserCreator = this.UserIdConnected;

      this.eventService.Create(this.ev).subscribe(
        res => {
          this.eventId = res.id;
          this.ev2 = res;

          // create participant
          if (this.partest) {
            for (let i = 0; i < this.parlis.length; i++) {
              this.par = this.parlis[i]
             
              this.par.idEvent = this.eventId;
              this.participantService.Create(this.par).subscribe(res => {
                this.parlis2[i] = res
              },
                err => {
                  this.toastr.error("  فشل في تسجيل المستفيدون", "فشل")
                })
            }

          }

          //create depenses
          if (this.deptest) {

            for (let i = 0; i < this.deplis.length; i++) {
              //this.dep = new Depenses();
              this.dep = this.deplis[i]
              console.log(this.dep)
              this.dep.idEvent = this.eventId
              this.depenseService.Create(this.dep).subscribe(res => {
                this.deplis2[i] = res
                let a = +this.deplis2[i].prix * +this.deplis2[i].nombre
                this.somme = this.somme + +a
                console.log(this.somme)
              },
                err => {
                  this.toastr.error("  فشل في تسجيل المصروفات", "فشل")
                })
            }


          }

          //create media


          if (this.mediatest) {

            for (let i = 0; i < this.medialis.length; i++) {
              //this.dep = new Depenses();
              this.media = this.medialis[i]
              console.log(this.media)
              this.media.idEvent = this.eventId
              this.mediaService.AddM(this.media).subscribe(res => {
                this.medialis2[i] = res
              },
              
                err => {
                  this.toastr.error("  فشل في تسجيل وسائل الاعلام", "فشل")
                })
            }


          }


          // Create Beneficiaire Event


          if (this.bentest) {

            for (let i = 0; i < this.benList.length; i++) {
              //this.dep = new Depenses();
              this.ben = this.benList[i]
              this.ben.idEvent = this.eventId
              this.BeneficiareEventService.Create(this.ben).subscribe(res => {
                this.benList2[i] = res
             
              },
                err => {
                  this.toastr.error("  فشل في تسجيل  المستفيدون", "فشل")
                })
            }


          }
          // Create Outils Event

          if (this.otitest) {

            for (let i = 0; i < this.otiList.length; i++) {
              //this.dep = new Depenses();
              this.oti = this.otiList[i]
              this.oti.idEvent = this.eventId
              this.outilService.Create(this.oti).subscribe(res => {
                this.otiList2[i] = res
              },
                err => {
                  this.toastr.error("  فشل في تسجيل   الاعلام", "فشل")
                })
            }


          }

          if (this.entrertest) {

            for (let i = 0; i < this.entrerlis.length; i++) {
              //this.dep = new Depenses();
              this.entrer = this.entrerlis[i]
              this.entrer.idEvent = this.eventId
              this.enterTosIslamService.Create(this.entrer).subscribe(res => {
                this.entrerlis2[i] = res
              },
                err => {
                  this.toastr.error("  فشل في تسجيل    الداخلين في الإسلام", "فشل")
                })
            }


          }

          //img

          this.pj.idEvent = this.eventId;
          this.pj.date = this.date;
          let path = this.rootUrl.getPath();
          this.fileslist.forEach(item => {
            this.pj.path = item;
            this.http.post(path + '/PiecesJointesEvents', this.pj)
              .subscribe(res => {
  
              })
          });
       
          //vid
          if (this.pj1.path != null) {
            this.pj1.idEvent = this.eventId;;

            this.pj1.date = this.date;
            this.pj1.type = 'vid';
            let path1 = this.rootUrl.getPath();
            this.http.post(path1 + '/PiecesJointesEvents', this.pj1)
              .subscribe(res => {

              })
          }
          //voc


         /* this.pj2.idEvent = this.eventId;
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
          })*/
         

          this.toastr.success("تم التسجيل بنجاح", "نجاح")
          form.resetForm();
          this.files1 = [];
          this.files2 = [];
          this.deptest = false;
          this.partest = false;
          this.mediatest = false;
          this.otitest = false;
          this.bentest = false;
     
         /* this.deplis = [];
          this.outilsList = [];
          this.beneficiaireList = [];
          this.parlis = [];
          this.medialis = [];*/
          this.deplis.splice(0, this.deplis.length)
          this.otiList.splice(0, this.otiList.length)
          this.benList.splice(0, this.benList.length)
          this.medialis.splice(0, this.medialis.length)
          this.parlis.splice(0, this.parlis.length)
          this.i=0
          this.j=0
          this.k=0
          this.c=0
          this.d=0
   
      },
        err => {
          this.toastr.error("فشل في التسجيل", "فشل")
          console.log(err)
        }
      )
    }
  }

  somme: number = 0;
  //Files


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
        this.bool = true;}
 
      console.log("fileslist",this.fileslist)
    }
  }
  del7(dp, i) {
    this.fileslist.splice(this.fileslist.indexOf(dp), 1);
    console.log(this.fileslist)
  }


  // upload 1


  url1: any;
  file1: any;
  fileslist1: string[] = [];
  bool1: boolean = false;
  bool: boolean = false;
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
      if (this.fileslist1.length != null) {
        this.bool1 = true
      }

      console.log(this.fileslist1)
    }
  }

  del8(dp, i) {
    this.fileslist1.splice(this.fileslist.indexOf(dp), 1);
  }

  //impression tr
  path: string;
  public PDFEv() {
    var data = document.getElementById('htmlData');
    data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Events" + this.ev2.id + ".pdf"
      pdf.save(this.path); // Generated PDF

    });

  }

}
