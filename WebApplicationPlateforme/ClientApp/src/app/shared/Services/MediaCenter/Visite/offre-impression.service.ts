import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OffreImpression } from '../../../Models/MediaCenter/Visite/offre-impression.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreImpressionService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: OffreImpression;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: OffreImpression) {
    return this.http.put<OffreImpression>(this.rootURL + '/offreImpressions/' + Transaction.id, Transaction, this.headers);

  }
  //Create OffreImpression

  Create(tache: OffreImpression) {
    return this.http.post<OffreImpression>(this.rootURL + '/offreImpressions', tache, this.headers);
  }

  //Edit OffreImpression
  Edit() {
    return this.http.put(this.rootURL + '/offreImpressions/' + this.formData.id, this.formData, this.headers);
  }

  // List OffreImpression

  List(): Observable<OffreImpression[]> {
    return this.http.get<OffreImpression[]>(this.rootURL + '/offreImpressions');
  }

  //Delete OffreImpression

  Delete(id) {
    return this.http.delete(this.rootURL + '/offreImpressions/' + id);
  }

  //Put OffreImpression


  Put(Id) {
    return this.http.put(this.rootURL + '/offreImpressions/' + this.formData.id, this.formData, this.headers);
  }

  //Get OffreImpression By Id

  GetById(Id) {
    return this.http.get<OffreImpression>(this.rootURL + '/offreImpressions/' + Id);
  }
}
