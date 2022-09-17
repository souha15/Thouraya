import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';
import { ArticlePayCheque } from '../../../shared/Models/Cheques/article-pay-cheque.model';
import { UserServiceService } from '../../../shared/Services/User/user-service.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ListeningProjetService } from '../../../shared/Services/Projets/listening-projet.service';
import { ArticlePayChequeService } from '../../../shared/Services/Cheques/article-pay-cheque.service';
import { TbListeningService } from '../../../shared/Services/Evenements/tb-listening.service';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';
import { ProgressStatus } from '../../../shared/Interfaces/progress-status';
import { UploadDownloadService } from '../../../shared/Services/Taches/upload-download.service';
import { ProgressStatusEnum } from '../../../shared/Enum/progress-status-enum.enum';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-close-cheque-for-box-men',
  templateUrl: './close-cheque-for-box-men.component.html',
  styleUrls: ['./close-cheque-for-box-men.component.css']
})
export class CloseChequeForBoxMenComponent implements OnInit {

  @Output() public downloadStatus: EventEmitter<ProgressStatus>;
  @Input() public fileName: string;
  @Input() public disabled: boolean;
  userDetails;

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    private router: Router,
    public serviceupload: UploadDownloadService,
    private toastr: ToastrService, ) { this.downloadStatus = new EventEmitter<ProgressStatus>(); }

  ngOnInit(): void {
    //this.getVoiture();
    this.getUserConnected();
    this.UserService.getUserProfile().subscribe(
      res => {
        this.userDetails = res;


      },
      err => {
        console.log(err);
      },
    );
    this.getUserConnected();
    this.getDemPayList();
  }

  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  onLogout() {
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login-page');
  }


  // Get User Connected
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;



  // Get User Connected
  sexe: string;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.sexe = res.sexe;

    })
  }



  //Get Dem pay ListProject
  dem5: DemPayCheque[] = [];
  dem6: DemPayCheque[] = [];
  arlis: ArticlePayCheque[] = [];
  arlis2: ArticlePayCheque[] = [];
  getDemPayList() {
    this.demandeService.Get().subscribe(res => {
      this.dem5 = res
      this.dem6 = this.dem5.filter(item =>item.retour != null && item.etatgeneral == "معتمدة" && item.transfert!='1')

    })
  }


  //PopulateForm
  per: DemPayCheque = new DemPayCheque();


  populateForm(conge: DemPayCheque) {
    this.per = Object.assign({}, conge)
    this.articleService.Get().subscribe(res => {
      this.arlis2 = res;
      this.arlis = this.arlis2.filter(item => item.idDem == this.per.id)

    })
  }

  etat: string;
  etattest(event) {
    this.etat = event.target.value;
  }

  date = new Date().toLocaleDateString();

  onSubmit(form: NgForm) {
    this.per.transfert = "1";
    this.demandeService.PutObservableE(this.per).subscribe(res => {
      this.toastr.success("تم التسجيل بنجاح", "نجاح")
      this.getDemPayList();
      form.resetForm();

    }, err => {
      this.toastr.error("  فشل في تسجيل ا الإستلام أو التسليم"
        , "فشل")
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
