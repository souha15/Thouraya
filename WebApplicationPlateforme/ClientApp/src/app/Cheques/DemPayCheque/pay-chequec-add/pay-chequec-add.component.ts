import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { PathSharedService } from '../../../shared/path-shared.service';
import { TbListening } from '../../../shared/Models/Evenements/tb-listening.model';
import { ChequeCService } from '../../../shared/Services/Cheques/cheque-c.service';
import { ChequesC } from '../../../shared/Models/Cheques/cheques-c.model';
import { NgForm } from '@angular/forms';
import { PayChequeService } from '../../../shared/Services/Cheques/pay-cheque.service';
import { PayChequesC } from '../../../shared/Models/Cheques/pay-cheques-c.model';
import { FilesChequesC } from '../../../shared/Models/Cheques/files-cheques-c.model';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { EtatListCompte } from '../../../shared/Models/Comptes/etat-list-compte.model';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../../shared/Services/Cheques/article-pay-cheque.service';
import { FilesPayChequesC } from '../../../shared/Models/Cheques/files-pay-cheques-c.model';
import { ArticlePayCheque } from '../../../shared/Models/Cheques/article-pay-cheque.model';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';

@Component({
  selector: 'app-pay-chequec-add',
  templateUrl: './pay-chequec-add.component.html',
  styleUrls: ['./pay-chequec-add.component.css']
})
export class PayChequecAddComponent implements OnInit {

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private toastr: ToastrService,
    private rootUrl: PathSharedService, ) {}

  ngOnInit(): void {
    this.getUserConnected();
    this.getClasses();
    this.getComptes();
    this.getthelastId()
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
  // Get User Connected

  UserIdConnected: string;
  UserNameConnected: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;

    })

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
       /*this.max = 0;
      this.list.forEach(item => {
        if (item.id > this.max) {
          this.max = item.id
        }
      })
      this.id = this.max + 1;
      this.ch.numdem = this.id
      console.log(this.max)*/
    })
  }
  //Create Cheque

  ch: DemPayCheque = new DemPayCheque();
  isValidFormSubmitted: boolean = false;
  date = new Date().toLocaleDateString();
  chId: number;

  onSubmit(form: NgForm) {
    if (form.invalid) {
      this.isValidFormSubmitted = false;
      this.toastr.warning("تأكد من  من صحة الحقول من فضلك")

    } else {
      this.isValidFormSubmitted = true;
      this.ch.dateenreg = this.date;
      this.ch.creatorName = this.UserNameConnected;
      this.ch.idUserCreator = this.UserIdConnected;
      this.ch.etatgeneral = "في الإنتظار"
      this.ch.etatfinacier = "في الإنتظار"
      this.ch.etatdirecteur = "في الإنتظار"
      this.ch.etatparfinancier = "في الإنتظار"
      this.ch.etatpart = "في الإنتظار"
      this.ch.etatadmin = "في الإنتظار"
      this.ch.etatnum = "0"
      this.demandeService.Add(this.ch).subscribe(res => {
        this.chId = res.id

        //Create article
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
  }
}
