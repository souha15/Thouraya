import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesProjet } from '../../Models/Projet/files-projet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesProjetService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesProjet
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesProjet

  Add(FilesProjet: FilesProjet) {
    return this.http.post<FilesProjet>(this.rootURL + '/FilesProjets', FilesProjet, this.headers);
  }

  PutObservableE(Transaction: FilesProjet) {
    return this.http.put<FilesProjet>(this.rootURL + '/FilesProjets/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesProjets', this.formData, this.headers);
  }

  //Get FilesProjet List

  Get(): Observable<FilesProjet[]> {
    return this.http.get<FilesProjet[]>(this.rootURL + '/FilesProjets');
  }

  //Get FilesProjet By Id

  GetById(Id) {
    return this.http.get<FilesProjet>(this.rootURL + '/FilesProjets/' + Id);
  }

  //Edit FilesProjet

  Edit() {
    return this.http.put(this.rootURL + '/FilesProjets/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesProjet

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesProjets/' + id);
  }

}

