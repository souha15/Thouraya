import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DemandeSuppHeure } from '../../Models/ServiceRh/demande-supp-heure.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';

@Injectable({
  providedIn: 'root'
})
export class DemandeSuppHeureService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemandeSuppHeure;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create DemandeSuppHeure

  Add(DemandeSuppHeure: DemandeSuppHeure) {
    return this.http.post<DemandeSuppHeure>(this.rootURL + '/DemandeSupHeures', DemandeSuppHeure, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/DemandeSupHeures', this.formData, this.headers);
  }

  PutObservableE(Transaction: DemandeSuppHeure) {
    return this.http.put<DemandeSuppHeure>(this.rootURL + '/DemandeSupHeures/' + Transaction.id, Transaction, this.headers);

  }

  //Get DemandeSuppHeure List

  Get(): Observable<DemandeSuppHeure[]> {
    return this.http.get<DemandeSuppHeure[]>(this.rootURL + '/DemandeSupHeures');
  }

  //Get DemandeSuppHeure By Id

  GetById(Id) {
    return this.http.get<DemandeSuppHeure>(this.rootURL + '/DemandeSupHeures/' + Id);
  }

  //Edit DemandeSuppHeure

  Edit() {
    return this.http.put(this.rootURL + '/DemandeSupHeures/' + this.formData.id, this.formData, this.headers);
  }


  //Delete DemandeSuppHeure

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandeSupHeures/' + id);
  }
}
