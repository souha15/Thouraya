import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../shared/Services/AdministrativeCommunication/transaction.service';
import { Transaction } from '../../../shared/Models/AdministrativeCommunication/transaction.model';

@Component({
  selector: 'app-transaction-global-r',
  templateUrl: './transaction-global-r.component.html',
  styleUrls: ['./transaction-global-r.component.css']
})
export class TransactionGlobalRComponent implements OnInit {

  constructor(private transactionService: TransactionService,) { }

  ngOnInit(): void {
    this.TransactionList()
  }

  p: Number = 1;
  count: Number = 5;
  FiltredList: Transaction[] = [];
  TransactionList() {
    this.transactionService.List().subscribe(res => {
      this.FiltredList = res

    });
  }
}
