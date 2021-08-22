import { Component, OnInit } from '@angular/core';
import { StockageService } from '../../shared/Services/Gsetion Stock/stockage.service';
import { Stockage } from '../../shared/Models/Gestion Stock/stockage.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { TypeStockage } from '../../shared/Models/Gestion Stock/type-stockage.model';
import { TypeStockageService } from '../../shared/Services/Gsetion Stock/type-stockage.service';

@Component({
  selector: 'app-details-stockage',
  templateUrl: './details-stockage.component.html',
  styleUrls: ['./details-stockage.component.css']
})
export class DetailsStockageComponent implements OnInit {
  private routeSub: Subscription;
  constructor(private stockageService: StockageService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private typeStockageService: TypeStockageService) { }

  ngOnInit(): void {
    this.getIdUrl();
  }


  //get the id in Url

  Id: number;
  st: Stockage = new Stockage();
  tyStock: TypeStockage[] = [];
  tyStockst: TypeStockage[] = [];
  exist: boolean = false;

  getIdUrl() {
    this.routeSub = this.route.params.subscribe(params => {
      this.Id = params['id']

      this.stockageService.GetById(this.Id).subscribe(res => {
        this.st = res
        this.typeStockageService.ListTypeStockage().subscribe(res => {
          this.tyStock = res
          this.tyStockst = this.tyStock.filter(item => item.idstockage == this.st.id)
          if (this.tyStockst.length != 0) {
            this.exist = true;
          } else {
            this.exist = false;
          }
        })
      })
    });

  }
}
