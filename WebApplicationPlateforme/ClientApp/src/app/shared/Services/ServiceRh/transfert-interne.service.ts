import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TransfertInterne } from '../../Models/ServiceRh/transfert-interne.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransfertInterneService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TransfertInterne;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TransfertInterne

  Add(TransfertInterne: TransfertInterne) {
    return this.http.post<TransfertInterne>(this.rootURL + '/TransfertInternes', TransfertInterne, this.headers);
  }

  PutObservableE(Transaction: TransfertInterne) {
    return this.http.put<TransfertInterne>(this.rootURL + '/TransfertInternes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/TransfertInternes', this.formData, this.headers);
  }

  //Get TransfertInterne List

  Get(): Observable<TransfertInterne[]> {
    return this.http.get<TransfertInterne[]>(this.rootURL + '/TransfertInternes');
  }

  //Get TransfertInterne By Id

  GetById(Id) {
    return this.http.get<TransfertInterne>(this.rootURL + '/TransfertInternes/' + Id);
  }

  //Edit TransfertInterne

  Edit() {
    return this.http.put(this.rootURL + '/TransfertInternes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete TransfertInterne

  Delete(id) {
    return this.http.delete(this.rootURL + '/TransfertInternes/' + id);
  }
}
