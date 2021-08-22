import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjetOrg } from '../../Models/ProjetOrg/projet-org.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetOrgService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ProjetOrg;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Projet

  Add(Projet: ProjetOrg) {
    return this.http.post<ProjetOrg>(this.rootURL + '/ProjetOrgs', Projet, this.headers);
  }

  PutObservableE(Transaction: ProjetOrg) {
    return this.http.put<ProjetOrg>(this.rootURL + '/ProjetOrgs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ProjetOrgs', this.formData, this.headers);
  }

  //Get Projet List

  Get(): Observable<ProjetOrg[]> {
    return this.http.get<ProjetOrg[]>(this.rootURL + '/ProjetOrgs');
  }

  //Get Projet By Id

  GetById(Id) {
    return this.http.get<ProjetOrg>(this.rootURL + '/ProjetOrgs/' + Id);
  }

  //Edit Projet

  Edit() {
    return this.http.put(this.rootURL + '/ProjetOrgs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Projet

  Delete(id) {
    return this.http.delete(this.rootURL + '/ProjetOrgs/' + id);
  }

}
