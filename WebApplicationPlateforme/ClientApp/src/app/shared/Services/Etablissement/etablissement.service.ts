import { Injectable } from '@angular/core';
import { Etablissement } from '../../Models/Etablissement/etablissement.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EtablissementService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Etablissement;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Etablissement

  AddEtablissement(administration: Etablissement) {
    return this.http.post<Etablissement>(this.rootURL + '/Departements', administration, this.headers);
  }

  //Edit Etablissement

  EditEtablissement() {
    return this.http.put(this.rootURL + '/Departements/' + this.formData.id, this.formData, this.headers);
  }

  //list of Etablissement

  ListEtablissement(): Observable<Etablissement[]> {
    return this.http.get<Etablissement[]>(this.rootURL + '/Departements');
  }

  //Get Administration By Id

  GetById(id) {
    return this.http.get<Etablissement>(this.rootURL + '/Departements/' + id);
  }

  //Delete Administration

  DeleteEtablissement(id) {
    return this.http.delete(this.rootURL + '/Departements/' + id);
  }

  PutObservable(Transaction: Etablissement) {
    return this.http.put<Etablissement>(this.rootURL + '/Departements/' + Transaction.id, Transaction, this.headers);
  }
}
