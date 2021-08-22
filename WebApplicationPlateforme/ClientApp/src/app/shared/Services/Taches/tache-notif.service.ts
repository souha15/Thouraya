import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TacheNotif } from '../../Models/Taches/tache-notif.model';

@Injectable({
  providedIn: 'root'
})
export class TacheNotifService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TacheNotif;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: TacheNotif) {
    return this.http.put<TacheNotif>(this.rootURL + '/Notiftaches/' + Transaction.id, Transaction, this.headers);

  }
  //Create Tache

  CreateTache(tache: TacheNotif) {
    return this.http.post<TacheNotif>(this.rootURL + '/Notiftaches', tache, this.headers);
  }

  //Edit Tache
  EditTache() {
    return this.http.put(this.rootURL + '/Notiftaches/' + this.formData.id, this.formData, this.headers);
  }

  // List Tache

  ListTache(): Observable<TacheNotif[]> {
    return this.http.get<TacheNotif[]>(this.rootURL + '/Notiftaches');
  }

  //Delete Tache

  DeleteTache(id) {
    return this.http.delete(this.rootURL + '/Notiftaches/' + id);
  }

  //Put Tache

  PutTacheObservable(tache: TacheNotif, Id: number) {
    return this.http.put<TacheNotif>(this.rootURL + '/Notiftaches/' + Id, tache, this.headers);
  }

  PutTache(Id) {
    return this.http.put(this.rootURL + '/Notiftaches/' + this.formData.id, this.formData, this.headers);
  }

  //Get Tache By Id

  GetById(Id) {
    return this.http.get<TacheNotif>(this.rootURL + '/Notiftaches/' + Id);
  }
}
