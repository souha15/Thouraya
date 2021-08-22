import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewFormation } from '../../Models/ServiceRh/new-formation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewFormationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: NewFormation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create NewFormation

  Add(NewFormation: NewFormation) {
    return this.http.post<NewFormation>(this.rootURL + '/newFormationRequests', NewFormation, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/newFormationRequests', this.formData, this.headers);
  }

  PutObservableE(Transaction: NewFormation) {
    return this.http.put<NewFormation>(this.rootURL + '/newFormationRequests/' + Transaction.id, Transaction, this.headers);

  }
  //Get NewFormation List

  Get(): Observable<NewFormation[]> {
    return this.http.get<NewFormation[]>(this.rootURL + '/newFormationRequests');
  }

  //Get NewFormation By Id

  GetById(Id) {
    return this.http.get<NewFormation>(this.rootURL + '/newFormationRequests/' + Id);
  }

  //Edit NewFormation

  Edit() {
    return this.http.put(this.rootURL + '/newFormationRequests/' + this.formData.id, this.formData, this.headers);
  }


  //Delete NewFormation

  Delete(id) {
    return this.http.delete(this.rootURL + '/newFormationRequests/' + id);
  }
}
