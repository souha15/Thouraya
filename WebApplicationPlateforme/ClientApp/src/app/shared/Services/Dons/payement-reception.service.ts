import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PayementReception } from '../../Models/Dons/payement-reception.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementReceptionService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PayementReception;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: PayementReception) {
    return this.http.post<PayementReception>(this.rootURL + '/PayemeentReceptions', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/PayemeentReceptions', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<PayementReception[]> {
    return this.http.get<PayementReception[]>(this.rootURL + '/PayemeentReceptions');
  }

  Get() {
    return this.http.get<PayementReception[]>(this.rootURL + '/PayemeentReceptions');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<PayementReception>(this.rootURL + '/PayemeentReceptions/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/PayemeentReceptions/' + this.formData.id, this.formData, this.headers);
  }

  PutObservableE(Transaction: PayementReception) {
    return this.http.put<PayementReception>(this.rootURL + '/PayemeentReceptions/' + Transaction.id, Transaction, this.headers);
  }



  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/PayemeentReceptions/' + id);
  }
}


