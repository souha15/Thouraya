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
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pay-chequec-edit',
  templateUrl: './pay-chequec-edit.component.html',
  styleUrls: ['./pay-chequec-edit.component.css']
})
export class PayChequecEditComponent implements OnInit {

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    public serviceupload: UploadDownloadService,
    private http: HttpClient,
    private toastr: ToastrService,
    private rootUrl: PathSharedService,
    private route: ActivatedRoute,) { }
  private routeSub: Subscription;
  ngOnInit(): void {
    this.getUserConnected();
    this.getIdUrl();
    this.getArLis();
    this.getClasses();
    this.getComptes();
  }


  idch: number;
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.idch = params['id']

      this.demandeService.GetById(this.idch).subscribe(res => {
        this.ch = res

      })
    });
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
  arlisF: ArticlePayCheque[] = [];
  arlis2: ArticlePayCheque[] = [];
  arlis3: ArticlePayCheque[] = [];
  artest: boolean = false;
  artest2: boolean = false;
  i: number = 0;
  addar() {
    this.artest2 = true
    this.arlis3[this.i] = this.ar
    this.ar = new ArticlePayCheque();
    this.i = this.i + 1
  }


  //Ge Ar List
  getArLis() {
    this.articleService.Get().subscribe(res => {
      this.arlisF = res
      this.arlis = this.arlisF.filter(item => item.idDem == this.idch)
      if (this.arlis.length != 0) {
        this.artest = true;
      }
    })
  }

  //Delete Article


  delar(dp, i) {
    this.arlis3.splice(this.arlis3.indexOf(dp), 1);
    this.i = this.i - 1
    this.ar = new ArticlePayCheque();
  }
  delardb(Id) {
    this.articleService.Delete(Id).subscribe(res => {
      this.getArLis();
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

      if (this.ch.etatgeneral == "للإنجاز") {
        this.ch.attribut3 = "editer"
      } else {
        this.ch.attribut3=""
      }
      this.ch.dateenreg = this.date;
      this.ch.creatorName = this.UserNameConnected;
      this.ch.idUserCreator = this.UserIdConnected;
      this.demandeService.PutObservableE(this.ch).subscribe(res => {

        //Create article
        if (this.artest2) {
          for (let i = 0; i < this.arlis3.length; i++) {
            this.ar = this.arlis3[i]

            this.ar.idDem = this.idch;
            this.articleService.Add(this.ar).subscribe(res => {
         
            },
              err => {
                this.toastr.error("  فشل في تسجيل التفاصيل", "فشل")
              })
          }

        }

        this.artest2 = false;
        this.artest = false;
        this.arlis.splice(0, this.arlis.length)
        this.arlis3.splice(0, this.arlis3.length)
        this.i = 0;
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
