import { Injectable } from '@angular/core';
import { Equipement } from '../../Models/RH/equipement.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipementService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Equipement;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: Equipement) {
    return this.http.post<Equipement>(this.rootURL + '/Equipements', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/Equipements', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<Equipement[]> {
    return this.http.get<Equipement[]>(this.rootURL + '/Equipements');
  }

  Get() {
    return this.http.get<Equipement[]>(this.rootURL + '/Equipements');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<Equipement>(this.rootURL + '/Equipements/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/Equipements/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/Equipement/' + id);
  }
}
