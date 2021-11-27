import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Commun } from '../../Models/Decisions/commun.model';

@Injectable({
  providedIn: 'root'
})
export class CommunsService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Commun;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Commun) {
    return this.http.put<Commun>(this.rootURL + '/DecissionCommuns/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: Commun) {
    return this.http.post<Commun>(this.rootURL + '/DecissionCommuns', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/DecissionCommuns/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<Commun[]> {
    return this.http.get<Commun[]>(this.rootURL + '/DecissionCommuns');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/DecissionCommuns/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/DecissionCommuns/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<Commun>(this.rootURL + '/DecissionCommuns/' + Id);
  }
}
