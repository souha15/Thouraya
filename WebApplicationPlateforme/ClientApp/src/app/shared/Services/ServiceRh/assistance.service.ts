import { Injectable } from '@angular/core';
import { Assistance } from '../../Models/ServiceRh/assistance.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AssistanceService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Assistance;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Assistance

  Add(Assistance: Assistance) {
    return this.http.post<Assistance>(this.rootURL + '/Assistances', Assistance, this.headers);
  }

  PutObservableE(Transaction: Assistance) {
    return this.http.put<Assistance>(this.rootURL + '/Assistances/' + Transaction.id, Transaction, this.headers);

  }

  Post() {
    return this.http.post(this.rootURL + '/Assistances', this.formData, this.headers);
  }

  //Get Assistance List

  Get(): Observable<Assistance[]> {
    return this.http.get<Assistance[]>(this.rootURL + '/Assistances');
  }

  //Get Assistance By Id

  GetById(Id) {
    return this.http.get<Assistance>(this.rootURL + '/Assistances/' + Id);
  }

  //Edit Assistance

  Edit() {
    return this.http.put(this.rootURL + '/Assistances/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Assistance

  Delete(id) {
    return this.http.delete(this.rootURL + '/Assistances/' + id);
  }
}
