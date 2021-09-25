import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from '../../../Models/MediaCenter/film/film.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Film;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }
  PutObservableE(Transaction: Film) {
    return this.http.put<Film>(this.rootURL + '/Films/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: Film) {
    return this.http.post<Film>(this.rootURL + '/Films', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/Films/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<Film[]> {
    return this.http.get<Film[]>(this.rootURL + '/Films');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/Films/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/Films/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<Film>(this.rootURL + '/Films/' + Id);
  }
}
