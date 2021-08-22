import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Facture } from '../../Models/Finance/facture.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Facture;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Facture) {
    return this.http.post<Facture>(this.rootURL + '/Factures', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Factures', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Facture[]> {
    return this.http.get<Facture[]>(this.rootURL + '/Factures');
  }

  Get() {
    return this.http.get<Facture[]>(this.rootURL + '/Factures');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Facture>(this.rootURL + '/Factures/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Factures/' + this.formData.id, this.formData, this.headers);
  }

  PutObservableE(Transaction: Facture) {
    return this.http.put<Facture>(this.rootURL + '/Factures/' + Transaction.id, Transaction, this.headers);
  }



  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Factures/' + id);
  }
}


