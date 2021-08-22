import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Conge } from '../../Models/RH/conge.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CongeService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Conge;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Conge) {
    return this.http.post<Conge>(this.rootURL + '/Conges', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Conges', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.rootURL + '/Conges');
  }

  Get() {
    return this.http.get<Conge[]>(this.rootURL + '/Conges');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Conge>(this.rootURL + '/Conges/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Conges/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Conges/' + id);
  }
}

