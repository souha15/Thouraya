import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '../../../shared/Models/Dotations/location.model';
import { LocationService } from '../../../shared/Services/Dotations/location.service';
import { ToastrService } from 'ngx-toastr';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { DotationService } from '../../../shared/Services/Dotations/dotation.service';
import { LocataireService } from '../../../shared/Services/Dotations/locataire.service';
import { ServiceRevenusService } from '../../../shared/Services/Dotations/service-revenus.service';
import { RevenusService } from '../../../shared/Services/Dotations/revenus.service';
import { ServicesRevenus } from '../../../shared/Models/Dotations/services-revenus.model';
import { Revenus } from '../../../shared/Models/Dotations/revenus.model';
import { NgForm } from '@angular/forms';
import { LesServicesService } from '../../../shared/Services/Dotations/les-services.service';
import { LesServices } from '../../../shared/Models/Dotations/les-services.model';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { PiecesJointesRevenus } from '../../../shared/Models/Dotations/pieces-jointes-revenus.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType, HttpClient } from '@angular/common/http';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PathSharedService } from '../../../shared/path-shared.service';
import { DepotRevenus } from '../../../shared/Models/Dotations/depot-revenus.model';
import { DepotRevenusService } from '../../../shared/Services/Dotations/depot-revenus.service';
import { Dotation } from '../../../shared/Models/Dotations/dotation.model';
import { Unite } from '../../../shared/Models/Dotations/unite.model';
import { LocataireDot } from '../../../shared/Models/Dotations/locataire-dot.model';
import { LocataireDotService } from '../../../shared/Services/Dotations/locataire-dot.service';


@Component({
  selector: 'app-enregistrer-revenus',
  templateUrl: './enregistrer-revenus.component.html',
  styleUrls: ['./enregistrer-revenus.component.css']
})
export class EnregistrerRevenusComponent implements OnInit {

  @ViewChild('htmlData') htmlData: ElementRef;
  @Input() public disabled: boolean;
  @Output() public uploadStatuss: EventEmitter<ProgressStatus>;
  @ViewChild('inputFile') inputFile: ElementRef;
  @ViewChild('inputFile1') inputFile1: ElementRef;
  @ViewChild('inputFile2') inputFile2: ElementRef;

  private routeSub: Subscription;

