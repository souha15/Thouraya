import { Injectable } from '@angular/core';
import { Proprietaire } from '../../Models/AdministrativeCommunication/proprietaire.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProprietaireService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Proprietaire;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Proprietaire

  Create(Proprietaire: Proprietaire) {
    return this.http.post<Proprietaire>(this.rootURL + '/Proprietaires', Proprietaire, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/Proprietaires', this.formData, this.headers);
  }
  //Edit Proprietaire
  Edit() {
    return this.http.put(this.rootURL + '/Proprietaires/' + this.formData.id, this.formData, this.headers);
  }

  // List Proprietaire

  List(): Observable<Proprietaire[]> {
    return this.http.get<Proprietaire[]>(this.rootURL + '/Proprietaires');
  }

  //Delete Proprietaire

  Delete(id) {
    return this.http.delete(this.rootURL + '/Proprietaires/' + id);
  }

  //Put Proprietaire

  PutObservable(Proprietaire: Proprietaire, Id: number) {
    return this.http.put<Proprietaire>(this.rootURL + '/Proprietaires/' + Id, Proprietaire, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Proprietaires/' + this.formData.id, this.formData, this.headers);
  }

  //Get Proprietaire By Id

  GetById(Id) {
    return this.http.get<Proprietaire>(this.rootURL + '/Proprietaires/' + Id);
  }
}
