import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Visite } from '../../../Models/MediaCenter/Visite/visite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VisiteService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Visite;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Visite) {
    return this.http.put<Visite>(this.rootURL + '/visites/' + Transaction.id, Transaction, this.headers);

  }
  //Create Visite

  Create(tache: Visite) {
    return this.http.post<Visite>(this.rootURL + '/visites', tache, this.headers);
  }

  //Edit Visite
  Edit() {
    return this.http.put(this.rootURL + '/visites/' + this.formData.id, this.formData, this.headers);
  }

  // List Visite

  List(): Observable<Visite[]> {
    return this.http.get<Visite[]>(this.rootURL + '/visites');
  }

  //Delete Visite

  Delete(id) {
    return this.http.delete(this.rootURL + '/visites/' + id);
  }

  //Put Visite


  Put(Id) {
    return this.http.put(this.rootURL + '/visites/' + this.formData.id, this.formData, this.headers);
  }

  //Get Visite By Id

  GetById(Id) {
    return this.http.get<Visite>(this.rootURL + '/visites/' + Id);
  }
}
