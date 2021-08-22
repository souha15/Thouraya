import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Stock } from '../../Models/Gestion Stock/stock.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Stock;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Stock) {
    return this.http.put<Stock>(this.rootURL + '/Stocks/' + Transaction.id, Transaction, this.headers);

  }

  post() {
    return this.http.post(this.rootURL + '/Stocks', this.formData, this.headers);
  }
  //Create Stock

  CreateStock(tache: Stock) {
    return this.http.post<Stock>(this.rootURL + '/Stocks', tache, this.headers);
  }

  //Edit Stock
  EditStock() {
    return this.http.put(this.rootURL + '/Stocks/' + this.formData.id, this.formData, this.headers);
  }

  // List Stock

  ListStock(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.rootURL + '/Stocks');
  }

  //Delete Stock

  DeleteStock(id) {
    return this.http.delete(this.rootURL + '/Stocks/' + id);
  }

  //Put Stock

  PutStockObservable(tache: Stock, Id: number) {
    return this.http.put<Stock>(this.rootURL + '/Stocks/' + Id, tache, this.headers);
  }

  PutStock(Id) {
    return this.http.put(this.rootURL + '/Stocks/' + this.formData.id, this.formData, this.headers);
  }

  //Get Stock By Id

  GetById(Id) {
    return this.http.get<Stock>(this.rootURL + '/Stocks/' + Id);
  }
}
