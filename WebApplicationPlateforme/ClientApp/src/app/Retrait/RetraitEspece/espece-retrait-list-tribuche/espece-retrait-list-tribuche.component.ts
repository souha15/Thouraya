import { Component, OnInit } from '@angular/core';
import { RetraitService } from '../../../shared/Services/Retrait/retrait.service';
import { Retrait } from '../../../shared/Models/Retrait/retrait.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-espece-retrait-list-tribuche',
  templateUrl: './espece-retrait-list-tribuche.component.html',
  styleUrls: ['./espece-retrait-list-tribuche.component.css']
})
export class EspeceRetraitListTribucheComponent implements OnInit {

  constructor(private retraitService: RetraitService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getList();
  }
  c: Number = 1;

  count: Number = 5;
  retList: Retrait[] = [];
  retList1: Retrait[] = [];
  getList() {
    this.retraitService.List().subscribe(res => {
      this.retList1 = res;
      this.retList = this.retList1.filter(item => item.typeRetrait == "يدوي" && item.etat =="متعثر");
    })
  }

  retrait: Retrait = new Retrait();
  populateForm(facture: Retrait) {
    this.retraitService.formData = Object.assign({}, facture)
    this.retrait = Object.assign({}, facture);
  }

}
