import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PayementProjet } from '../../Models/Projet/payement-projet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PayementProjetService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: PayementProjet
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create PayementProjet

  Add(PayementProjet: PayementProjet) {
    return this.http.post<PayementProjet>(this.rootURL + '/PayementProjets', PayementProjet, this.headers);
  }

  PutObservableE(Transaction: PayementProjet) {
    return this.http.put<PayementProjet>(this.rootURL + '/PayementProjets/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/PayementProjets', this.formData, this.headers);
  }

  //Get PayementProjet List

  Get(): Observable<PayementProjet[]> {
    return this.http.get<PayementProjet[]>(this.rootURL + '/PayementProjets');
  }

  //Get PayementProjet By Id

  GetById(Id) {
    return this.http.get<PayementProjet>(this.rootURL + '/PayementProjets/' + Id);
  }

  //Edit PayementProjet

  Edit() {
    return this.http.put(this.rootURL + '/PayementProjets/' + this.formData.id, this.formData, this.headers);
  }


  //Delete PayementProjet

  Delete(id) {
    return this.http.delete(this.rootURL + '/PayementProjets/' + id);
  }

}
