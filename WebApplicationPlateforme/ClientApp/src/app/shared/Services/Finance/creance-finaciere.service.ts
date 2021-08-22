import { Injectable } from '@angular/core';
import { CreanceFinanciere } from '../../Models/Finance/creance-financiere.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreanceFinaciereService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: CreanceFinanciere;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: CreanceFinanciere) {
    return this.http.post<CreanceFinanciere>(this.rootURL + '/CreanceFinancieres', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/CreanceFinancieres', this.formData, this.headers);
  }

  PutObservableE(Transaction: CreanceFinanciere) {
    return this.http.put<CreanceFinanciere>(this.rootURL + '/CreanceFinancieres/' + Transaction.id, Transaction, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<CreanceFinanciere[]> {
    return this.http.get<CreanceFinanciere[]>(this.rootURL + '/CreanceFinancieres');
  }

  Get() {
    return this.http.get<CreanceFinanciere[]>(this.rootURL + '/CreanceFinancieres');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<CreanceFinanciere>(this.rootURL + '/CreanceFinancieres/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/CreanceFinancieres/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/CreanceFinancieres/' + id);
  }
}


