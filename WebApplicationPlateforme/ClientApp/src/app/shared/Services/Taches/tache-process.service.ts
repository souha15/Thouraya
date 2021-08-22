import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TacheProcess } from '../../Models/Taches/tache-process.model';
@Injectable({
  providedIn: 'root'
})
export class TacheProcessService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TacheProcess;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: TacheProcess) {
    return this.http.put<TacheProcess>(this.rootURL + '/ProcessTaches/' + Transaction.id, Transaction, this.headers);

  }
  //Create Tache

  CreateTache(tache: TacheProcess) {
    return this.http.post<TacheProcess>(this.rootURL + '/ProcessTaches', tache, this.headers);
  }

  //Edit Tache
  EditTache() {
    return this.http.put(this.rootURL + '/ProcessTaches/' + this.formData.id, this.formData, this.headers);
  }

  // List Tache

  ListTache(): Observable<TacheProcess[]> {
    return this.http.get<TacheProcess[]>(this.rootURL + '/ProcessTaches');
  }

  //Delete Tache

  DeleteTache(id) {
    return this.http.delete(this.rootURL + '/ProcessTaches/' + id);
  }

  //Put Tache

  PutTacheObservable(tache: TacheProcess, Id: number) {
    return this.http.put<TacheProcess>(this.rootURL + '/ProcessTaches/' + Id, tache, this.headers);
  }

  PutTache(Id) {
    return this.http.put(this.rootURL + '/ProcessTaches/' + this.formData.id, this.formData, this.headers);
  }

  //Get Tache By Id

  GetById(Id) {
    return this.http.get<TacheProcess>(this.rootURL + '/ProcessTaches/' + Id);
  }
}
