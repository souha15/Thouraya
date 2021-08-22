import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DemandeSalariale } from '../../Models/RH/demande-salariale.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeSalarialeService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemandeSalariale;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: DemandeSalariale) {
    return this.http.post<DemandeSalariale>(this.rootURL + '/DemandeSalariales', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/DemandeSalariales', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<DemandeSalariale[]> {
    return this.http.get<DemandeSalariale[]>(this.rootURL + '/DemandeSalariales');
  }

  Get() {
    return this.http.get<DemandeSalariale[]>(this.rootURL + '/DemandeSalariales');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<DemandeSalariale>(this.rootURL + '/DemandeSalariales/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/DemandeSalariales/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandeSalariale/' + id);
  }
}
