import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DecisionTwo } from '../../Models/ServiceRh/decision-two.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecisionTwoService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DecisionTwo;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DecisionTwo

  Add(DecisionTwo: DecisionTwo) {
    return this.http.post<DecisionTwo>(this.rootURL + '/DecisionTwoes', DecisionTwo, this.headers);
  }

  PutObservableE(Transaction: DecisionTwo) {
    return this.http.put<DecisionTwo>(this.rootURL + '/DecisionTwoes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/DecisionTwoes', this.formData, this.headers);
  }

  //Get DecisionTwo List

  Get(): Observable<DecisionTwo[]> {
    return this.http.get<DecisionTwo[]>(this.rootURL + '/DecisionTwoes');
  }

  //Get DecisionTwo By Id

  GetById(Id) {
    return this.http.get<DecisionTwo>(this.rootURL + '/DecisionTwoes/' + Id);
  }

  //Edit DecisionTwo

  Edit() {
    return this.http.put(this.rootURL + '/DecisionTwoes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DecisionTwo

  Delete(id) {
    return this.http.delete(this.rootURL + '/DecisionTwoes/' + id);
  }
}
