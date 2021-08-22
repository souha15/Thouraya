import { Injectable } from '@angular/core';
import { DemandeFormation } from '../../Models/ServiceRh/demande-formation.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeFormationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemandeFormation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DemandeFormation

  Add(DemandeFormation: DemandeFormation) {
    return this.http.post<DemandeFormation>(this.rootURL + '/DemandeFormations', DemandeFormation, this.headers);
  }

  PutObservableE(Transaction: DemandeFormation) {
    return this.http.put<DemandeFormation>(this.rootURL + '/DemandeFormations/' + Transaction.id, Transaction, this.headers);

  }

  Post() {
    return this.http.post(this.rootURL + '/DemandeFormations', this.formData, this.headers);
  }

  //Get DemandeFormation List

  Get(): Observable<DemandeFormation[]> {
    return this.http.get<DemandeFormation[]>(this.rootURL + '/DemandeFormations');
  }

  //Get DemandeFormation By Id

  GetById(Id) {
    return this.http.get<DemandeFormation>(this.rootURL + '/DemandeFormations/' + Id);
  }

  //Edit DemandeFormation

  Edit() {
    return this.http.put(this.rootURL + '/DemandeFormations/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DemandeFormation

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandeFormations/' + id);
  }
}
