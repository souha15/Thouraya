import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { LocataireService } from '../../../shared/Services/Dotations/locataire.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { LocationService } from '../../../shared/Services/Dotations/location.service';
import { DotationService } from '../../../shared/Services/Dotations/dotation.service';
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '../../../shared/Models/Dotations/location.model';
import { NgForm } from '@angular/forms';
import { ContratLocation } from '../../../shared/Models/Dotations/contrat-location.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { Locataire } from '../../../shared/Models/Dotations/locataire.model';
import { Unite } from '../../../shared/Models/Dotations/unite.model';
import { Dotation } from '../../../shared/Models/Dotations/dotation.model';


@Component({
  selector: 'app-locataire-details',
  templateUrl: './locataire-details.component.html',
  styleUrls: ['./locataire-details.component.css']
})
export class LocataireDetailsComponent implements OnInit {

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private locataireService: LocataireService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private rootUrl: PathSharedService,
    private locationService: LocationService,
    private dotationService: DotationService,
    private uniteService: UniteService,
    private toastr: ToastrService) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.LocationList();
    this.resetForm();
    this.getAllPj();
    this.DotationList();
    this.LocataireList();
    this.UniteList();
  }

  p: Number = 1;
  count: Number = 5;
  //Get DotationList

  dotationList: Dotation[] = [];

  DotationList() {
    this.dotationService.Get().subscribe(res => {
      this.dotationList = res
    })
  }

  // Get Selected Unite

  isDotationSelected: boolean = false;
  dotationid: string;
  selectInput(event) {
    this.dotationid = event.target.value;
    if (this.dotationid != null) {
      this.uniteService.Get().subscribe(res => {
        this.uniteListG = res
        if (this.uniteListG != null) {
          this.uniteList = this.uniteListG.filter(item => item.idDotation == +this.dotationid && item.etat != "مؤجرة")
        }
      })

    }
  }
  // Get Unite List

  uniteListG: Unite[] = [];
  uniteList: Unite[] = [];
  UniteList() {
    this.uniteService.Get().subscribe(res => {
      this.uniteList=res
    })
  }
  //Locataire List

  locataireList: Locataire[] = [];

  LocataireList() {
    this.locataireService.Get().subscribe(res => {
      this.Locataire = res
    })
  }

  //Test if locataire exists
  cin: string;
  Locataire: Locataire[] = [];
  locexists: boolean = false;
  locenotexit: boolean = false;
  isValidFormSubmitted1 = false;
  CinTest(event) {
    this.isValidFormSubmitted1 = false;
    this.cin = event.target.value;
    if (this.cin != null) {
      this.locataireService.Get().subscribe(res => {
        this.locataireList = res
        if (this.locataireList.length != 0) {
          this.Locataire = this.locataireList.filter(item => item.cin == this.cin);
          if (this.Locataire.length != 0) {
            console.log(this.Locataire)
            this.locexists = true;
          }

        }
      })
    }

  }

  // Location List

  list: Location[] = [];
  LocationList() {
    this.locationService.Get().subscribe(res => {
      this.list=res
    })
  }

  //Delete


  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.locationService.Delete(Id)
        .subscribe(res => {
          this.LocationList();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )

    }
  }

  //edit
  iddot: number;
  idunite: number;
  idloc: number;
  dotationname: string;
  unitename: string;
  locaname: string;
  details: Location = new Location();
  populateForm(location: Location) {
    this.locationService.formData = Object.assign({}, location)
    this.details = Object.assign({}, location);
    this.iddot = this.details.iddotation;
    this.idunite = this.details.idunite;
    this.idloc = this.details.idlocataire;

    //Get Unite name 
    this.uniteService.GetById(this.idunite).subscribe(res => {
      this.unitename = res.numRevenus;
    })

    //Get dotation name

    this.dotationService.GetById(this.iddot).subscribe(res => {
      this.dotationname = res.nom;
    })

    //Get locataire name

    this.locataireService.GetById(this.idloc).subscribe(res => {
      this.locaname = res.nom
    })

    //Get files

    this.serviceupload.SearchC().subscribe(res => {
      this.listPj = res
      this.details = Object.assign({}, location);
      this.listPjFiltred = this.listPj.filter(item => item.idlocation == this.details.id)
     
    })

  }

  editloc: Location = new Location();
  updateRecord(form: NgForm) {
    this.editloc = Object.assign(this.editloc, form.value);
    if (form.invalid) {
      this.isValidFormSubmitted1 = false;

    } else {
    this.locationService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.LocationList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )
  }
  }


  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }



  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.locationService.formData = {
      id: null,
      numcontrat: '',
      prixlocationmois: '',
      datedebutcontrat: '',
      delaicontrat: '',
      moisdelocation: '',
      locataireName: '',
      idlocataire: 0,
      idunite: 0,
      iddotation: 0,
      nomunite: '',
      nomdotation: '',
      creatorName: '',
      idUserCreator: '',
      dateenreg: '',

    }

  }

  //List Of files

  listPj: ContratLocation[] = [];
  listPjFiltred: ContratLocation[] = [];

  getAllPj() {
    this.serviceupload.SearchC().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idlocation == this.details.id)
      console.log(this.listPjFiltred)
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
