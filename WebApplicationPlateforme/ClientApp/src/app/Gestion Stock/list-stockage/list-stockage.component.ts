import { Component, OnInit } from '@angular/core';
import { StockageService } from '../../shared/Services/Gsetion Stock/stockage.service';
import { Stockage } from '../../shared/Models/Gestion Stock/stockage.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list-stockage',
  templateUrl: './list-stockage.component.html',
  styleUrls: ['./list-stockage.component.css']
})
export class ListStockageComponent implements OnInit {

  constructor(private stockageService: StockageService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getLkistStockage();
  }

  p: Number = 1;
  count: Number = 5;
  //Get List Stockage
  ListStockage: Stockage[] = [];
  getLkistStockage() {
    this.stockageService.ListStockage().subscribe(res => {
      this.ListStockage =res
    })
  }

  //Delete
  onDelete(Id) {
    if (confirm('Are you sure to delete this record ?')) {
      this.stockageService.DeleteStockage(Id)
        .subscribe(res => {
          this.getLkistStockage();
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
