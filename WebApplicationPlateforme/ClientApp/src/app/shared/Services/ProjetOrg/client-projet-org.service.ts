import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjetClient } from '../../Models/ProjetOrg/projet-client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientProjetClientOrgService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ProjetClient;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ProjetClient

  Add(ProjetClient: ProjetClient) {
    return this.http.post<ProjetClient>(this.rootURL + '/ProjetClients', ProjetClient, this.headers);
  }

  PutObservableE(Transaction: ProjetClient) {
    return this.http.put<ProjetClient>(this.rootURL + '/ProjetClients/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ProjetClients', this.formData, this.headers);
  }

  //Get ProjetClient List

  Get(): Observable<ProjetClient[]> {
    return this.http.get<ProjetClient[]>(this.rootURL + '/ProjetClients');
  }

  //Get ProjetClient By Id

  GetById(Id) {
    return this.http.get<ProjetClient>(this.rootURL + '/ProjetClients/' + Id);
  }

  //Edit ProjetClient

  Edit() {
    return this.http.put(this.rootURL + '/ProjetClients/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ProjetClient

  Delete(id) {
    return this.http.delete(this.rootURL + '/ProjetClients/' + id);
  }

}
