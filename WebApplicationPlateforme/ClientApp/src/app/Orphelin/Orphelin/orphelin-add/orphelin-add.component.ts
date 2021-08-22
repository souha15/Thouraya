import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { TblistingOrphelinService } from '../../../shared/Services/Orphelin/tblisting-orphelin.service';
import { OrphelinService } from '../../../shared/Services/Orphelin/orphelin.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { FilesOrphelinService } from '../../../shared/Services/Orphelin/files-orphelin.service';
import { EducationOrphelinService } from '../../../shared/Services/Orphelin/education-orphelin.service';
import { TalentOrphelinService } from '../../../shared/Services/Orphelin/talent-orphelin.service';
import { MatieresOrphelinService } from '../../../shared/Services/Orphelin/matieres-orphelin.service';
import { SanteOrphelinService } from '../../../shared/Services/Orphelin/sante-orphelin.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { NgForm } from '@angular/forms';
import { Orphelin } from '../../../shared/Models/Orphelin/orphelin.model';
import { FilesOrphelin } from '../../../shared/Models/Orphelin/files-orphelin.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { EducationOrphelin } from '../../../shared/Models/Orphelin/education-orphelin.model';
import { TalenOrphelin } from '../../../shared/Models/Orphelin/talen-orphelin.model';
import { MatieresOrphelin } from '../../../shared/Models/Orphelin/matieres-orphelin.model';
import { SanteOrphelin } from '../../../shared/Models/Orphelin/sante-orphelin.model';
import { DotationOrphelinService } from '../../../shared/Services/Orphelin/dotation-orphelin.service';
import { SubventionOrphelinService } from '../../../shared/Services/Orphelin/subvention-orphelin.service';
import { PereOrphelinService } from '../../../shared/Services/Orphelin/pere-orphelin.service';
import { MereOrphelinService } from '../../../shared/Services/Orphelin/mere-orphelin.service';
import { TuteurOrphelinService } from '../../../shared/Services/Orphelin/tuteur-orphelin.service';
import { FinanceOrphelinService } from '../../../shared/Services/Orphelin/finance-orphelin.service';
import { PsyOrphelinService } from '../../../shared/Services/Orphelin/psy-orphelin.service';
import { PsyOrphelin } from '../../../shared/Models/Orphelin/psy-orphelin.model';
import { FinanceOrphelin } from '../../../shared/Models/Orphelin/finance-orphelin.model';
import { DotationOrphelin } from '../../../shared/Models/Orphelin/dotation-orphelin.model';
import { SubventionOrphelin } from '../../../shared/Models/Orphelin/subvention-orphelin.model';
import { PereOrphelin } from '../../../shared/Models/Orphelin/pere-orphelin.model';
import { MereOrphelin } from '../../../shared/Models/Orphelin/mere-orphelin.model';
import { TuteurOrphelin } from '../../../shared/Models/Orphelin/tuteur-orphelin.model';

