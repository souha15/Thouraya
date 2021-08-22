import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProjetFiles } from '../../Models/ProjetOrg/projet-files.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilsProjetFilesOrgService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ProjetFiles;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create ProjetFiles

  Add(ProjetFiles: ProjetFiles) {
    return this.http.post<ProjetFiles>(this.rootURL + '/FilesProjetOrgs', ProjetFiles, this.headers);
  }

  PutObservableE(Transaction: ProjetFiles) {
    return this.http.put<ProjetFiles>(this.rootURL + '/FilesProjetOrgs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/FilesProjetOrgs', this.formData, this.headers);
  }

  //Get ProjetFiles List

  Get(): Observable<ProjetFiles[]> {
    return this.http.get<ProjetFiles[]>(this.rootURL + '/FilesProjetOrgs');
  }

  //Get ProjetFiles By Id

  GetById(Id) {
    return this.http.get<ProjetFiles>(this.rootURL + '/FilesProjetOrgs/' + Id);
  }

  //Edit ProjetFiles

  Edit() {
    return this.http.put(this.rootURL + '/FilesProjetOrgs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete ProjetFiles

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesProjetOrgs/' + id);
  }

}
