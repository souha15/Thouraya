import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BenPayStockOrdre } from '../../Models/Gestion Stock/ben-pay-stock-ordre.model';
@Injectable({
  providedIn: 'root'
})
export class BenPayStockOrdreService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: BenPayStockOrdre;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: BenPayStockOrdre) {
    return this.http.put<BenPayStockOrdre>(this.rootURL + '/BenPayStockageOrdres/' + Transaction.id, Transaction, this.headers);

  }
  //Create BenPayStockOrdre

  CreateBenPayStockOrdre(tache: BenPayStockOrdre) {
    return this.http.post<BenPayStockOrdre>(this.rootURL + '/BenPayStockageOrdres', tache, this.headers);
  }

  //Edit BenPayStockOrdre
  EditBenPayStockOrdre() {
    return this.http.put(this.rootURL + '/BenPayStockageOrdres/' + this.formData.id, this.formData, this.headers);
  }

  // List BenPayStockOrdre

  ListBenPayStockOrdre(): Observable<BenPayStockOrdre[]> {
    return this.http.get<BenPayStockOrdre[]>(this.rootURL + '/BenPayStockageOrdres');
  }

  //Delete BenPayStockOrdre

  DeleteBenPayStockOrdre(id) {
    return this.http.delete(this.rootURL + '/BenPayStockageOrdres/' + id);
  }

  //Put BenPayStockOrdre

  PutBenPayStockOrdreObservable(tache: BenPayStockOrdre, Id: number) {
    return this.http.put<BenPayStockOrdre>(this.rootURL + '/BenPayStockageOrdres/' + Id, tache, this.headers);
  }

  PutBenPayStockOrdre(Id) {
    return this.http.put(this.rootURL + '/BenPayStockageOrdres/' + this.formData.id, this.formData, this.headers);
  }

  //Get BenPayStockOrdre By Id

  GetById(Id) {
    return this.http.get<BenPayStockOrdre>(this.rootURL + '/BenPayStockageOrdres/' + Id);
  }
}
