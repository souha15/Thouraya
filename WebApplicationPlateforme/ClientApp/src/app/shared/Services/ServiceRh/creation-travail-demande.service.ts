import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CrationTravailDemande } from '../../Models/ServiceRh/cration-travail-demande.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreationTravailDemandeService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: CrationTravailDemande;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create CrationTravailDemande

  Add(CrationTravailDemande: CrationTravailDemande) {
    return this.http.post<CrationTravailDemande>(this.rootURL + '/CreationTravailDemandes', CrationTravailDemande, this.headers);
  }

  PutObservableE(Transaction: CrationTravailDemande) {
    return this.http.put<CrationTravailDemande>(this.rootURL + '/CreationTravailDemandes/' + Transaction.id, Transaction, this.headers);

  }

  Post() {
    return this.http.post(this.rootURL + '/CreationTravailDemandes', this.formData, this.headers);
  }

  //Get CrationTravailDemande List

  Get(): Observable<CrationTravailDemande[]> {
    return this.http.get<CrationTravailDemande[]>(this.rootURL + '/CreationTravailDemandes');
  }

  //Get CrationTravailDemande By Id

  GetById(Id) {
    return this.http.get<CrationTravailDemande>(this.rootURL + '/CreationTravailDemandes/' + Id);
  }

  //Edit CrationTravailDemande

  Edit() {
    return this.http.put(this.rootURL + '/CreationTravailDemandes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete CrationTravailDemande

  Delete(id) {
    return this.http.delete(this.rootURL + '/CreationTravailDemandes/' + id);
  }
}
