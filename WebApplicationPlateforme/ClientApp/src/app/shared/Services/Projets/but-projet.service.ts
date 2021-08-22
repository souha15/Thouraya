import { Injectable } from '@angular/core';
import { ButProjet } from '../../Models/Projet/but-projet.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ButProjetService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ButProjet
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ButProjet

  Add(ButProjet: ButProjet) {
    return this.http.post<ButProjet>(this.rootURL + '/ButProjets', ButProjet, this.headers);
  }

  PutObservableE(Transaction: ButProjet) {
    return this.http.put<ButProjet>(this.rootURL + '/ButProjets/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ButProjets', this.formData, this.headers);
  }

  //Get ButProjet List

  Get(): Observable<ButProjet[]> {
    return this.http.get<ButProjet[]>(this.rootURL + '/ButProjets');
  }

  //Get ButProjet By Id

  GetById(Id) {
    return this.http.get<ButProjet>(this.rootURL + '/ButProjets/' + Id);
  }

  //Edit ButProjet

  Edit() {
    return this.http.put(this.rootURL + '/ButProjets/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ButProjet

  Delete(id) {
    return this.http.delete(this.rootURL + '/ButProjets/' + id);
  }

}
