import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesEtatCompte } from '../../Models/Comptes/files-etat-compte.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesEtatCompteService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesEtatCompte
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesEtatCompte

  Add(FilesEtatCompte: FilesEtatCompte) {
    return this.http.post<FilesEtatCompte>(this.rootURL + '/FilesEtatComptes', FilesEtatCompte, this.headers);
  }

  PutObservableE(Transaction: FilesEtatCompte) {
    return this.http.put<FilesEtatCompte>(this.rootURL + '/FilesEtatComptes/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesEtatComptes', this.formData, this.headers);
  }

  //Get FilesEtatCompte List

  Get(): Observable<FilesEtatCompte[]> {
    return this.http.get<FilesEtatCompte[]>(this.rootURL + '/FilesEtatComptes');
  }

  //Get FilesEtatCompte By Id

  GetById(Id) {
    return this.http.get<FilesEtatCompte>(this.rootURL + '/FilesEtatComptes/' + Id);
  }

  //Edit FilesEtatCompte

  Edit() {
    return this.http.put(this.rootURL + '/FilesEtatComptes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesEtatCompte

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesEtatComptes/' + id);
  }
}
