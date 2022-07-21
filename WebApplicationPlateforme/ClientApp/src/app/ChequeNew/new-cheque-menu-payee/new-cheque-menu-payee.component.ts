import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';
import { DemPayChequeService } from '../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../shared/Services/Cheques/article-pay-cheque.service';
import { TbListeningService } from '../../shared/Services/Evenements/tb-listening.service';
import { ListeningProjetService } from '../../shared/Services/Projets/listening-projet.service';
import { DemPayCheque } from '../../shared/Models/Cheques/dem-pay-cheque.model';
import { ArticlePayCheque } from '../../shared/Models/Cheques/article-pay-cheque.model';
import { UserServiceService } from '../../shared/Services/User/user-service.service';
import { UserDetail } from '../../shared/Models/User/user-detail.model';
@Component({
  selector: 'app-new-cheque-menu-payee',
  templateUrl: './new-cheque-menu-payee.component.html',
  styleUrls: ['./new-cheque-menu-payee.component.css']
})
export class NewChequeMenuPayeeComponent implements OnInit {
  private routeSub: Subscription;
  @ViewChild('htmlData') htmlData: ElementRef;
  displayUrl;
  constructor(private route: ActivatedRoute,
    private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,
    private tbLService: TbListeningService,
    private tbLProjetService: ListeningProjetService,
    private UserService: UserServiceService) { }

  ngOnInit(): void {
    this.getIdUrl();
  }

  //get the id in Url

  Id: number;
  dem: DemPayCheque = new DemPayCheque();
  article: ArticlePayCheque = new ArticlePayCheque();
  articleList: ArticlePayCheque[] = [];
  articleList1: ArticlePayCheque[] = [];
  Iban: string;
  user: UserDetail = new UserDetail();
  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.demandeService.GetById(this.Id).subscribe(res => {
        this.dem = res
        this.articleService.Get().subscribe(res1 => {
          this.articleList1 = res1;
          if (this.articleList1.length> 0) {
            this.articleList = this.articleList1.filter(item => item.idDem == this.Id);
            if (this.articleList.length > 0) {
              this.article = this.articleList[0];
            }

          }
          
        })
        this.UserService.GetUserById(this.dem.idUserCreator).subscribe(res2 => {
          this.Iban = res2.dateQualification;
          this.user = res2;
        })

      })
    });
  }


  //impression tr
  path: string;
  public print() {

    var data = document.getElementById('htmlData');
    data.style.display = "block";
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      data.style.display = "none"
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF

      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      this.path = "Cheque" + this.Id + ".pdf"
      pdf.save(this.path); // Generated PDF

    }

    );

  }
}
