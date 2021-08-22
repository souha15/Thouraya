import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Depenses } from '../../Models/Evenements/depenses.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Depenses;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Depenses

  Create(Depenses: Depenses) {
    return this.http.post<Depenses>(this.rootURL + '/DepensesEvs', Depenses, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/DepensesEvs', this.formData, this.headers);
  }

  //Edit Depenses
  Edit() {
    return this.http.put(this.rootURL + '/DepensesEvs/' + this.formData.id, this.formData, this.headers);
  }

  // List Depenses

  List(): Observable<Depenses[]> {
    return this.http.get<Depenses[]>(this.rootURL + '/DepensesEvs');
  }


  //Delete Depenses

  Delete(id) {
    return this.http.delete(this.rootURL + '/DepensesEvs/' + id);
  }

  //Put Depenses

  PutObservable(Depenses: Depenses) {
    return this.http.put<Depenses>(this.rootURL + '/DepensesEvs/' + Depenses.id, Depenses, this.headers);
  }

  PutObservableTr(Depenses: Depenses) {
    return this.http.put<Depenses>(this.rootURL + '/DepensesEvs/' + Depenses.id, Depenses, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/DepensesEvs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Depenses By Id

  GetById(Id) {
    return this.http.get<Depenses>(this.rootURL + '/DepensesEvs/' + Id);
  }

}
