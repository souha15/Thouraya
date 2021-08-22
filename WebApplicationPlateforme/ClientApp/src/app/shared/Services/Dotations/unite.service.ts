import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Unite } from '../../Models/Dotations/unite.model';

@Injectable({
  providedIn: 'root'
})
export class UniteService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Unite;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Unite

  Add(Unite: Unite) {
    return this.http.post<Unite>(this.rootURL + '/unites', Unite, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/unites', this.formData, this.headers);
  }

  //Get Unite List

  Get(): Observable<Unite[]> {
    return this.http.get<Unite[]>(this.rootURL + '/unites');
  }

  //Get Unite By Id

  GetById(Id) {
    return this.http.get<Unite>(this.rootURL + '/unites/' + Id);
  }

  //Edit Unite

  Edit() {
    return this.http.put(this.rootURL + '/unites/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Unite

  Delete(id) {
    return this.http.delete(this.rootURL + '/unites/' + id);
  }

  PutObservable(unite: Unite) {
    return this.http.put<Unite>(this.rootURL + '/unites/' + unite.id, unite, this.headers);
  }
}

