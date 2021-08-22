import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActionDemPay } from '../../Models/Cheques/action-dem-pay.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActionDemPayService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ActionDemPay
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ActionDemPay

  Add(ActionDemPay: ActionDemPay) {
    return this.http.post<ActionDemPay>(this.rootURL + '/ActionOnDemPayCheqs', ActionDemPay, this.headers);
  }

  PutObservableE(Transaction: ActionDemPay) {
    return this.http.put<ActionDemPay>(this.rootURL + '/ActionOnDemPayCheqs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ActionOnDemPayCheqs', this.formData, this.headers);
  }

  //Get ActionDemPay List

  Get(): Observable<ActionDemPay[]> {
    return this.http.get<ActionDemPay[]>(this.rootURL + '/ActionOnDemPayCheqs');
  }

  //Get ActionDemPay By Id

  GetById(Id) {
    return this.http.get<ActionDemPay>(this.rootURL + '/ActionOnDemPayCheqs/' + Id);
  }

  //Edit ActionDemPay

  Edit() {
    return this.http.put(this.rootURL + '/ActionOnDemPayCheqs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ActionDemPay

  Delete(id) {
    return this.http.delete(this.rootURL + '/ActionOnDemPayCheqs/' + id);
  }
}
