import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesOrg } from '../../Models/ServiceRh/files-org.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesOrgService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesOrg;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesOrg

  Add(FilesOrg: FilesOrg) {
    return this.http.post<FilesOrg>(this.rootURL + '/FilesOrgs', FilesOrg, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/FilesOrgs', this.formData, this.headers);
  }

  //Get FilesOrg List

  Get(): Observable<FilesOrg[]> {
    return this.http.get<FilesOrg[]>(this.rootURL + '/FilesOrgs');
  }

  //Get FilesOrg By Id

  GetById(Id) {
    return this.http.get<FilesOrg>(this.rootURL + '/FilesOrgs/' + Id);
  }

  //Edit FilesOrg

  Edit() {
    return this.http.put(this.rootURL + '/FilesOrgs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete FilesOrg

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesOrgs/' + id);
  }
}
