import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Exthechnique } from '../../../Models/MediaCenter/ExtensionTechnique/exthechnique.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExthechniqueService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Exthechnique;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Exthechnique) {
    return this.http.put<Exthechnique>(this.rootURL + '/Exthechniques/' + Transaction.id, Transaction, this.headers);

  }
  //Create Exthechnique

  CreateExthechnique(tache: Exthechnique) {
    return this.http.post<Exthechnique>(this.rootURL + '/Exthechniques', tache, this.headers);
  }

  //Edit Exthechnique
  EditExthechnique() {
    return this.http.put(this.rootURL + '/Exthechniques/' + this.formData.id, this.formData, this.headers);
  }

  // List Exthechnique

  ListExthechnique(): Observable<Exthechnique[]> {
    return this.http.get<Exthechnique[]>(this.rootURL + '/Exthechniques');
  }

  //Delete Exthechnique

  DeleteExthechnique(id) {
    return this.http.delete(this.rootURL + '/Exthechniques/' + id);
  }

  //Put Exthechnique


  PutExthechnique(Id) {
    return this.http.put(this.rootURL + '/Exthechniques/' + this.formData.id, this.formData, this.headers);
  }

  //Get Exthechnique By Id

  GetById(Id) {
    return this.http.get<Exthechnique>(this.rootURL + '/Exthechniques/' + Id);
  }
}
