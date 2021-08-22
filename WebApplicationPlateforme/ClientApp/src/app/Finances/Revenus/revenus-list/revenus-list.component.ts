import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { LocationService } from '../../../shared/Services/Dotations/location.service';
import { ToastrService } from 'ngx-toastr';
import { LocataireService } from '../../../shared/Services/Dotations/locataire.service';
import { RevenusService } from '../../../shared/Services/Dotations/revenus.service';
import { Revenus } from '../../../shared/Models/Dotations/revenus.model';
import { NgForm } from '@angular/forms';
import { LesServicesService } from '../../../shared/Services/Dotations/les-services.service';
import { LesServices } from '../../../shared/Models/Dotations/les-services.model';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { PiecesJointesRevenus } from '../../../shared/Models/Dotations/pieces-jointes-revenus.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../../shared/path-shared.service';
import { DepotRevenusService } from '../../../shared/Services/Dotations/depot-revenus.service';
import { DepotRevenus } from '../../../shared/Models/Dotations/depot-revenus.model';
import { Locataire } from '../../../shared/Models/Dotations/locataire.model';
import { subscribeOn } from 'rxjs/operators';
import { Location } from '../../../shared/Models/Dotations/location.model';
import { LocataireDotService } from '../../../shared/Services/Dotations/locataire-dot.service';
import { LocataireDot } from '../../../shared/Models/Dotations/locataire-dot.model';
import { UniteService } from '../../../shared/Services/Dotations/unite.service';
import { Unite } from '../../../shared/Models/Dotations/unite.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';

@Component({
  selector: 'app-revenus-list',
  templateUrl: './revenus-list.component.html',
  styleUrls: ['./revenus-list.component.css']
})
export class RevenusListComponent implements OnInit {

  @Input() public disabled: boolean;
  @Input() public fileName: string;
  @Output() public downloadStatus: EventEmitter<ProgressStatus>;

  constructor(private LocationService: LocationService,
    private locService: LocataireDotService,
    private toastr: ToastrService,
    private locataireService: LocataireService,
    private revenusService: RevenusService,
    private lesServicesServices: LesServicesService,
    public serviceupload: UploadDownloadService,
    private depotService: DepotRevenusService,
    private uniteService: UniteService,
    private UserService: UserServiceService,
    private rootUrl: PathSharedService,
    private http: HttpClient, ) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    this.RevenusList();
    this.getloc();
    this.getAllPj();
    this.getUserConnected();
    this.resetForm();
    this.depotRevenusList();
  this.locataireService.Get().subscribe(res => {
      res.forEach(x => {

        this.loc.set(x.id, x)

      })
  })

    this.LocationService.Get().subscribe(res => {
      res.forEach(t => {

        this.locat.set(t.id, t)

      })
    })
  }
  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;
  adminisgtrationName: any;
  roleslist: any = [];
  testrole: boolean = false;
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR" || item == "SECRETAIRE") {
            this.testrole = true;
          } else {
            this.testrole = false;
          }
        })
      })
    })

  }
  loc1: LocataireDot[] = [];
  loc2: LocataireDot[] = [];
  getloc() {
    this.locService.Get().subscribe(res => {
      this.loc1=res
    })
  }
  p: Number = 1;
  count: Number = 5;
 
  // Depot Revenus List
  depot: DepotRevenus[] = [];
  depotRevenusList() {
    this.depotService.Get().subscribe(res => {
      this.depot = res
      
    })
  }


  
  //map

  getkeymapdate(key): string {
    return this.locat.get(key).datedebutcontrat



  }
  getkeymapnom(key): string {
    return this.loc.get(key).nom

  }

  getkeymaptel(key): string {
    return this.loc.get(key).tel

  }

  getkeymapcin(key): string {
    return this.loc.get(key).cin

  }

  getkeymapnat(key): string {
    return this.loc.get(key).nationnalite

  }
  getkeymapfrof(key): string {
    return this.loc.get(key).profession

  }
  getKeymapnom(Id?): string {
    try {
      return this.getkeymapnom(this.loc.get(Id).id);

    } catch (error) {
      return ""
    }


  }

  getKeymapDate(Id?): string {
    try {
      return this.getkeymapdate(this.locat.get(Id).id);

    } catch (error) {
      return ""
    }

  }


  getKeymapTel(Id?): string {
    try {
      return this.getkeymaptel(this.loc.get(Id).id);

    } catch (error) {
      return ""
    }

  }


  getKeymapcin(Id?): string {
    try {
      return this.getkeymapcin(this.loc.get(Id).id);

    } catch (error) {
      return ""
    }

  }


  getKeymapprof(Id?): string {
    try {
      return this.getkeymapfrof(this.loc.get(Id).id);

    } catch (error) {
      return ""
    }

  }

  getKeymapnat(Id?): string {
    try {
      return this.getkeymapnat(this.loc.get(Id).id);

    } catch (error) {
      return ""
    }

  }
  //list Revenus

  list: Revenus[] = [];
  nat: string;
  prof: string;
  cin: string;
  tel: string;
  nom: string;

  loc = new Map<number, Locataire>();
  locat = new Map<number, Location>();

