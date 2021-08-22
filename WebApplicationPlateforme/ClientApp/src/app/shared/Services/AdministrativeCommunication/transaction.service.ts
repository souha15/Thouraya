import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Transaction } from '../../Models/AdministrativeCommunication/transaction.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Transaction;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Transaction

  Create(Transaction: Transaction) {
    return this.http.post<Transaction>(this.rootURL + '/Transactions', Transaction, this.headers);
  }

  //Edit Transaction
  Edit() {
    return this.http.put(this.rootURL + '/Transactions/' + this.formData.id, this.formData, this.headers);
  }

  // List Transaction

  List(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.rootURL + '/Transactions');
  }


  //Delete Transaction

  Delete(id) {
    return this.http.delete(this.rootURL + '/Transactions/' + id);
  }

  //Put Transaction

  PutObservable(Transaction: Transaction) {
    return this.http.put<Transaction>(this.rootURL + '/Transactions/' + Transaction.id, Transaction, this.headers);
  }

  PutObservableTr(Transaction: Transaction) {
    return this.http.put<Transaction>(this.rootURL + '/Transactions/' + Transaction.id, Transaction, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Transactions/' + this.formData.id, this.formData, this.headers);
  }

  //Get Transaction By Id

  GetById(Id) {
    return this.http.get<Transaction>(this.rootURL + '/Transactions/' + Id);
  }


/***Transaction Emise****/

  //Create Transaction

  CreateE(Transaction: Transaction) {
    return this.http.post<Transaction>(this.rootURL + '/TransactionEmises', Transaction, this.headers);
  }

  //Edit Transaction
  EditE() {
    return this.http.put(this.rootURL + '/TransactionEmises/' + this.formData.id, this.formData, this.headers);
  }

  // List Transaction

  ListE(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.rootURL + '/TransactionEmises');
  }


  //Delete Transaction

  DeleteE(id) {
    return this.http.delete(this.rootURL + '/TransactionEmises/' + id);
  }

  //Put Transaction

  PutObservableE(Transaction: Transaction) {
    return this.http.put<Transaction>(this.rootURL + '/TransactionEmises/' + Transaction.id, Transaction, this.headers);
  }

  PutObservableTrE(Transaction: Transaction) {
    return this.http.put<Transaction>(this.rootURL + '/TransactionEmises/' + Transaction.id, Transaction, this.headers);
  }

  PutE(Id) {
    return this.http.put(this.rootURL + '/TransactionEmises/' + this.formData.id, this.formData, this.headers);
  }

  //Get Transaction By Id

  GetByIdE(Id) {
    return this.http.get<Transaction>(this.rootURL + '/TransactionEmises/' + Id);
  }


/******/

  /***Transaction Interne****/

  //Create Transaction

  CreateI(Transaction: Transaction) {
    return this.http.post<Transaction>(this.rootURL + '/TransactionIs', Transaction, this.headers);
  }

  //Edit Transaction
  EditI() {
    return this.http.put(this.rootURL + '/TransactionIs/' + this.formData.id, this.formData, this.headers);
  }

  // List Transaction

  ListI(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.rootURL + '/TransactionIs');
  }


  //Delete Transaction

  DeleteI(id) {
    return this.http.delete(this.rootURL + '/TransactionIs/' + id);
  }

  //Put Transaction

  PutObservableI(Transaction: Transaction) {
    return this.http.put<Transaction>(this.rootURL + '/TransactionIs/' + Transaction.id, Transaction, this.headers);
  }

  PutObservableTrI(Transaction: Transaction) {
    return this.http.put<Transaction>(this.rootURL + '/TransactionIs/' + Transaction.id, Transaction, this.headers);
  }

  PutI(Id) {
    return this.http.put(this.rootURL + '/TransactionIs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Transaction By Id

  GetByIdI(Id) {
    return this.http.get<Transaction>(this.rootURL + '/TransactionIs/' + Id);
  }


/******/
}
