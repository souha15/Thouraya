import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Tache } from '../../Models/Taches/tache.model';
import { Observable } from 'rxjs';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TacheService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Tache;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Tache) {
    return this.http.put<Tache>(this.rootURL + '/Taches/' + Transaction.id, Transaction, this.headers);

  }
  //Create Tache

  CreateTache(tache: Tache) {
    return this.http.post<Tache>(this.rootURL + '/Taches', tache, this.headers);
  }

  //Edit Tache
  EditTache() {
    return this.http.put(this.rootURL + '/Taches/' + this.formData.id, this.formData, this.headers);
  }

  // List Tache

  ListTache(): Observable<Tache[]> {
    return this.http.get<Tache[]>(this.rootURL + '/Taches');
  }

  //Delete Tache

  DeleteTache(id) {
    return this.http.delete(this.rootURL + '/Taches/' + id);
  }

  //Put Tache

  PutTacheObservable(tache: Tache , Id:number) {
    return this.http.put<Tache>(this.rootURL + '/Taches/' + Id, tache, this.headers);
  }

  PutTache(Id) {
    return this.http.put(this.rootURL + '/Taches/' + this.formData.id, this.formData, this.headers);
  }

  //Get Tache By Id

  GetById(Id) {
    return this.http.get<Tache>(this.rootURL + '/Taches/' + Id);
  }
}
