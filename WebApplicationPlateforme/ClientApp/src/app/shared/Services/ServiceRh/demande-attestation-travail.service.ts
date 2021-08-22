import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { DemandeAttestationTravail } from '../../Models/ServiceRh/demande-attestation-travail.model';

@Injectable({
  providedIn: 'root'
})
export class DemandeAttestationTravailService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemandeAttestationTravail;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DemandeAttestationTravail

  Add(DemandeAttestationTravail: DemandeAttestationTravail) {
    return this.http.post<DemandeAttestationTravail>(this.rootURL + '/DemandeAttestationTravails', DemandeAttestationTravail, this.headers);
  }

  PutObservableE(Transaction: DemandeAttestationTravail) {
    return this.http.put<DemandeAttestationTravail>(this.rootURL + '/DemandeAttestationTravails/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/DemandeAttestationTravails', this.formData, this.headers);
  }

  //Get DemandeAttestationTravail List

  Get(): Observable<DemandeAttestationTravail[]> {
    return this.http.get<DemandeAttestationTravail[]>(this.rootURL + '/DemandeAttestationTravails');
  }

  //Get DemandeAttestationTravail By Id

  GetById(Id) {
    return this.http.get<DemandeAttestationTravail>(this.rootURL + '/DemandeAttestationTravails/' + Id);
  }

  //Edit DemandeAttestationTravail

  Edit() {
    return this.http.put(this.rootURL + '/DemandeAttestationTravails/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DemandeAttestationTravail

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandeAttestationTravails/' + id);
  }
}
