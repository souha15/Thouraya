import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TbListening } from '../../Models/Evenements/tb-listening.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniteTypeStockService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TbListening;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: TbListening) {
    return this.http.put<TbListening>(this.rootURL + '/UniteTypeStocks/' + Transaction.id, Transaction, this.headers);

  }

  post() {
    return this.http.post(this.rootURL + '/UniteTypeStocks', this.formData, this.headers);
  }

  //Create TbListening

  CreateTbListening(tache: TbListening) {
    return this.http.post<TbListening>(this.rootURL + '/UniteTypeStocks', tache, this.headers);
  }

  //Edit TbListening
  EditTbListening() {
    return this.http.put(this.rootURL + '/UniteTypeStocks/' + this.formData.id, this.formData, this.headers);
  }

  // List TbListening

  ListTbListening(): Observable<TbListening[]> {
    return this.http.get<TbListening[]>(this.rootURL + '/UniteTypeStocks');
  }

  //Delete TbListening

  DeleteTbListening(id) {
    return this.http.delete(this.rootURL + '/UniteTypeStocks/' + id);
  }

  //Put TbListening

  PutTbListeningObservable(tache: TbListening, Id: number) {
    return this.http.put<TbListening>(this.rootURL + '/UniteTypeStocks/' + Id, tache, this.headers);
  }

  PutTbListening(Id) {
    return this.http.put(this.rootURL + '/UniteTypeStocks/' + this.formData.id, this.formData, this.headers);
  }

  //Get TbListening By Id

  GetById(Id) {
    return this.http.get<TbListening>(this.rootURL + '/UniteTypeStocks/' + Id);
  }
}
