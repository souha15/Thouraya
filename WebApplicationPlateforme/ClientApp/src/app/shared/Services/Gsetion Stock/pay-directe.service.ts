import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PayDirecte } from '../../Models/Gestion Stock/pay-directe.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayDirecteService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PayDirecte;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: PayDirecte) {
    return this.http.put<PayDirecte>(this.rootURL + '/PayDirecteStockages/' + Transaction.id, Transaction, this.headers);

  }
  //Create PayDirecte

  CreatePayDirecte(tache: PayDirecte) {
    return this.http.post<PayDirecte>(this.rootURL + '/PayDirecteStockages', tache, this.headers);
  }

  //Edit PayDirecte
  EditPayDirecte() {
    return this.http.put(this.rootURL + '/PayDirecteStockages/' + this.formData.id, this.formData, this.headers);
  }

  // List PayDirecte

  ListPayDirecte(): Observable<PayDirecte[]> {
    return this.http.get<PayDirecte[]>(this.rootURL + '/PayDirecteStockages');
  }

  //Delete PayDirecte

  DeletePayDirecte(id) {
    return this.http.delete(this.rootURL + '/PayDirecteStockages/' + id);
  }

  //Put PayDirecte

  PutPayDirecteObservable(tache: PayDirecte, Id: number) {
    return this.http.put<PayDirecte>(this.rootURL + '/PayDirecteStockages/' + Id, tache, this.headers);
  }

  PutPayDirecte(Id) {
    return this.http.put(this.rootURL + '/PayDirecteStockages/' + this.formData.id, this.formData, this.headers);
  }

  //Get PayDirecte By Id

  GetById(Id) {
    return this.http.get<PayDirecte>(this.rootURL + '/PayDirecteStockages/' + Id);
  }
}
