import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Film } from '../../../Models/MediaCenter/film/film.model';
import { Observable } from 'rxjs';
import { FilesFilm } from '../../../Models/MediaCenter/film/files-film.model';

@Injectable({
  providedIn: 'root'
})
export class FilesFilmService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesFilm;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: FilesFilm) {
    return this.http.put<FilesFilm>(this.rootURL + '/FilmsFiles/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: FilesFilm) {
    return this.http.post<FilesFilm>(this.rootURL + '/FilmsFiles', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/FilmsFiles/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<FilesFilm[]> {
    return this.http.get<FilesFilm[]>(this.rootURL + '/FilmsFiles');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilmsFiles/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/FilmsFiles/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<Film>(this.rootURL + '/FilmsFiles/' + Id);
  }
}
