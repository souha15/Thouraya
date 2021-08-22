import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CompteBen } from '../../Models/GestBen/compte-ben.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompteBenService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: CompteBen;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: CompteBen) {
    return this.http.put<CompteBen>(this.rootURL + '/CompteBens/' + Transaction.id, Transaction, this.headers);

  }
  //Create CompteBen

  CreateCompteBen(tache: CompteBen) {
    return this.http.post<CompteBen>(this.rootURL + '/CompteBens', tache, this.headers);
  }

  //Edit CompteBen
  EditCompteBen() {
    return this.http.put(this.rootURL + '/CompteBens/' + this.formData.id, this.formData, this.headers);
  }

  // List CompteBen

  ListCompteBen(): Observable<CompteBen[]> {
    return this.http.get<CompteBen[]>(this.rootURL + '/CompteBens');
  }

  //Delete CompteBen

  DeleteCompteBen(id) {
    return this.http.delete(this.rootURL + '/CompteBens/' + id);
  }

  //Put CompteBen

  PutCompteBenObservable(tache: CompteBen, Id: number) {
    return this.http.put<CompteBen>(this.rootURL + '/CompteBens/' + Id, tache, this.headers);
  }

  PutCompteBen(Id) {
    return this.http.put(this.rootURL + '/CompteBens/' + this.formData.id, this.formData, this.headers);
  }

  //Get CompteBen By Id

  GetById(Id) {
    return this.http.get<CompteBen>(this.rootURL + '/CompteBens/' + Id);
  }
}
