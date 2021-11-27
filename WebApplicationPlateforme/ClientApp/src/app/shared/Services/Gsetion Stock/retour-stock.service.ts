import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RetourStock } from '../../Models/Gestion Stock/retour-stock.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RetourStockService {

    constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: RetourStock;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: RetourStock) {
    return this.http.put<RetourStock>(this.rootURL + '/RetourStock/' + Transaction.id, Transaction, this.headers);

  }
  //Create RetourStock

  CreateRetourStock(tache: RetourStock) {
    return this.http.post<RetourStock>(this.rootURL + '/RetourStock', tache, this.headers);
  }

  //Edit RetourStock
  EditRetourStock() {
    return this.http.put(this.rootURL + '/RetourStock/' + this.formData.id, this.formData, this.headers);
  }

  // List RetourStock

  ListRetourStock(): Observable<RetourStock[]> {
    return this.http.get<RetourStock[]>(this.rootURL + '/RetourStock');
  }

  //Delete RetourStock

  DeleteRetourStock(id) {
    return this.http.delete(this.rootURL + '/RetourStock/' + id);
  }

  //Put RetourStock

  PutRetourStockObservable(tache: RetourStock, Id: number) {
    return this.http.put<RetourStock>(this.rootURL + '/RetourStock/' + Id, tache, this.headers);
  }

  PutRetourStock(Id) {
    return this.http.put(this.rootURL + '/RetourStock/' + this.formData.id, this.formData, this.headers);
  }

  //Get RetourStock By Id

  GetById(Id) {
    return this.http.get<RetourStock>(this.rootURL + '/RetourStock/' + Id);
  }
}
