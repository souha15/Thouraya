import { Injectable } from '@angular/core';
import { Organisme } from '../../Models/AdministrativeCommunication/organisme.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganismeService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Organisme;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Organisme

  Create(Organisme: Organisme) {
    return this.http.post<Organisme>(this.rootURL + '/Organismes', Organisme, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/Organismes', this.formData, this.headers);
  }

  //Edit Organisme
  Edit() {
    return this.http.put(this.rootURL + '/Organismes/' + this.formData.id, this.formData, this.headers);
  }

  // List Organisme

  List(): Observable<Organisme[]> {
    return this.http.get<Organisme[]>(this.rootURL + '/Organismes');
  }

  //Delete Organisme

  Delete(id) {
    return this.http.delete(this.rootURL + '/Organismes/' + id);
  }

  //Put Organisme

  PutObservable(Organisme: Organisme, Id: number) {
    return this.http.put<Organisme>(this.rootURL + '/Organismes/' + Id, Organisme, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Organismes/' + this.formData.id, this.formData, this.headers);
  }

  //Get Organisme By Id

  GetById(Id) {
    return this.http.get<Organisme>(this.rootURL + '/Organismes/' + Id);
  }
}
