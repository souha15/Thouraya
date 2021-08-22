import { Injectable } from '@angular/core';
import { Voiture } from '../../Models/voiture/voiture.model';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';

@Injectable({
  providedIn: 'root'
})
export class VoitureService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Voiture;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Voiture) {
    return this.http.post<Voiture>(this.rootURL + '/voitures', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/voitures', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Voiture[]> {
    return this.http.get<Voiture[]>(this.rootURL + '/voitures');
  }

  Get() {
    return this.http.get<Voiture[]>(this.rootURL + '/voitures');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Voiture>(this.rootURL + '/voitures/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/voitures/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Voiture/' + id);
  }
}

