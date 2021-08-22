import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SoldeTuteur } from '../../Models/Parrainage/solde-tuteur.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SoldeTuteurService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SoldeTuteur;
  
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create SoldeTuteur

  Add(SoldeTuteur: SoldeTuteur) {
    return this.http.post<SoldeTuteur>(this.rootURL + '/SoldeTuteurs', SoldeTuteur, this.headers);
  }

  PutObservableE(Transaction: SoldeTuteur) {
    return this.http.put<SoldeTuteur>(this.rootURL + '/SoldeTuteurs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/SoldeTuteurs', this.formData, this.headers);
  }

  //Get SoldeTuteur List

  Get(): Observable<SoldeTuteur[]> {
    return this.http.get<SoldeTuteur[]>(this.rootURL + '/SoldeTuteurs');
  }

  //Get SoldeTuteur By Id

  GetById(Id) {
    return this.http.get<SoldeTuteur>(this.rootURL + '/SoldeTuteurs/' + Id);
  }

  //Edit SoldeTuteur

  Edit() {
    return this.http.put(this.rootURL + '/SoldeTuteurs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete SoldeTuteur

  Delete(id) {
    return this.http.delete(this.rootURL + '/SoldeTuteurs/' + id);
  }
}
