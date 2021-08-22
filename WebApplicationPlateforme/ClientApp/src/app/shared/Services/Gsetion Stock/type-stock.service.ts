import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TypeStock } from '../../Models/Gestion Stock/type-stock.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeStockService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TypeStock;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: TypeStock) {
    return this.http.put<TypeStock>(this.rootURL + '/TypeStocks/' + Transaction.id, Transaction, this.headers);

  }

  post() {
    return this.http.post(this.rootURL + '/TypeStocks', this.formData, this.headers);
  }
  //Create TypeStock

  CreateTypeStock(tache: TypeStock) {
    return this.http.post<TypeStock>(this.rootURL + '/TypeStocks', tache, this.headers);
  }

  //Edit TypeStock
  EditTypeStock() {
    return this.http.put(this.rootURL + '/TypeStocks/' + this.formData.id, this.formData, this.headers);
  }

  // List TypeStock

  ListTypeStock(): Observable<TypeStock[]> {
    return this.http.get<TypeStock[]>(this.rootURL + '/TypeStocks');
  }

  //Delete TypeStock

  DeleteTypeStock(id) {
    return this.http.delete(this.rootURL + '/TypeStocks/' + id);
  }

  //Put TypeStock

  PutTypeStockObservable(tache: TypeStock, Id: number) {
    return this.http.put<TypeStock>(this.rootURL + '/TypeStocks/' + Id, tache, this.headers);
  }

  PutTypeStock(Id) {
    return this.http.put(this.rootURL + '/TypeStocks/' + this.formData.id, this.formData, this.headers);
  }

  //Get TypeStock By Id

  GetById(Id) {
    return this.http.get<TypeStock>(this.rootURL + '/TypeStocks/' + Id);
  }
}