//  loc: Locataire = new Locataire();
  RevenusList() {
    this.revenusService.Get().subscribe(res => {
      this.list = res
     /* this.list.forEach(item => {
        this.loc = new Locataire();
        this.locataireService.GetById(item.idLocataire).subscribe(res => {
          this.loc = res
          console.log(this.loc)
        })
      }
        )*/
    })
  }

  //on Delete
  uniteId: number;
  unite: Unite = new Unite();
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.locService.GetById(Id).subscribe(res => {
        this.uniteId = res.idUnite
        this.uniteService.GetById(this.uniteId).subscribe(res => {
          this.unite = res
          this.unite.etat = "غير مؤجرة"
         this.getloc()
        this.uniteService.PutObservable(this.unite).subscribe(res => {
      this.locService.Delete(Id)
        .subscribe(res => {
          this.getloc();
          this.toastr.success("تم الحذف  بنجاح", "نجاح");
        },

          err => {
            console.log(err);
            this.toastr.warning('لم يتم الحذف  ', ' فشل');

          }
        )
        })
        })
      })
        }

  }

  listS: LesServices[] = [];
  filtredlistS: LesServices[] = [];
  listPj: PiecesJointesRevenus[] = [];
  listPjFiltred: PiecesJointesRevenus[] = [];
  listPjFiltredS: PiecesJointesRevenus[] = [];
  listPjFiltredK: PiecesJointesRevenus[] = [];
  listPjFiltredI: PiecesJointesRevenus[] = [];
  details: Revenus = new Revenus();
  mois: string;
  populateForm(locataire: Revenus) {
    this.revenusService.formData = Object.assign({}, locataire)
    this.details = Object.assign({}, locataire);

    if (this.details.mois == '1') {
      this.mois ="يناير"
    } else if (this.details.mois == '2') {
      this.mois = "فبرياير"
    }
    else if (this.details.mois == '3') {
      this.mois = "مارس"
    }
    else if (this.details.mois == '4') {
      this.mois = "أبريل"
    }
    else if (this.details.mois == '5') {
      this.mois = "مايو"
    }
    else if (this.details.mois == '6') {
      this.mois = "يونيو"
    }
    else if (this.details.mois == '7') {
      this.mois = "يوليو"

    } else if (this.details.mois == '8') {
      this.mois = "أغسطس"
    } else if (this.details.mois == '9') {
      this.mois = "سبتمبر"
    } else if (this.details.mois == '10') {
      this.mois = "أكتوبر"
    } else if (this.details.mois == '11') {
      this.mois = "نوفمبر"
    } else {
      this.mois = "ديسمبر"
    }

    this.serviceupload.SearchR().subscribe(res => {
      this.listPj = res
      this.details = Object.assign({}, locataire);
      this.listPjFiltred = this.listPj.filter(item => item.idrevenus == this.details.id)
      this.listPjFiltredI = this.listPjFiltred.filter(item => item.type == 'الايداع')
      this.listPjFiltredS = this.listPjFiltred.filter(item => item.type == 'كشف السداد')
      this.listPjFiltredK = this.listPjFiltred.filter(item => item.type == 'الكشف')

    })

    this.lesServicesServices.Get().subscribe(res => {
      this.listS = res

      this.filtredlistS = this.listS.filter(item => item.idRevenus == this.details.id)
 
    })

  }

  //updateRecord


  editloc: Revenus = new Revenus();
  updateRecord(form: NgForm) {
    this.editloc = Object.assign(this.editloc, form.value);

    this.revenusService.Edit().subscribe(res => {
      this.toastr.success('تم التحديث بنجاح', 'نجاح')
      this.RevenusList();
    },
      err => {
        this.toastr.error('لم يتم التحديث  ', ' فشل');
      }


    )
  }

  onSubmit(form: NgForm) {
    this.updateRecord(form)
  }

  resetForm(form?: NgForm) {

    if (form != null)
      form.resetForm();
    this.revenusService.formData = {
      id: null,
      idlocation: 0,
      idunite: 0,
      numRevenusUnite: '',
      iddotation: 0,
      nomDotation: '',
      idLocataire: 0,
      nomLocataire: '',
      prixLocation: '',
      prixTot: '',
      mois: '',
      infoDepot: '',
      dateTemps: '',
      deposant: '',
      prixTotale: '',
      restePrixTotale: '',
      prixServices: '',
      restePrixService: '',
      prixTotaleLocation: '',
      restePrixTotaleLocation: '',
      attribut1: 0,
      attribut2: '',
      attribut3: '',
      attribue4: '',
      creatorName: '',
      dateenreg: '',
      idUserCreator: '',
      idLocDot: 0
    }

  }


  //Files

  getAllPj() {
    this.serviceupload.SearchR().subscribe(res => {
      this.listPj = res
      this.listPjFiltred = this.listPj.filter(item => item.idrevenus == this.details.id)
    
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
