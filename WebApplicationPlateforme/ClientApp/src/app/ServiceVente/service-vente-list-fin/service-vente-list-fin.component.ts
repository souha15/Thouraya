import { Component, OnInit, Input, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ServiceVenteervice } from '../../shared/Services/ServiceVente/service-vente.service';
import { TypeTypeServiceVenteservice } from '../../shared/Services/ServiceVente/type-service-vente.service';
import { OffreVenteService } from '../../shared/Services/ServiceVente/offre-vente.service';
import { ToastrService } from 'ngx-toastr';
import { ProgressStatus } from '../../shared/Interfaces/progress-status';
import { PathSharedService } from '../../shared/path-shared.service';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UploadDownloadService } from '../../shared/Services/Taches/upload-download.service';
import { ServiceVente } from '../../shared/Models/ServiceVente/service-vente.model';
import { NgForm } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';
import { ProgressStatusEnum } from '../../shared/Enum/progress-status-enum.enum';
import { OffreVente } from '../../shared/Models/ServiceVente/offre-vente.model';
import { TbListening } from '../../shared/Models/Evenements/tb-listening.model';
import { DemPayChequeService } from '../../shared/Services/Cheques/dem-pay-cheque.service';
import { DemPayCheque } from '../../shared/Models/Cheques/dem-pay-cheque.model';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { ListeningProjetService } from '../../shared/Services/Projets/listening-projet.service';
import { AdministrationService } from '../../shared/Services/Administration/administration.service';
import { NotifService } from '../../shared/Services/NotifSystem/notif.service';
import { Administration } from '../../shared/Models/Administration/administration.model';
import { EtatListCompte } from '../../shared/Models/Comptes/etat-list-compte.model';
import { ArticlePayChequeService } from '../../shared/Services/Cheques/article-pay-cheque.service';
import { ArticlePayCheque } from '../../shared/Models/Cheques/article-pay-cheque.model';
import { Notif } from '../../shared/Models/NotifSystem/notif.model';
@Component({
  selector: 'app-service-vente-list-fin',
  templateUrl: './service-vente-list-fin.component.html',
  styleUrls: ['./service-vente-list-fin.component.css']
})
export class ServiceVenteListFinComponent implements OnInit {

  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Input() public fileName: string;
  constructor(private demService: ServiceVenteervice,
    private typeService: TypeTypeServiceVenteservice,
    private offreService: OffreVenteService,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private demandeService: DemPayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private adminService: AdministrationService,
    private notifService: NotifService,
    private articleService: ArticlePayChequeService,
  ) {
    this.downloadStatus = new EventEmitter<ProgressStatus>();
  }

  ngOnInit(): void {
    this.getList();
    this.getUserConnected();
    this.getTypeService();
    this.getAdminList();
    this.getClasses();
    this.getComptes();
    this.getthelastId()
  }
  p: Number = 1;
  count: Number = 5;

  demList1: ServiceVente[] = [];
  demList: ServiceVente[] = [];
  getList() {
    this.demService.Get().subscribe(res => {
      this.demList = res
    })
  }

  populateForm(dem: ServiceVente) {
    this.demService.formData = Object.assign({}, dem)
    this.dem = Object.assign({}, dem);
    this.offreService.Get().subscribe(res => {
      this.lf = res
      this.lf1 = this.lf.filter(item => item.type == "التسعيرة الأولى" && item.idVente == this.dem.id)
      this.lf2 = this.lf.filter(item => item.type == "التسعيرة الثانية" && item.idVente == this.dem.id)
      this.lf3 = this.lf.filter(item => item.type == "التسعيرة الثالثة" && item.idVente == this.dem.id)
    })

  }

  //Get Type Data

  typeList: TbListening[] = [];
  getTypeService() {
    this.typeService.Get().subscribe(res => {
      this.typeList = res;
    });
  }
  // Get User Connected

