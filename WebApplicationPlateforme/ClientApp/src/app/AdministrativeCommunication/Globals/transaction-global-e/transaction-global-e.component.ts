import { Component, OnInit } from '@angular/core';
import { Transaction } from '../../../shared/Models/AdministrativeCommunication/transaction.model';
import { TransactionService } from '../../../shared/Services/AdministrativeCommunication/transaction.service';

@Component({
  selector: 'app-transaction-global-e',
  templateUrl: './transaction-global-e.component.html',
  styleUrls: ['./transaction-global-e.component.css']
})
export class TransactionGlobalEComponent implements OnInit {

  constructor(private transactionService: TransactionService,) { }

  ngOnInit(): void {
    this.TransactionList()
  }

  p: Number = 1;
  count: Number = 5;
  FiltredList: Transaction[] = [];
  TransactionList() {
    this.transactionService.ListE().subscribe(res => {
      this.FiltredList = res

    });
  }
}
