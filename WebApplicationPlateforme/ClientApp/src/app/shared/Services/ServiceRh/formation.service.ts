import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Formation } from '../../Models/ServiceRh/formation.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Formation;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Formation

  Add(Formation: Formation) {
    return this.http.post<Formation>(this.rootURL + '/Formations', Formation, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/Formations', this.formData, this.headers);
  }

  //Get Formation List

  Get(): Observable<Formation[]> {
    return this.http.get<Formation[]>(this.rootURL + '/Formations');
  }

  //Get Formation By Id

  GetById(Id) {
    return this.http.get<Formation>(this.rootURL + '/Formations/' + Id);
  }

  //Edit Formation

  Edit() {
    return this.http.put(this.rootURL + '/Formations/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Formation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Formations/' + id);
  }
}
