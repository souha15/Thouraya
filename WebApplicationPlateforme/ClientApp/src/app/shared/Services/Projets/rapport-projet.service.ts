import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RapportProjet } from '../../Models/Projet/rapport-projet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RapportProjetService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: RapportProjet
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create RapportProjet

  Add(RapportProjet: RapportProjet) {
    return this.http.post<RapportProjet>(this.rootURL + '/RapportProjets', RapportProjet, this.headers);
  }

  PutObservableE(Transaction: RapportProjet) {
    return this.http.put<RapportProjet>(this.rootURL + '/RapportProjets/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/RapportProjets', this.formData, this.headers);
  }

  //Get RapportProjet List

  Get(): Observable<RapportProjet[]> {
    return this.http.get<RapportProjet[]>(this.rootURL + '/RapportProjets');
  }

  //Get RapportProjet By Id

  GetById(Id) {
    return this.http.get<RapportProjet>(this.rootURL + '/RapportProjets/' + Id);
  }

  //Edit RapportProjet

  Edit() {
    return this.http.put(this.rootURL + '/RapportProjets/' + this.formData.id, this.formData, this.headers);
  }


  //Delete RapportProjet

  Delete(id) {
    return this.http.delete(this.rootURL + '/RapportProjets/' + id);
  }

}
