import { Component, OnInit } from '@angular/core';
import { DemPayChequeService } from '../../../shared/Services/Cheques/dem-pay-cheque.service';
import { ArticlePayChequeService } from '../../../shared/Services/Cheques/article-pay-cheque.service';
import { DemPayCheque } from '../../../shared/Models/Cheques/dem-pay-cheque.model';
import { ArticlePayCheque } from '../../../shared/Models/Cheques/article-pay-cheque.model';

@Component({
  selector: 'app-histo-pay-cheque',
  templateUrl: './histo-pay-cheque.component.html',
  styleUrls: ['./histo-pay-cheque.component.css']
})
export class HistoPayChequeComponent implements OnInit {

  constructor(private demandeService: DemPayChequeService,
    private articleService: ArticlePayChequeService,) { }

  ngOnInit(): void {
    this.getDemPayList();
  }
  p: Number = 1;
  count: Number = 5;

  //Get Dem pay ListProject
  dem6: DemPayCheque[] = [];
  arlis: ArticlePayCheque[] = [];

  getDemPayList() {
    this.demandeService.Get().subscribe(res => {
      this.dem6 = res


    })
  }

  //PopulateForm
  per: DemPayCheque = new DemPayCheque();


  populateForm(conge: DemPayCheque) {
    this.per = Object.assign({}, conge)
    this.articleService.Get().subscribe(res => {
      this.arlis = res;
    })
  }

}
