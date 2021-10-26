import { Component, OnInit } from '@angular/core';
import { RetraitService } from '../../../shared/Services/Retrait/retrait.service';
import { Retrait } from '../../../shared/Models/Retrait/retrait.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cheque-retrait-list-active',
  templateUrl: './cheque-retrait-list-active.component.html',
  styleUrls: ['./cheque-retrait-list-active.component.css']
})
export class ChequeRetraitListActiveComponent implements OnInit {


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
      this.retList = this.retList1.filter(item => item.typeRetrait == "بنكي" && item.etat == "مفعل");
    })
  }

  retrait: Retrait = new Retrait();
  populateForm(facture: Retrait) {
    this.retraitService.formData = Object.assign({}, facture)
    this.retrait = Object.assign({}, facture);
  }
}