  adminId: number;
  admin: string;
  userName: string;
  userId: string;
  notif: Notif = new Notif();
  admindir: string;
  ida: number;
  dateTime = new Date();
  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {

      this.userId = res.id;
      this.userName = res.fullName;
      if (res.idAdministration != null) {
        this.adminId = res.idAdministration
        this.admin = res.nomAdministration
      }

      if (res.attribut1 != null) {
        this.admindir = res.attribut1
        this.notif.userReceiverId = res.attribut1;
        this.notif.userReceiverName = res.directeur;
        this.ch.iddir = res.attribut1;
      }
      this.notif.userTransmitterId = res.id;
      this.notif.userTransmitterName = res.fullName;
      this.notif.dateTime = this.date;
      this.notif.date = this.dateTime.getDate().toString() + '-' + (this.dateTime.getMonth() + 1).toString() + '-' + this.dateTime.getFullYear().toString();
      this.notif.time = this.dateTime.getHours().toString() + ':' + this.dateTime.getMinutes().toString();
      this.notif.TextNotification = "طلب صرف شيك من الموظف  " + res.fullName
      this.notif.serviceName = "طلب صرف شيك"
      this.notif.readUnread = "0";
      this.notif.serviceId = 2;


    })

  }
  ch: DemPayCheque = new DemPayCheque();
  dem: ServiceVente = new ServiceVente();
  isValidFormSubmitted = false;
  path: string;
  date = new Date().toLocaleDateString();
  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;

    }
    else {
      this.isValidFormSubmitted = true
      this.dem.datefin = this.date
      this.dem.idfin = this.userId;
      this.dem.nomfin = this.userName;
      this.toastr.success("تمت الإضافة بنجاح", "نجاح");
      this.demService.PutObservableE(this.dem).subscribe(res => {
        if (this.etat == "موافقة") {
          this.showChequeButton = true;
        } else { this.showChequeButton = false; }
        this.getList();
        form.resetForm();

      },
        err => {
          this.toastr.error("لم يتم التسجيل", "فشل في التسجيل");
        })
    }
  }

  // Create Cheque

  //getAdminList()

  adminList: Administration[] = [];
  getAdminList() {
    this.adminService.ListAdministration().subscribe(res => {
      this.adminList = res
    })
  }

  // Get Compte List
  cptLis: EtatListCompte[] = [];
  getComptes() {
    this.tbLProjetService.GetCompte().subscribe(res => {
      this.cptLis = res;
    })
  }
  //Get Classes List
  classesList: TbListening[] = [];
  getClasses() {
    this.tbLService.GetClasseCheque().subscribe(res => {
      this.classesList = res;
    })
  }

  chId: number;
  CreateCheque(form: NgForm) {
    this.ch.dateenreg = this.date;
    this.ch.creatorName = this.userName;
    this.ch.idUserCreator = this.userId;
    this.ch.calsse = "الحسابات"
    this.ch.dateEntre = this.date
    this.ch.etatgeneral = "في الإنتظار"
    this.ch.etatfinacier = "في الإنتظار"
    this.ch.etatdirecteur = "في الإنتظار"
    this.ch.etatparfinancier = "في الإنتظار"
    this.ch.etatpart = "في الإنتظار"
    this.ch.etatadmin = "في الإنتظار"
    this.ch.etatnum = "0";
    this.demandeService.Add(this.ch).subscribe(res => {
      this.chId = res.id
      this.notifService.Add(this.notif).subscribe(res => {

      })
      if (this.artest) {
        for (let i = 0; i < this.arlis.length; i++) {
          this.ar = this.arlis[i]

          this.ar.idDem = this.chId;
          this.articleService.Add(this.ar).subscribe(res => {
            this.arlis2[i] = res
          },
            err => {
              this.toastr.error("  فشل في تسجيل التفاصيل", "فشل")
            })
        }

      }

      this.artest = false;
      this.arlis.splice(0, this.arlis.length)
      this.i = 0;
      this.getthelastId();
      this.toastr.success("تم التسجيل بنجاح", "نجاح")
      form.resetForm();
    },
      err => {
        this.toastr.error("فشل في التسجيل", "فشل")
      }
    )

  }
  etat: string;
  getEtat(event) {
    this.etat = event.target.value; 
  }
  showChequeForm: boolean = false;
  showChequeButton: boolean = false;
  GetChequeForm() {
    if (this.showChequeForm) {
      this.showChequeForm = false
    } else {
      this.showChequeForm = true;
    }
  
  }


  //Article Add

  ar: ArticlePayCheque = new ArticlePayCheque();
  arlis: ArticlePayCheque[] = [];
  arlis2: ArticlePayCheque[] = [];
  artest: boolean = false;
  i: number = 0;
  addar() {
    this.artest = true
    this.arlis[this.i] = this.ar
    this.ar = new ArticlePayCheque();
    this.i = this.i + 1
  }

  //Delete Article


  delar(dp, i) {
    this.arlis.splice(this.arlis.indexOf(dp), 1);
    this.i = this.i - 1
    this.ar = new ArticlePayCheque();
  }

  list: DemPayCheque[] = [];
  max: number = 0;
  id: number;
  getthelastId() {
    this.demandeService.Get().subscribe(res => {
      this.list = res;
      this.id = this.list.length + 1;
      this.ch.numdem = this.id
 
    })
  }
  //GetFiles
  lf1: OffreVente[] = [];
  lf2: OffreVente[] = [];
  lf3: OffreVente[] = [];
  lf: OffreVente[] = [];

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
