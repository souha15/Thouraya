import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RevenusBen } from '../../Models/GestBen/revenus-ben.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RevenusBenService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: RevenusBen;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: RevenusBen) {
    return this.http.put<RevenusBen>(this.rootURL + '/RevenusBens/' + Transaction.id, Transaction, this.headers);

  }
  //Create RevenusBen

  CreateRevenusBen(tache: RevenusBen) {
    return this.http.post<RevenusBen>(this.rootURL + '/RevenusBens', tache, this.headers);
  }

  //Edit RevenusBen
  EditRevenusBen() {
    return this.http.put(this.rootURL + '/RevenusBens/' + this.formData.id, this.formData, this.headers);
  }

  // List RevenusBen

  ListRevenusBen(): Observable<RevenusBen[]> {
    return this.http.get<RevenusBen[]>(this.rootURL + '/RevenusBens');
  }

  //Delete RevenusBen

  DeleteRevenusBen(id) {
    return this.http.delete(this.rootURL + '/RevenusBens/' + id);
  }

  //Put RevenusBen

  PutRevenusBenObservable(tache: RevenusBen, Id: number) {
    return this.http.put<RevenusBen>(this.rootURL + '/RevenusBens/' + Id, tache, this.headers);
  }

  PutRevenusBen(Id) {
    return this.http.put(this.rootURL + '/RevenusBens/' + this.formData.id, this.formData, this.headers);
  }

  //Get RevenusBen By Id

  GetById(Id) {
    return this.http.get<RevenusBen>(this.rootURL + '/RevenusBens/' + Id);
  }
}
