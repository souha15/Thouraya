import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EtatCompte } from '../../Models/Comptes/etat-compte.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtatCompteService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: EtatCompte
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create EtatCompte

  Add(EtatCompte: EtatCompte) {
    return this.http.post<EtatCompte>(this.rootURL + '/EtatComptes', EtatCompte, this.headers);
  }

  PutObservableE(Transaction: EtatCompte) {
    return this.http.put<EtatCompte>(this.rootURL + '/EtatComptes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/EtatComptes', this.formData, this.headers);
  }

  //Get EtatCompte List

  Get(): Observable<EtatCompte[]> {
    return this.http.get<EtatCompte[]>(this.rootURL + '/EtatComptes');
  }

  //Get EtatCompte By Id

  GetById(Id) {
    return this.http.get<EtatCompte>(this.rootURL + '/EtatComptes/' + Id);
  }

  //Edit EtatCompte

  Edit() {
    return this.http.put(this.rootURL + '/EtatComptes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete EtatCompte

  Delete(id) {
    return this.http.delete(this.rootURL + '/EtatComptes/' + id);
  }
}
