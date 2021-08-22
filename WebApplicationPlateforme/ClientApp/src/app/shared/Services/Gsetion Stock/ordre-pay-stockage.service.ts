import { Injectable } from '@angular/core';
import { OrdrePayStockage } from '../../Models/Gestion Stock/ordre-pay-stockage.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdrePayStockageService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: OrdrePayStockage;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: OrdrePayStockage) {
    return this.http.put<OrdrePayStockage>(this.rootURL + '/OrdrePayStockages/' + Transaction.id, Transaction, this.headers);

  }
  //Create OrdrePayStockage

  CreateOrdrePayStockage(tache: OrdrePayStockage) {
    return this.http.post<OrdrePayStockage>(this.rootURL + '/OrdrePayStockages', tache, this.headers);
  }

  //Edit OrdrePayStockage
  EditOrdrePayStockage() {
    return this.http.put(this.rootURL + '/OrdrePayStockages/' + this.formData.id, this.formData, this.headers);
  }

  // List OrdrePayStockage

  ListOrdrePayStockage(): Observable<OrdrePayStockage[]> {
    return this.http.get<OrdrePayStockage[]>(this.rootURL + '/OrdrePayStockages');
  }

  //Delete OrdrePayStockage

  DeleteOrdrePayStockage(id) {
    return this.http.delete(this.rootURL + '/OrdrePayStockages/' + id);
  }

  //Put OrdrePayStockage

  PutOrdrePayStockageObservable(tache: OrdrePayStockage, Id: number) {
    return this.http.put<OrdrePayStockage>(this.rootURL + '/OrdrePayStockages/' + Id, tache, this.headers);
  }

  PutOrdrePayStockage(Id) {
    return this.http.put(this.rootURL + '/OrdrePayStockages/' + this.formData.id, this.formData, this.headers);
  }

  //Get OrdrePayStockage By Id

  GetById(Id) {
    return this.http.get<OrdrePayStockage>(this.rootURL + '/OrdrePayStockages/' + Id);
  }
}