  constructor(private route: ActivatedRoute,
    private LocationService: LocataireDotService,
    private toastr: ToastrService,
    private UserService: UserServiceService,
    private uniteService: UniteService,
    private dotationService: DotationService,
    private locataireService: LocataireService,
    private serviceRevenusService: ServiceRevenusService,
    private revenusService: RevenusService,
    private lesServicesServices: LesServicesService,
    public serviceupload: UploadDownloadService,
    private rootUrl: PathSharedService,
    private depotService: DepotRevenusService,
    private http: HttpClient,
  ) { this.uploadStatuss = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.DotationList();
    this.UniteList();
    this.getUserConnected();
    this.getFiles();

  }

  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
    })
  }

  //get Dotations
  dotationList: Dotation[] = [];

  DotationList() {
    this.dotationService.Get().subscribe(res => {
      this.dotationList = res
    })
  }

  //get unite with selected dotation

  uniteListG: Unite[] = [];
  uniteList: Unite[] = [];

  UniteList() {
    if (this.dotationid != null) {
      this.uniteService.Get().subscribe(res => {
        this.uniteListG = res
        if (this.uniteListG.length != 0) {
          this.uniteList = this.uniteListG.filter(item => { item.idDotation == +this.dotationid })
        }
      })

    }
  }
  // Get Selected Unite

  isDotationSelected: boolean = false;
  dotationid: string;
  dotationName: string;
  selectInput(event) {
    this.dotationid = event.target.value;
    this.dotationService.GetById(+this.dotationid).subscribe(res => {
      this.dotationName = res.nom
    })
    if (this.dotationid != null) {
      this.uniteService.Get().subscribe(res => {
        this.uniteListG = res
        if (this.uniteListG != null) {
          this.uniteList = this.uniteListG.filter(item => item.idDotation == +this.dotationid)
        }
      })

    }
  }


  //get Unite
  uniteid: string;
  loc: LocataireDot[] = [];
  loc2: LocataireDot[] = [];
  locDetails: LocataireDot = new LocataireDot();
  LocationId: number;
  showtable: boolean = false;
  selectInput2(event) {
    this.uniteid = event.target.value;
    this.uniteService.GetById(+this.uniteid).subscribe(res => {
      this.revenus.numRevenusUnite = res.numRevenus
      this.revenus.idunite = +this.uniteid
      this.revenus.prixLocation = res.prix
      this.prixlocation = res.prix;
      this.LocationService.Get().subscribe(res => {
        this.loc = res
        this.loc2 = this.loc.filter(item => item.idUnite == +this.uniteid && item.idDotation == +this.dotationid)
        this.loc2.forEach(item => {
          this.locDetails = item
          this.LocationId = this.locDetails.id;
          this.locataireName = this.locDetails.nom;
          this.debutContrat = this.locDetails.datedebutcontrat;
          this.CalculRetard();
        })
      })

    })

    this.revenusService.Get().subscribe(res => {
      this.listr1 = res
      this.listr2 = this.listr1.filter(item => item.idunite == +this.uniteid)
      if (this.listr2.length != null) {
        this.showtable = true;
      }
    })
  }
  p: Number = 1;
  count: Number = 5;
  listr1: Revenus[]=[]
  listr2: Revenus[]=[]
  //Retard
  prixpaye: number;
  retardTest(event) {
    this.prixpaye = +event.target.value;
    this.tot = (+this.dette + +this.prixlocation) - +this.prixpaye
  }
  //On Submit
  revenus: Revenus = new Revenus();
  tot: number = 0;
  locataireName: string;
  prixlocation: string;
  dette: number;
  LocationRetard: LocataireDot = new LocataireDot();
  currentdate = new Date();
  currentmonth: any;
  currentyear: any;
  debutContrat: any;
  AnneedebutContrat: any
  MoisdebutContrat: any;
  revenusRetardList: Revenus[] = [];
  FiltredrevenusRetardList: Revenus[] = [];
  nbmonths: any;
  nbMoisNonPaye: number;
  neded: number = 0;
  CalculRetard() {

    this.LocationRetard = this.locDetails
    if (this.LocationRetard.date == "جديد") {
      //Get current Month and year 
      this.currentmonth = this.currentdate.getMonth() + 1;
      this.currentyear = this.currentdate.getFullYear();

      //Get Location Month and year
      this.debutContrat = this.LocationRetard.datedebutcontrat
      let newDate = new Date(this.debutContrat);
      this.MoisdebutContrat = newDate.getMonth() + 1
      this.AnneedebutContrat = newDate.getFullYear();


      var months;
      months = (this.currentyear - this.AnneedebutContrat) * 12;
      months -= this.MoisdebutContrat;
      months += this.currentmonth;
      months <= 0 ? 0 : months;
      this.nbmonths = months + 1;
      console.log(this.nbmonths)
      //Filtering
      this.revenusService.Get().subscribe(res => {

        this.revenusRetardList = res
        this.FiltredrevenusRetardList = this.revenusRetardList.filter(item => item.idunite == this.LocationRetard.idUnite && item.iddotation == this.LocationRetard.idDotation)
        if (this.FiltredrevenusRetardList.length < this.nbmonths) {
          this.nbMoisNonPaye = this.nbmonths - this.FiltredrevenusRetardList.length

          if (this.nbMoisNonPaye > 1) {
            this.nbMoisNonPaye = this.nbMoisNonPaye - 1;
            this.dette = +this.prixlocation * this.nbMoisNonPaye;
            this.revenus.restePrixTotaleLocation = this.dette.toString();
          }
          if (this.nbMoisNonPaye == 1) {
            this.dette = 0
          }
          this.neded = +this.prixlocation + this.dette
        }


      }
      )
    } else {
      //Get current Month and year
      this.dette = +this.LocationRetard.attribut5;
      this.currentmonth = this.currentdate.getMonth() + 1;
      this.currentyear = this.currentdate.getFullYear();

      //Get Location Month and year
      this.debutContrat = this.LocationRetard.attribut1
      let newDate = new Date(this.debutContrat);
      this.MoisdebutContrat = newDate.getMonth() + 1
      this.AnneedebutContrat = newDate.getFullYear();


      var months;
      months = (this.currentyear - this.AnneedebutContrat) * 12;
      months -= this.MoisdebutContrat;
      months += this.currentmonth;
      months <= 0 ? 0 : months;
      this.nbmonths = months + 1;
      console.log(this.nbmonths)
      //Filtering
      this.revenusService.Get().subscribe(res => {

        this.revenusRetardList = res
        this.FiltredrevenusRetardList = this.revenusRetardList.filter(item => item.idunite == this.LocationRetard.idUnite && item.iddotation == this.LocationRetard.idDotation)
        if (this.FiltredrevenusRetardList.length < this.nbmonths) {
          this.nbMoisNonPaye = this.nbmonths - this.FiltredrevenusRetardList.length

          if (this.nbMoisNonPaye > 1) {
            this.nbMoisNonPaye = this.nbMoisNonPaye - 1;
            this.dette = this.dette + +this.prixlocation * this.nbMoisNonPaye;
            this.revenus.restePrixTotaleLocation = this.dette.toString();
          }
          if (this.nbMoisNonPaye == 1) {
            this.dette = this.dette
          }
          this.neded = +this.prixlocation + this.dette
        }


      }
      )
    }


  }


  Createdrevenus: Revenus = new Revenus();
  reste: number;
  prixser: number;
  isValidFormSubmitted = false;
  date = new Date().toLocaleDateString();
  revenusId: number;
  onSubmit(form: NgForm) {

    let path = this.rootUrl.getPath();
    this.fileslist.forEach(item => {
      this.revenus.attribut3 = item;
    
    })

    this.revenus.creatorName = this.UserNameConnected;
    this.revenus.idUserCreator = this.UserIdConnected;
    this.revenus.dateenreg = this.date;
    this.revenus.iddotation = +this.dotationid
    this.revenus.idLocDot = +this.locDetails.id
    this.revenus.idunite = +this.uniteid;
    this.revenus.nomDotation = this.dotationName;
    this.revenus.nomLocataire = this.locataireName;
    this.revenus.prixLocation = this.prixlocation;
    this.reste = +this.prixlocation - this.prixpaye;
    let calc: number;
    calc = +this.dette - +this.prixlocation;
    this.dette = calc
    this.revenus.restePrixTotaleLocation = this.dette.toString();

    if (form.invalid) {
      this.isValidFormSubmitted = false;

    } else {
      this.isValidFormSubmitted = true
      this.revenusService.Add(this.revenus).subscribe(res => {
        
        this.revenusId = res.id
        if (this.dette < 0) {
          this.dette = 0
        }else
        this.dette = calc

        this.toastr.success("تمت الإضافة بنجاح", "نجاح");
        this.listr2.push(this.revenus)

        //Eau
        //upload1



        //upload 3




        form.resetForm();

      },
        err => {
          console.log(err);
          this.toastr.warning('لم تتم الإضافة', ' فشل');
        }
      )


    }
  }


  resetingdata() {
    this.tot = 0;
    this.neded = 0;
    this.dette = 0;
    this.prixlocation = "0";
    this.locataireName = "";
  }
  //Files


  public response: { 'dbpathsasstring': '' };
  public isCreate: boolean;
  public pj: PiecesJointesRevenus = new PiecesJointesRevenus();
  public pjs: PiecesJointesRevenus[];
  public pj1: PiecesJointesRevenus = new PiecesJointesRevenus();
  public pjs1: PiecesJointesRevenus[];
  public pj2: PiecesJointesRevenus = new PiecesJointesRevenus();
  public pjs2: PiecesJointesRevenus[];
  public files: string[];

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
  uplo: boolean = false;
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
      this.fileslist.push(this.file.name);
      console.log(this.fileslist)
    }
  }

  //DeleteFile


  onDelete(dp, i) {
    this.fileslist.splice(this.fileslist.indexOf(dp), 1);
  }
}
