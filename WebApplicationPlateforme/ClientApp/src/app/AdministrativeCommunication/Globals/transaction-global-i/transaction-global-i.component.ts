import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../../shared/Services/AdministrativeCommunication/transaction.service';
import { Transaction } from '../../../shared/Models/AdministrativeCommunication/transaction.model';

@Component({
  selector: 'app-transaction-global-i',
  templateUrl: './transaction-global-i.component.html',
  styleUrls: ['./transaction-global-i.component.css']
})
export class TransactionGlobalIComponent implements OnInit {

  constructor(private transactionService: TransactionService,) { }

ngOnInit(): void {
  this.TransactionList()
  }

  p: Number = 1;
  count: Number = 5;
  FiltredList: Transaction[] = [];
  TransactionList() {
    this.transactionService.ListI().subscribe(res => {
      this.FiltredList = res

    });
  }
}
