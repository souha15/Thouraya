import { Injectable } from '@angular/core';
import { Pointage } from '../../Models/Pointage/pointage.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PointageService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Pointage;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Pointage

  Add(Pointage: Pointage) {
    return this.http.post<Pointage>(this.rootURL + '/PointageUsers', Pointage, this.headers);
  }

  PutObservableE(Transaction: Pointage) {
    return this.http.put<Pointage>(this.rootURL + '/PointageUsers/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/PointageUsers', this.formData, this.headers);
  }

  //Get Pointage List

  Get(): Observable<Pointage[]> {
    return this.http.get<Pointage[]>(this.rootURL + '/PointageUsers');
  }

  //Get Pointage By Id

  GetById(Id) {
    return this.http.get<Pointage>(this.rootURL + '/PointageUsers/' + Id);
  }

  //Edit Pointage

  Edit() {
    return this.http.put(this.rootURL + '/PointageUsers/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Pointage

  Delete(id) {
    return this.http.delete(this.rootURL + '/PointageUsers/' + id);
  }
}
