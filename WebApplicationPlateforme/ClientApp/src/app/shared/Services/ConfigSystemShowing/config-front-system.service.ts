import { Injectable } from '@angular/core';
import { ConfigFrontSystem } from '../../Models/ConfigSystemShowing/config-front-system.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigSystemFrontservice {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ConfigFrontSystem;

  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ConfigFrontSystem

  Add(ConfigFrontSystem: ConfigFrontSystem) {
    return this.http.post<ConfigFrontSystem>(this.rootURL + '/ConfigSystemFronts', ConfigFrontSystem, this.headers);
  }

  PutObservableE(Transaction: ConfigFrontSystem) {
    return this.http.put<ConfigFrontSystem>(this.rootURL + '/ConfigSystemFronts/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/ConfigSystemFronts', this.formData, this.headers);
  }

  //Get ConfigFrontSystem List

  Get(): Observable<ConfigFrontSystem[]> {
    return this.http.get<ConfigFrontSystem[]>(this.rootURL + '/ConfigSystemFronts');
  }

  //Get ConfigFrontSystem By Id

  GetById(Id) {
    return this.http.get<ConfigFrontSystem>(this.rootURL + '/ConfigSystemFronts/' + Id);
  }

  //Edit ConfigFrontSystem

  Edit() {
    return this.http.put(this.rootURL + '/ConfigSystemFronts/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ConfigFrontSystem

  Delete(id) {
    return this.http.delete(this.rootURL + '/ConfigSystemFronts/' + id);
  }
}
