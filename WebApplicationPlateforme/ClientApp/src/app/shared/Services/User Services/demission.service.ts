import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Demissioon } from '../../Models/User Services/demissioon.model';

@Injectable({
  providedIn: 'root'
})
export class DemissionService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Demissioon;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Demissioon

  Add(Demissioon: Demissioon) {
    return this.http.post<Demissioon>(this.rootURL + '/Demissions', Demissioon, this.headers);
  }

  PutObservableE(Transaction: Demissioon) {
    return this.http.put<Demissioon>(this.rootURL + '/Demissions/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/Demissions', this.formData, this.headers);
  }

  //Get Demissioon List

  Get(): Observable<Demissioon[]> {
    return this.http.get<Demissioon[]>(this.rootURL + '/Demissions');
  }

  //Get Demissioon By Id

  GetById(Id) {
    return this.http.get<Demissioon>(this.rootURL + '/Demissions/' + Id);
  }

  //Edit Demissioon

  Edit() {
    return this.http.put(this.rootURL + '/Demissions/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Demissioon

  Delete(id) {
    return this.http.delete(this.rootURL + '/Demissions/' + id);
  }
}
