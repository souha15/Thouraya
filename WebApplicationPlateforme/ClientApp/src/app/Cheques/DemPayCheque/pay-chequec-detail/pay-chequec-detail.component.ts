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
  selector: 'app-pay-chequec-detail',
  templateUrl: './pay-chequec-detail.component.html',
  styleUrls: ['./pay-chequec-detail.component.css']
})
export class PayChequecDetailComponent implements OnInit {


  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getUserConnected();
    this.getDemPayList();
  }

  // Get User Connected
  p: Number = 1;
  count: Number = 5;
  UserIdConnected: string;
  UserNameConnected: string;
  roleslist: any = [];
  testrole: boolean = false;

  getUserConnected() {

    this.UserService.getUserProfileObservable().subscribe(res => {
      this.UserIdConnected = res.id;
      this.UserNameConnected = res.fullName;
      this.UserService.getUserRoles(this.UserIdConnected).subscribe(res => {
        this.roleslist = res;
        this.roleslist.forEach(item => {
          if (item == "ADMINISTRATEUR" || item =="SECRETAIRE") {
            this.testrole = true;
          } else { this.testrole = false; }
        })
      })

    })

  }


  //Get Dem pay ListProject
  dem1: DemPayCheque[] = [];
  dem2: DemPayCheque[] = [];
  arlis: ArticlePayCheque[] = [];
  arlis2: ArticlePayCheque[] = [];
  nbwork: number = 0;
  nbdone: number = 0;
  nbrefused: number = 0;
  getDemPayList() {
    this.demandeService.Get().subscribe(res => {
      this.dem2 = res
      this.nbwork = this.dem2.filter(item => item.etatgeneral == "تحت الإجراء").length;
      this.nbdone = this.dem2.filter(item => item.etatgeneral == "معتمدة").length;
      this.nbrefused = this.dem2.filter(item => item.etatgeneral == "مرفوضة").length;
      return this.dem2.sort((a, b) => new Date(a.dateEntre).getTime() - new Date(b.dateEntre).getTime())

    })
  }


  //PopulateForm
  per: DemPayCheque = new DemPayCheque();
  per1: DemPayCheque = new DemPayCheque();

  raistest: boolean = false
  populateForm(conge: DemPayCheque) {
    this.per = Object.assign({}, conge)
    this.articleService.Get().subscribe(res => {
      this.arlis2 = res;
      this.arlis = this.arlis2.filter(item => item.idDem == this.per.id)
      if (this.per.attibut1 != null) {
        this.raistest = true;
      } else {
        this.raistest = false
      }
    })
  }


  //Delete

  onDelete(Id) {
 
        if (confirm('Are you sure to delete this record ?')) {
          this.demandeService.Delete(Id)
            .subscribe(res => {
              this.getDemPayList();
              this.toastr.success("تم الحذف  بنجاح", "نجاح");
            },

              err => {
                console.log(err);
                this.toastr.warning('لم يتم الحذف  ', ' فشل');

              }
            )

        }
     
  }
}
