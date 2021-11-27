import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Decisif } from '../../Models/Decisions/decisif.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecisifsService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Decisif;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Decisif) {
    return this.http.put<Decisif>(this.rootURL + '/DecisionDecisifs/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: Decisif) {
    return this.http.post<Decisif>(this.rootURL + '/DecisionDecisifs', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/DecisionDecisifs/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<Decisif[]> {
    return this.http.get<Decisif[]>(this.rootURL + '/DecisionDecisifs');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/DecisionDecisifs/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/DecisionDecisifs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<Decisif>(this.rootURL + '/DecisionDecisifs/' + Id);
  }
}
