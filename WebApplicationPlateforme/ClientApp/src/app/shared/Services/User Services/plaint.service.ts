import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plaint } from '../../Models/User Services/plaint.model';


@Injectable({
  providedIn: 'root'
})
export class PlaintService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Plaint;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Plaint

  Add(Plaint: Plaint) {
    return this.http.post<Plaint>(this.rootURL + '/Plaints', Plaint, this.headers);
  }

  PutObservableE(Transaction: Plaint) {
    return this.http.put<Plaint>(this.rootURL + '/Plaints/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/Plaints', this.formData, this.headers);
  }

  //Get Plaint List

  Get(): Observable<Plaint[]> {
    return this.http.get<Plaint[]>(this.rootURL + '/Plaints');
  }

  //Get Plaint By Id

  GetById(Id) {
    return this.http.get<Plaint>(this.rootURL + '/Plaints/' + Id);
  }

  //Edit Plaint

  Edit() {
    return this.http.put(this.rootURL + '/Plaints/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Plaint

  Delete(id) {
    return this.http.delete(this.rootURL + '/Plaints/' + id);
  }
}
