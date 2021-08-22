import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RecueDons } from '../../Models/Dons/recue-dons.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecueDonsService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: RecueDons;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: RecueDons) {
    return this.http.post<RecueDons>(this.rootURL + '/RecueDons', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/RecueDons', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<RecueDons[]> {
    return this.http.get<RecueDons[]>(this.rootURL + '/RecueDons');
  }

  Get() {
    return this.http.get<RecueDons[]>(this.rootURL + '/RecueDons');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<RecueDons>(this.rootURL + '/RecueDons/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/RecueDons/' + this.formData.id, this.formData, this.headers);
  }

  PutObservableE(Transaction: RecueDons) {
    return this.http.put<RecueDons>(this.rootURL + '/RecueDons/' + Transaction.id, Transaction, this.headers);
  }



  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/RecueDons/' + id);
  }
}


