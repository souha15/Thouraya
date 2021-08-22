import { Injectable } from '@angular/core';
import { DepotRevenus } from '../../Models/Dotations/depot-revenus.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepotRevenusService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DepotRevenus;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: DepotRevenus) {
    return this.http.post<DepotRevenus>(this.rootURL + '/depotRevenus', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/depotRevenus', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<DepotRevenus[]> {
    return this.http.get<DepotRevenus[]>(this.rootURL + '/depotRevenus');
  }

  Get() {
    return this.http.get<DepotRevenus[]>(this.rootURL + '/depotRevenus');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<DepotRevenus>(this.rootURL + '/depotRevenus/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/depotRevenus/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/depotRevenus/' + id);
  }
}
