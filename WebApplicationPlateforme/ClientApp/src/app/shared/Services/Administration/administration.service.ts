import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Administration } from '../../Models/Administration/administration.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrationService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Administration;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Administration

  AddAdministration(administration: Administration) {
    return this.http.post<Administration>(this.rootURL + '/Administrations', administration, this.headers);
  }

  //Edit Administration

  EditAdministration() {
    return this.http.put(this.rootURL + '/Administrations/' + this.formData.id, this.formData, this.headers);
  }

  //list of Administrations

  ListAdministration(): Observable<Administration[]> {
    return this.http.get<Administration[]>(this.rootURL + '/Administrations');
  }

  //Get Administration By Id

  GetById(id) {
    return this.http.get<Administration>(this.rootURL + '/Administrations/' + id);
  }

  //Delete Administration

  DeletAdministration(id) {
    return this.http.delete(this.rootURL + '/Administrations/' + id);
  }

  PutObservable(Transaction: Administration) {
    return this.http.put<Administration>(this.rootURL + '/Administrations/' + Transaction.id, Transaction, this.headers);
  }
}
