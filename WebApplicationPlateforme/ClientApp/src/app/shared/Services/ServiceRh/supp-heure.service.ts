import { Injectable } from '@angular/core';
import { SuppHeure } from '../../Models/ServiceRh/supp-heure.model';
import { Observable } from 'rxjs';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SuppHeureService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: SuppHeure;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create SuppHeure

  Add(SuppHeure: SuppHeure) {
    return this.http.post<SuppHeure>(this.rootURL + '/SupHeures', SuppHeure, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/SupHeures', this.formData, this.headers);
  }

  //Get SuppHeure List

  Get(): Observable<SuppHeure[]> {
    return this.http.get<SuppHeure[]>(this.rootURL + '/SupHeures');
  }

  //Get SuppHeure By Id

  GetById(Id) {
    return this.http.get<SuppHeure>(this.rootURL + '/SupHeures/' + Id);
  }

  //Edit SuppHeure

  Edit() {
    return this.http.put(this.rootURL + '/SupHeures/' + this.formData.id, this.formData, this.headers);
  }


  //Delete SuppHeure

  Delete(id) {
    return this.http.delete(this.rootURL + '/SupHeures/' + id);
  }
}
