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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-orphelin-edit',
  templateUrl: './orphelin-edit.component.html',
  styleUrls: ['./orphelin-edit.component.css']
})
export class OrphelinEditComponent implements OnInit {

  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  private routeSub: Subscription;

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
    private rootUrl: PathSharedService,
    private route: ActivatedRoute, ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.getIdUrl();
    this.getFilesList();
    this.getListingTables();
    this.getFiles();
    this.getEdu();
    this.getFn();
    this.getTalent();
    this.getMat();
    this.getPer();
    this.getMer();
    this.getPsy();
    this.getSante();
    this.getSub();
    this.getTut();
    this.getDot();
  }

  //get Orph Data


  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.orphelinService.GetById(this.Id).subscribe(res => {
        this.orph = res

      })


    });
  }

  //Get Files Data

  FilesList: FilesOrphelin[] = [];
  FilesList1: FilesOrphelin[] = [];
  FilesTest: boolean = false;
  getFilesList() {
    this.filesService.Get().subscribe(res => {
      this.FilesList1 = res
      this.FilesList = this.FilesList1.filter(item => item.idOrph == this.Id)
      if (this.FilesList.length != 0) {
        this.FilesTest = true;
      } else {
        this.FilesTest = false;
      }
    })
  }

  delFiles(Id) {
    this.filesService.Delete(Id).subscribe(res => {
      this.getFilesList();
      this.toastr.success("تم الحذف بنجاح")
    },
      err => {
        this.toastr.warning("فشل في الحذف")
      }
    )
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

      this.orphelinService.PutObservableE(this.orph).subscribe(res => {
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



  //Edu Get
  eduExist: boolean = false;
  eduOui: boolean = false;
  edu: EducationOrphelin = new EducationOrphelin();
  eduList: EducationOrphelin[] = [];
  eduList2: EducationOrphelin[] = [];
  getEdu() {
    this.educationService.Get().subscribe(res => {
      this.eduList2 = res
      this.eduList = this.eduList2.filter(item => item.idOrph == this.Id)
      if (this.eduList.length != 0) {
        this.eduExist = true;
        this.edu = this.eduList[0];

        if (this.eduList[0].education == "نعم") {
          this.eduOui = true;
        } else {
          this.eduOui = false;
        }
      } else {
        this.eduExist = false;
      }
    })
  }

  //Partie Education


  onSubmitEdu() {

    this.educationService.PutObservableE(this.edu).subscribe(res => {

      this.toastr.success("تم تسجيل البيانات الدراسية بنجاح", " تسجيل اليتيم");
    },
      err => {
        this.toastr.error("فشل تسجيل البيانات الدراسية", " تسجيل اليتيم")
      }
    )
  }

  // talent
  talList: TalenOrphelin[] = [];
  talList2: TalenOrphelin[] = [];
  talList3: TalenOrphelin[] = [];
  talTest: boolean = false;
  talTest2: boolean = false;
  tal: TalenOrphelin = new TalenOrphelin();
  getTalent() {
    this.talentService.Get().subscribe(res => {
      this.talList2 = res
      this.talList = this.talList2.filter(item => item.idOrph == this.Id)
      if (this.talList.length != 0) {
        this.talTest = true;


      } else {
        this.talTest = false;
      }
    })
  }


  i = 0;
  addTal(event) {
    this.talTest2 = true;
    this.talList3[this.i] = this.tal;
    this.tal = new TalenOrphelin();
    this.i = this.i + 1;

  }



  delTal(dp, i) {

    this.talList3.splice(this.talList3.indexOf(dp), 1);
    this.i = this.i - 1
    this.tal = new TalenOrphelin();
  }


  delTal2(Id) {
    this.talentService.Delete(Id).subscribe(res => {
      this.getTalent();
    })
  }


  submitTal() {
    for (let i = 0; i < this.talList3.length; i++) {
      this.tal = this.talList3[i];
      this.tal.idOrph = this.Id;
      this.talentService.Add(this.tal).subscribe(res => {
        this.toastr.success("تم تسجيل المهارات بنجاح", "نجاح")
      }, err => {
        this.toastr.error("  فشل في تسجيل المهارات	 ", "فشل")
      })
    }


  }
  //sante
  san: SanteOrphelin = new SanteOrphelin();
  sanList1: SanteOrphelin[] = [];
  sanList: SanteOrphelin[] = [];
  sanExist: boolean = false;
  sanOui: boolean = false;
  getSante() {
    this.santeService.Get().subscribe(res => {
      this.sanList1 = res;
      this.sanList = this.sanList1.filter(item => item.idOrph == this.Id)
      if (this.sanList.length != 0) {
        this.sanExist = true;

        this.san = this.sanList[0];

        if (this.sanList[0].malade == "نعم") {
          this.sanOui = true;
        } else {
          this.sanOui = false;
        }
      } else {
        this.sanExist = false;
      }
    })
  }

  onSubmitSante() {
    this.san.idOrph = this.Id;
    this.santeService.PutObservableE(this.san).subscribe(res => {
      this.toastr.success("تم تسجيل المعلومات الصحية بنجاح", "نجاح")
    },
      err => {

        this.toastr.error("  فشل في تسجيل المعلومات الصحية 	 ", "فشل")
      })
  }

  // Get Finance

  fnOui: boolean = false;
  pjOui: boolean = false;
  dotOui: boolean = false;
  subOui: boolean = false;

  fn: FinanceOrphelin = new FinanceOrphelin();
  fnList1: FinanceOrphelin[] = [];
  fnList: FinanceOrphelin[] = [];

  getFn() {
    this.financeOrphelinService.Get().subscribe(res => {
      this.fnList1 = res
      this.fnList = this.fnList1.filter(item => item.idOrph == this.Id)

      if (this.fnList.length != 0) {
        this.fn = this.fnList[0]
        if (this.fn.source == "نعم") {
          this.fnOui = true;
        } else {
          this.fnOui = false
        }

        if (this.fn.projetFinan == "نعم") {
          this.pjOui = true;
        } else {
          this.pjOui = false;
        }

        if (this.fn.dotation == "نعم") {
          this.dotOui = true;
        } else {
          this.dotOui = false;
        }

        if (this.fn.subvention == "نعم") {
          this.subOui = true;
        } else {
          this.subOui = false;
        }
      }
    })
  }


  testPj(event) {
    if (event.target.value == "نعم") {
      this.pjOui = true;
    } else {
      this.pjOui = false;
    }
  }

  testDot(event) {
    if (event.target.value == "نعم")
    {
      this.dotOui = true;
    } else {
      this.dotOui = false;
    }
  }



  //Subvention
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
  subList3: SubventionOrphelin[] = [];
  subTest: boolean = false;
  subTest2: boolean = false;
  g = 0;
  addSub() {
    this.subTest2 = true;
    this.subList3[this.g] = this.sub;
    this.sub = new SubventionOrphelin();
    this.g = this.g + 1;

  }

  onSubmitSub() {
    for (let i = 0; i < this.subList3.length; i++) {
      this.sub = this.subList3[i]
      this.sub.idOrph = this.Id
      this.subventionOrphelinService.Add(this.sub).subscribe(res => {
        this.toastr.success("تم تسجيل اعانات بنجاح", "نجاح")
      }, err => {
        this.toastr.error("  فشل في تسجيل اعانات 	 ", "فشل")
      })
    }
  }

  delSub(dp, i) {
    this.subList3.splice(this.subList3.indexOf(dp), 1);
    this.g = this.g - 1
    this.sub = new SubventionOrphelin();
  }

  delSub2(Id) {
    this.subventionOrphelinService.Delete(Id).subscribe(res => {
      this.getSub();
    })
  }
  getSub() {
    this.subventionOrphelinService.Get().subscribe(res => {
      this.subList2 = res
      this.subList = this.subList2.filter(item => item.idOrph == this.Id)
      if (this.subList.length != 0) {
        this.subTest = true;
      } else {
        this.subTest = false;
      }
    })
  }


  onSubmitFinance() {
    this.financeOrphelinService.PutObservableE(this.fn).subscribe(res => {
      this.toastr.success("تم تسجيل معلومات الجانب الاقتصادي  بنجاح ", "نجاح")
 
    },
      err => {
       
        this.toastr.error(" فشل في تسجيل  معلومات الجانب الاقتصادي 	 ", "فشل")
      })
  }

  //Dotation

  //Dotation

  dotTest: boolean = false;
  dotList1: DotationOrphelin[] = [];
  dotList: DotationOrphelin[] = [];
  dotList2: DotationOrphelin[] = [];
  dot: DotationOrphelin = new DotationOrphelin();

  getDot() {
    this.dotationOrphelinService.Get().subscribe(res => {
      this.dotList1 = res
      this.dotList = this.dotList1.filter(item => item.idOrph == this.Id)
      if (this.dotList.length != 0) {
        this.dotTest = true;
      } else {
        this.dotTest = false;
      }
    })
  }

  dotTest2: boolean = false;
  k = 0;
  addDot(event) {
    this.dotTest2 = true;
    this.dotList2[this.k] = this.dot;
    this.dot = new DotationOrphelin();
    this.k = this.k + 1;

  }

  addDotTest: boolean = true;
  onSubmitDot() {
    for (let i = 0; i < this.dotList2.length; i++) {
      this.dot = this.dotList2[i]
      this.dot.idOrph = this.Id
      this.dotationOrphelinService.Add(this.dot).subscribe(res => {
        this.toastr.success("تم تسجيل العقارات بنجاح", "نجاح")

      }, err => {
        this.toastr.error("  فشل في تسجيل العقارات 	 ", "فشل")

      })
    }
  }

  delDot(dp, i) {
    this.dotList2.splice(this.dotList2.indexOf(dp), 1);
    this.k = this.k - 1
    this.dot = new DotationOrphelin();
  }

  delDot2(Id) {
    this.dotationOrphelinService.Delete(Id).subscribe(res => {
      this.getDot();
    })
  }




  //Pere
  per: PereOrphelin = new PereOrphelin();
  perList: PereOrphelin[] = [];
  perList1: PereOrphelin[] = [];
  perOui: boolean = false;
  getPer() {
    this.pereOrphelinService.Get().subscribe(res => {
      this.perList1 = res
      this.perList = this.perList1.filter(item => item.idOrph == this.Id)
      if (this.perList.length != 0) {
        this.per = this.perList[0];
        if (this.per.alive == "نعم") {
          this.perOui = true;
        } else {
          this.perOui = false;
        }
      }
    })
  }

  onSubmitPere() {

    this.per.idOrph = this.Id;
    this.pereOrphelinService.PutObservableE(this.per).subscribe(res => {
      this.toastr.success("تم تسجيل بيانات والد اليتيم بنجاح", "نجاح")
    },
      err => {
        this.toastr.error("  فشل في تسجيل بيانات والد اليتيم 	 ", "فشل")
        console.log(err)
      })
  }
  //Mere

  mer: MereOrphelin = new MereOrphelin();
  merList: MereOrphelin[] = [];
  merList1: MereOrphelin[] = [];
  merOui: boolean = false;
  merNon: boolean = false;
  getMer() {
    this.mereOrphelinService.Get().subscribe(res => {
      this.merList1 = res
      this.merList = this.merList1.filter(item => item.idOrph == this.Id)
      if (this.merList.length != 0) {
        this.mer = this.merList[0];
        if (this.mer.alive == "نعم") {
          this.merOui = false;
          this.merNon = true;
        } else {
          this.merOui = true;
          this.merNon = false;
        }
      }
    })
  }

  onSubmitMere() {

    this.mer.idOrph = this.Id;
    this.mereOrphelinService.PutObservableE(this.mer).subscribe(res => {
      this.toastr.success("تم تسجيل بيانات والدة  اليتيم بنجاح", "نجاح")
    },
      err => {
        this.toastr.error("  فشل في تسجيل بيانات والدة  اليتيم 	 ", "فشل")
        console.log(err)
      })
  }

  //Tuteur

  tut: TuteurOrphelin = new TuteurOrphelin();
  tutList: TuteurOrphelin[] = [];
  tutList1: TuteurOrphelin[] = [];
  tutOui: boolean = false;
  getTut() {
    this.tuteurOrphelinSerive.Get().subscribe(res => {

      this.tutList1 = res
      this.tutList = this.tutList1.filter(item => item.idOrph == this.Id)
      if (this.tutList.length != 0) {
        this.tut = this.tutList[0];
        if (this.tut.mere == "نعم") {
          this.tutOui = true;
        } else {
          this.tutOui = false;
        }
      }
    })
  }


  onSubmitTuteur() {

    this.tut.idOrph = this.Id;
    this.tuteurOrphelinSerive.PutObservableE(this.tut).subscribe(res => {
      this.toastr.success("تم تسجيل بيانات والدة  اليتيم بنجاح", "نجاح")
    },
      err => {
        this.toastr.error("  فشل في تسجيل بيانات والدة  اليتيم 	 ", "فشل")
        console.log(err)
      })
  }





  //get psy
  psy: PsyOrphelin = new PsyOrphelin();
  psyList: PsyOrphelin[] = [];
  psyList1: PsyOrphelin[] = [];
  psyOui: boolean = false;
  psyExist: boolean = false;
  docOui: boolean = false;
  docNon: boolean = false;

  getPsy() {
    this.psyOrphelinService.Get().subscribe(res => {
      this.psyList1 = res
      this.psyList = this.psyList1.filter(item => item.idOrph == this.Id)
      if (this.psyList.length != 0) {
        this.psyExist = true;
        this.psy = this.psyList[0];
        if (this.psy.maladiePsy == "نعم") {
          this.psyOui = true
        } else {
          this.psyOui = false;
        }

        if (this.psy.docteur == "نعم") {
          this.docOui = true;
          this.docNon = false;
        } else {
          this.docOui = false;
          this.docNon = true;
        }

      } else {
        this.psyExist = false;
      }
    })
  }

  onSubmitPsy() {
    this.psy.idOrph = this.Id
    this.psyOrphelinService.PutObservableE(this.psy).subscribe(res => {

      this.toastr.success("تم تسجيل معلومات الجانب الاجتماعي و النفسي  بنجاح ", "نجاح")
    },
      err => {

        this.toastr.error(" فشل في تسجيل معلومات الجانب الاجتماعي و النفسي 	 ", "فشل")
      })
  }

  //Mat

  matList: MatieresOrphelin[] = [];
  matList2: MatieresOrphelin[] = [];
  matList3: MatieresOrphelin[] = [];
  matTest: boolean = false;
  matTest2: boolean = false;
  getMat() {
    this.matiereService.Get().subscribe(res => {
      this.matList2 = res;
      this.matList = this.matList2.filter(item => item.idOrph == this.Id)
      if (this.matList.length != 0) {
        this.matTest = true;
      } else {
        this.matTest = false;
      }
    })
  }
  mat: MatieresOrphelin = new MatieresOrphelin();
  j = 0;
  addMat(event) {
    this.matTest2 = true;
    this.matList3[this.j] = this.mat;
    this.mat = new MatieresOrphelin();
    this.j = this.j + 1;

  }


  submitMat() {
    for (let i = 0; i < this.matList3.length; i++) {
      this.mat = this.matList3[i]
      this.mat.idOrph = this.Id
      this.matiereService.Add(this.mat).subscribe(res => {
        this.toastr.success("تم تسجيل المواد بنجاح", "نجاح")
      }, err => {
        this.toastr.error("  فشل في تسجيل المواد 	 ", "فشل")
      })
    }
  }

  delMat(dp, i) {
    this.matList3.splice(this.matList3.indexOf(dp), 1);
    this.j = this.j - 1
    this.mat = new MatieresOrphelin();
  }

  delMat2(Id) {
    this.matiereService.Delete(Id).subscribe(res => {
      this.getMat();
    })
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
