import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PayChequesC } from '../../Models/Cheques/pay-cheques-c.model';

@Injectable({
  providedIn: 'root'
})
export class PayChequeService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PayChequesC
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create PayChequesC

  Add(PayChequesC: PayChequesC) {
    return this.http.post<PayChequesC>(this.rootURL + '/PayCheques', PayChequesC, this.headers);
  }

  PutObservableE(Transaction: PayChequesC) {
    return this.http.put<PayChequesC>(this.rootURL + '/PayCheques/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/PayCheques', this.formData, this.headers);
  }

  //Get PayChequesC List

  Get(): Observable<PayChequesC[]> {
    return this.http.get<PayChequesC[]>(this.rootURL + '/PayCheques');
  }

  //Get PayChequesC By Id

  GetById(Id) {
    return this.http.get<PayChequesC>(this.rootURL + '/PayCheques/' + Id);
  }

  //Edit PayChequesC

  Edit() {
    return this.http.put(this.rootURL + '/PayCheques/' + this.formData.id, this.formData, this.headers);
  }


  //Delete PayChequesC

  Delete(id) {
    return this.http.delete(this.rootURL + '/PayCheques/' + id);
  }
}
