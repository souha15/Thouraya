import { Injectable } from '@angular/core';
import { Priv } from '../../Models/RH/priv.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PrivRequestService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Priv;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Priv) {
    return this.http.post<Priv>(this.rootURL + '/PrivelegesRequests', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/PrivelegesRequests', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Priv[]> {
    return this.http.get<Priv[]>(this.rootURL + '/PrivelegesRequests');
  }

  Get() {
    return this.http.get<Priv[]>(this.rootURL + '/PrivelegesRequests');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Priv>(this.rootURL + '/PrivelegesRequests/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/PrivelegesRequests/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Priv/' + id);
  }
}

