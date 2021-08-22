import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-orphelin-details',
  templateUrl: './orphelin-details.component.html',
  styleUrls: ['./orphelin-details.component.css']
})
export class OrphelinDetailsComponent implements OnInit {

  private routeSub: Subscription;
  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @ViewChild('htmlData') htmlData: ElementRef;
  displayUrl;
  constructor(private route: ActivatedRoute,
    private tblListingService: TblistingOrphelinService,
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
    private rootUrl: PathSharedService,) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {

    this.getIdUrl();
    this.getListingTables();

    this.getFilesList();
    this.getEdu();
    this.getTalent();
    this.getMat();
    this.getSante();
    this.getPsy();
    this.getFn();
    this.getDot();
    this.getSub();
    this.getPer();
    this.getMer();
    this.getTut();
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


  //get Orph Data


  Id: number;
  orph: Orphelin = new Orphelin();

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.orphelinService.GetById(this.Id).subscribe(res => {
        this.orph = res

      })


    });
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


  // talent
  talList: TalenOrphelin[] = [];
  talList2: TalenOrphelin[] = [];
  talTest: boolean = false;
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
          this.fnOui =false
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
  //Dotation

  dotTest: boolean = false;
  dotList1: DotationOrphelin[] = [];
  dotList: DotationOrphelin[] = [];
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


  //Subvention

  subTest: boolean = false;
  subList: SubventionOrphelin[] = [];
  subList2: SubventionOrphelin[] = [];
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
          this.psyOui=true
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


  // Finance


  //Get Files List
  filesList: FilesOrphelin[] = [];
  filesList2: FilesOrphelin[] = [];

  getFilesList() {
    this.filesService.Get().subscribe(res => {
      this.filesList2 = res;
      this.filesList = this.filesList2.filter(item => item.idOrph == this.Id)
      console.log(this.filesList)
    })
  }

  //Mat
  matList: MatieresOrphelin[] = [];
  matList2: MatieresOrphelin[] = [];
  matTest: boolean = false;
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
