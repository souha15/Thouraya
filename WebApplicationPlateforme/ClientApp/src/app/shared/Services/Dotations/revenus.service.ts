import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revenus } from '../../Models/Dotations/revenus.model';

@Injectable({
  providedIn: 'root'
})
export class RevenusService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Revenus;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Revenus

  Add(revenus: Revenus) {
    return this.http.post<Revenus>(this.rootURL + '/revenus', revenus, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/revenus', this.formData, this.headers);
  }

  //Get Revenus List

  Get(): Observable<Revenus[]> {
    return this.http.get<Revenus[]>(this.rootURL + '/revenus');
  }

  //Get Revenus By Id

  GetById(Id) {
    return this.http.get<Revenus>(this.rootURL + '/revenus/' + Id);
  }

  //Edit Revenus

  Edit() {
    return this.http.put(this.rootURL + '/revenus/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Revenus

  Delete(id) {
    return this.http.delete(this.rootURL + '/revenus/' + id);
  }
}
