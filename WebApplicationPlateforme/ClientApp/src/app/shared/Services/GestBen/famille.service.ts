import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Famille } from '../../Models/GestBen/famille.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilleService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Famille;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Famille) {
    return this.http.put<Famille>(this.rootURL + '/Familles/' + Transaction.id, Transaction, this.headers);

  }
  //Create Famille

  CreateFamille(tache: Famille) {
    return this.http.post<Famille>(this.rootURL + '/Familles', tache, this.headers);
  }

  //Edit Famille
  EditFamille() {
    return this.http.put(this.rootURL + '/Familles/' + this.formData.id, this.formData, this.headers);
  }

  // List Famille

  ListFamille(): Observable<Famille[]> {
    return this.http.get<Famille[]>(this.rootURL + '/Familles');
  }

  //Delete Famille

  DeleteFamille(id) {
    return this.http.delete(this.rootURL + '/Familles/' + id);
  }

  //Put Famille

  PutFamilleObservable(tache: Famille, Id: number) {
    return this.http.put<Famille>(this.rootURL + '/Familles/' + Id, tache, this.headers);
  }

  PutFamille(Id) {
    return this.http.put(this.rootURL + '/Familles/' + this.formData.id, this.formData, this.headers);
  }

  //Get Famille By Id

  GetById(Id) {
    return this.http.get<Famille>(this.rootURL + '/Familles/' + Id);
  }
}
