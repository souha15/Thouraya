import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PathSharedService } from '../../path-shared.service';
import { Commentaire } from '../../Models/Taches/commentaire.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Commentaire;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Comment
  CreateComment(comment: Commentaire) {
    return this.http.post<Commentaire>(this.rootURL + '/Commentaires', comment, this.headers);
  }

  //Comments list

  CommentsList(): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(this.rootURL + '/Commentaires');
  }

  //Get Comment By Id

  GetById(Id) {
    return this.http.get<Commentaire>(this.rootURL + '/Commentaires/' + Id);
  }
}
