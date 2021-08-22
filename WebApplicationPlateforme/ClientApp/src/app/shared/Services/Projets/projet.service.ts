import { Injectable } from '@angular/core';
import { Projet } from '../../Models/Projet/projet.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjetService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Projet;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Projet

  Add(Projet: Projet) {
    return this.http.post<Projet>(this.rootURL + '/Projets', Projet, this.headers);
  }

  PutObservableE(Transaction: Projet) {
    return this.http.put<Projet>(this.rootURL + '/Projets/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/Projets', this.formData, this.headers);
  }

  //Get Projet List

  Get(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.rootURL + '/Projets');
  }

  //Get Projet By Id

  GetById(Id) {
    return this.http.get<Projet>(this.rootURL + '/Projets/' + Id);
  }

  //Edit Projet

  Edit() {
    return this.http.put(this.rootURL + '/Projets/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Projet

  Delete(id) {
    return this.http.delete(this.rootURL + '/Projets/' + id);
  }

}