@Component({
  selector: 'app-orphelin-add',
  templateUrl: './orphelin-add.component.html',
  styleUrls: ['./orphelin-add.component.css']
})
export class OrphelinAddComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;

  constructor(private tblListingService: TblistingOrphelinService,
    private orphelinService: OrphelinService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private filesService: FilesOrphelinService,
    private educationService: EducationOrphelinService,
    private talentService: TalentOrphelinService,
    private matiereService: MatieresOrphelinService,
    private santeService: SanteOrphelinService,
    public serviceupload: UploadDownloadService,
    private dotationOrphelinService: DotationOrphelinService,
    private subventionOrphelinService: SubventionOrphelinService,
    private pereOrphelinService: PereOrphelinService,
    private mereOrphelinService: MereOrphelinService,
    private tuteurOrphelinSerive: TuteurOrphelinService,
    private financeOrphelinService: FinanceOrphelinService,
    private psyOrphelinService: PsyOrphelinService,
    private http: HttpClient,
    private rootUrl: PathSharedService, ) {
    this.uploadStatuss = new EventEmitter<ProgressStatus>();}

  ngOnInit(): void {
    this.getUserConnected();
    this.getListingTables();
    this.getListingTables();
    this.getFiles();
  }


  // Get Table Listing

  matiereList: TbListening[] = [];
  maladieList: TbListening[] = [];
  talentList: TbListening[] = [];
  liveswithList: TbListening[] = [];
  subventionList: TbListening[] = [];
  dotationList: TbListening[] = [];
  organismeList: TbListening[] = [];
  parenteList: TbListening[] = [];

  getListingTables() {
    this.tblListingService.GetMatieres().subscribe(res => {
      this.matiereList = res;
    })

    this.tblListingService.GetMaladies().subscribe(res => {
      this.maladieList = res;
    })

    this.tblListingService.GetTalent().subscribe(res => {
      this.talentList = res;
    })

    this.tblListingService.GetLivesWiths().subscribe(res => {
      this.liveswithList = res;
    })

    this.tblListingService.GetTypeSubventions().subscribe(res => {
      this.subventionList = res;
    })

    this.tblListingService.GetTypeDotationOrphelins().subscribe(res => {
      this.dotationList = res;
    })

    this.tblListingService.GetOrganismeOrphelins().subscribe(res => {
      this.organismeList = res;
    })

    this.tblListingService.GetParente().subscribe(res => {
      this.parenteList = res;
    })
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



  //Create Orphelin
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  orph: Orphelin = new Orphelin();
  Id: number;

  onSubmitOr(form: NgForm) {
    if (form.invalid) {

      this.isValidFormSubmitted = false;
    }
    else {

      this.isValidFormSubmitted = true;
      this.orph.dateenreg = this.date;
      this.orph.idUserCreator = this.UserIdConnected;
      this.orph.userNameCreator = this.UserNameConnected;
      this.orphelinService.Add(this.orph).subscribe(res => {
        this.Id = res.id;

        //Files
        this.pj.idOrph = this.Id;

        let path = this.rootUrl.getPath();
        this.fileslist.forEach(item => {
          this.pj.path = item;

          this.filesService.Add(this.pj)
            .subscribe(res => {
              this.serviceupload.refreshList();
              this.GetFileName();
            });
        })


        this.toastr.success("تم تسجيل اليتيم بنجاح", " تسجيل اليتيم");
      },
        err => {
          console.log(err)
          this.toastr.error("فشل تسجيل اليتيم", " تسجيل اليتيم")
        })

    }
  }


  //Partie Education



  edu: EducationOrphelin = new EducationOrphelin();
  onSubmitEdu() {

    this.edu.idOrph = this.Id
    this.educationService.Add(this.edu).subscribe(res => {

      this.toastr.success("تم تسجيل البيانات الدراسية بنجاح", " تسجيل اليتيم");
    },
      err => {
        this.toastr.error("فشل تسجيل البيانات الدراسية", " تسجيل اليتيم")
      }
    )
  }


  //Test Education

  eduOui: Boolean = false;
  eduNon: Boolean = false;
  testEdu(event) {
    if (event.target.value == "نعم") {
      this.eduOui = true;
      this.eduNon = false;
    } else {
      this.eduOui = false;
      this.eduNon = true;
    }
  }

    //Talent
  tal: TalenOrphelin = new TalenOrphelin();
  talList: TalenOrphelin[] = [];
  talList2: TalenOrphelin[] = [];
  talTest: boolean = false;
  i = 0;
  addTal(event) {
    this.talTest = true;
    this.talList[this.i] = this.tal;
    this.tal = new TalenOrphelin();
    this.i = this.i + 1;

  }



  delTal(dp, i) {

    this.talList.splice(this.talList.indexOf(dp), 1);
    this.i = this.i - 1
    this.tal = new TalenOrphelin();
  }


  submitTal() {
    for (let i = 0; i < this.talList.length; i++) {
      this.tal = this.talList[i];
      this.tal.idOrph = this.Id;
      this.talentService.Add(this.tal).subscribe(res => {
        this.toastr.success("تم تسجيل المهارات بنجاح", "نجاح")
      }, err => {
          this.toastr.error("  فشل في تسجيل المهارات	 ", "فشل")
      })
    }


  }




  //Mat Add

  mat: MatieresOrphelin = new MatieresOrphelin();
  matList: MatieresOrphelin[] = [];
  matList2: MatieresOrphelin[] = [];
  matTest: boolean = false;
  j = 0;
  addMat(event) {
    this.matTest = true;
    this.matList[this.j] = this.mat;
    this.mat = new MatieresOrphelin();
    this.j = this.j + 1;

  }


  submitMat() {
    for (let i = 0; i < this.matList.length; i++) {
      this.mat = this.matList[i]
      this.mat.idOrph = this.Id
      this.matiereService.Add(this.mat).subscribe(res => {
        this.toastr.success("تم تسجيل المواد بنجاح", "نجاح")
      }, err => {
          this.toastr.error("  فشل في تسجيل المواد 	 ", "فشل")
      })
    }
  }

  delMat(dp,i) {
    this.matList.splice(this.matList.indexOf(dp), 1);
    this.j = this.j - 1
    this.mat = new MatieresOrphelin();
  }



  //Sante

  sanOui: Boolean = false;
  testSan(event) {
    if (event.target.value == "نعم") {
      this.sanOui = true;
    } else {
      this.sanOui = false;

    }
  }


  san: SanteOrphelin = new SanteOrphelin();
 
  onSubmitSante() {
    this.san.idOrph = this.Id;
    this.santeService.Add(this.san).subscribe(res => {
      this.toastr.success("تم تسجيل المعلومات الصحية بنجاح", "نجاح")
    },
      err => {

        this.toastr.error("  فشل في تسجيل المعلومات الصحية 	 ", "فشل")
      })
  }

  //Psy

  psyOui: Boolean = false;

  testPsy(event) {

    if (event.target.value == "نعم") {
      this.psyOui = true;
    } else {
      this.psyOui = false;

    }

  }

  docOui: boolean = false;
  docNon: boolean = false;
  testdoc(event) {
    if (event.target.value == "نعم") {
      this.docOui = true;
      this.docNon = false;
    } else {
      this.docOui = false;
      this.docNon = true;
    }
  }

  psy: PsyOrphelin = new PsyOrphelin();
  onSubmitPsy() {
    this.psy.idOrph = this.Id
    this.psyOrphelinService.Add(this.psy).subscribe(res => {

      this.toastr.success("تم تسجيل معلومات الجانب الاجتماعي و النفسي  بنجاح ", "نجاح")
    },
      err => {

        this.toastr.error(" فشل في تسجيل معلومات الجانب الاجتماعي و النفسي 	 ", "فشل")
      })
  }


  //Finanace

  fn: FinanceOrphelin = new FinanceOrphelin();
  onSubmitFinance() {
    this.fn.idOrph = this.Id
    this.financeOrphelinService.Add(this.fn).subscribe(res => {
      this.toastr.success("تم تسجيل معلومات الجانب الاقتصادي  بنجاح ", "نجاح")
      this.addDotTest = true;
    },
      err => {
        this.addDotTest = false;
        this.toastr.error(" فشل في تسجيل  معلومات الجانب الاقتصادي 	 ", "فشل")
    })
  }

  fnOui: boolean = false;

  testFn(event) {
    if (event.target.value == "نعم") {
      this.fnOui = true;

    } else {
      this.fnOui = false;

    }
  }


  pjOui: boolean = false;

  testPj(event) {
    if (event.target.value == "نعم") {
      this.pjOui = true;
 
    } else {
      this.pjOui = false;

    }
  }

  dotOui: boolean = false;

  testDot(event) {
    if (event.target.value == "نعم") {
      this.dotOui = true;
    
    } else {
      this.dotOui = false;
     
    }
  }

  //Dotation

  dot: DotationOrphelin = new DotationOrphelin();
  dotList: DotationOrphelin[] = [];
  dotList2: DotationOrphelin[] = [];
  dotTest: boolean = false;
  k = 0;
  addDot(event) {
    this.dotTest = true;
    this.dotList[this.k] = this.dot;
    this.dot = new DotationOrphelin();
    this.k = this.k + 1;

  }

  addDotTest: boolean = true;
  onSubmitDot() {
    for (let i = 0; i < this.dotList.length; i++) {
      this.dot = this.dotList[i]
      this.dot.idOrph = this.Id
      this.dotationOrphelinService.Add(this.dot).subscribe(res => {
        this.toastr.success("تم تسجيل العقارات بنجاح", "نجاح")
   
      }, err => {
          this.toastr.error("  فشل في تسجيل العقارات 	 ", "فشل")
      
      })
    }
  }

  delDot(dp, i) {
    this.dotList.splice(this.dotList.indexOf(dp), 1);
    this.k = this.k - 1
    this.dot = new DotationOrphelin();
  }

  //Subvention


 subOui: boolean = false;

  testSub(event) {
    if (event.target.value == "نعم") {
      this.subOui = true;

    } else {
      this.subOui = false;

    }
  }


  sub: SubventionOrphelin = new SubventionOrphelin();
  subList: SubventionOrphelin[] = [];
  subList2: SubventionOrphelin[] = [];
  subTest: boolean = false;
  g = 0;
  addSub() {
    this.subTest = true;
    this.subList[this.g] = this.sub;
    this.sub = new SubventionOrphelin();
    this.g = this.g + 1;

  }

  onSubmitSub() {
    for (let i = 0; i < this.subList.length; i++) {
      this.sub = this.subList[i]
      this.sub.idOrph = this.Id
      this.subventionOrphelinService.Add(this.sub).subscribe(res => {
        this.toastr.success("تم تسجيل اعانات بنجاح", "نجاح")
      }, err => {
          this.toastr.error("  فشل في تسجيل اعانات 	 ", "فشل")
      })
    }
  }

  delSub(dp, i) {
    this.subList.splice(this.subList.indexOf(dp), 1);
    this.g = this.g - 1
    this.sub = new SubventionOrphelin();
  }



  // Orphelin Familly

  per: PereOrphelin = new PereOrphelin()

  onSubmitPere() {

    this.per.idOrph = this.Id;
    this.pereOrphelinService.Add(this.per).subscribe(res => {
      this.toastr.success("تم تسجيل بيانات والد اليتيم بنجاح", "نجاح")
    },
      err => {
        this.toastr.error("  فشل في تسجيل بيانات والد اليتيم 	 ", "فشل")
        console.log(err)
      })
  }


  perOui: boolean = false;

  testPer(event) {
    if (event.target.value == "نعم") {
      this.perOui = true;

    } else {
      this.perOui = false;

    }
  }


  //Mere
  mer: MereOrphelin = new MereOrphelin();
  onSubmitMere() {

    this.mer.idOrph = this.Id;
    this.mereOrphelinService.Add(this.mer).subscribe(res => {
      this.toastr.success("تم تسجيل بيانات والدة  اليتيم بنجاح", "نجاح")
    },
      err => {
        this.toastr.error("  فشل في تسجيل بيانات والدة  اليتيم 	 ", "فشل")
        console.log(err)
      })
  }


  merOui: boolean = false;
  merNon:boolean =false
  testMer(event) {
    if (event.target.value == "نعم") {
      this.merOui = false;
      this.merNon = true;
    } else {
      this.merOui = true;
      this.merNon = false;

    }
  }


  //Tuteur

  tut: TuteurOrphelin = new TuteurOrphelin();

  onSubmitTuteur() {

    this.tut.idOrph = this.Id;
    this.tuteurOrphelinSerive.Add(this.tut).subscribe(res => {
      this.toastr.success("تم تسجيل بيانات والدة  اليتيم بنجاح", "نجاح")
    },
      err => {
        this.toastr.error("  فشل في تسجيل بيانات والدة  اليتيم 	 ", "فشل")
        console.log(err)
      })
  }


  tutOui: boolean = false;
  testTut(event) {
    if (event.target.value == "نعم") {
      this.tutOui = true;

    } else {
      this.tutOui = false;


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
  public pj: FilesOrphelin = new FilesOrphelin();
  public pjs: FilesOrphelin[];
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
      console.log(this.fileslist)
    }
  }
}
