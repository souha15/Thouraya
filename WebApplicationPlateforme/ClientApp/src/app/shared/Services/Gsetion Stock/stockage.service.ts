import { Injectable } from '@angular/core';
import { Stockage } from '../../Models/Gestion Stock/stockage.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockageService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Stockage;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Stockage) {
    return this.http.put<Stockage>(this.rootURL + '/Stockages/' + Transaction.id, Transaction, this.headers);

  }
  //Create Stockage

  CreateStockage(tache: Stockage) {
    return this.http.post<Stockage>(this.rootURL + '/Stockages', tache, this.headers);
  }

  //Edit Stockage
  EditStockage() {
    return this.http.put(this.rootURL + '/Stockages/' + this.formData.id, this.formData, this.headers);
  }

  // List Stockage

  ListStockage(): Observable<Stockage[]> {
    return this.http.get<Stockage[]>(this.rootURL + '/Stockages');
  }

  //Delete Stockage

  DeleteStockage(id) {
    return this.http.delete(this.rootURL + '/Stockages/' + id);
  }

  //Put Stockage

  PutStockageObservable(tache: Stockage, Id: number) {
    return this.http.put<Stockage>(this.rootURL + '/Stockages/' + Id, tache, this.headers);
  }

  PutStockage(Id) {
    return this.http.put(this.rootURL + '/Stockages/' + this.formData.id, this.formData, this.headers);
  }

  //Get Stockage By Id

  GetById(Id) {
    return this.http.get<Stockage>(this.rootURL + '/Stockages/' + Id);
  }
}
