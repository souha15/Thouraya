import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesBen } from '../../Models/GestBen/files-ben.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesBenService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesBen;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: FilesBen) {
    return this.http.put<FilesBen>(this.rootURL + '/FilesBens/' + Transaction.id, Transaction, this.headers);

  }
  //Create FilesBen

  CreateFilesBen(tache: FilesBen) {
    return this.http.post<FilesBen>(this.rootURL + '/FilesBens', tache, this.headers);
  }

  //Edit FilesBen
  EditFilesBen() {
    return this.http.put(this.rootURL + '/FilesBens/' + this.formData.id, this.formData, this.headers);
  }

  // List FilesBen

  ListFilesBen(): Observable<FilesBen[]> {
    return this.http.get<FilesBen[]>(this.rootURL + '/FilesBens');
  }

  //Delete FilesBen

  DeleteFilesBen(id) {
    return this.http.delete(this.rootURL + '/FilesBens/' + id);
  }

  //Put FilesBen

  PutFilesBenObservable(tache: FilesBen, Id: number) {
    return this.http.put<FilesBen>(this.rootURL + '/FilesBens/' + Id, tache, this.headers);
  }

  PutFilesBen(Id) {
    return this.http.put(this.rootURL + '/FilesBens/' + this.formData.id, this.formData, this.headers);
  }

  //Get FilesBen By Id

  GetById(Id) {
    return this.http.get<FilesBen>(this.rootURL + '/FilesBens/' + Id);
  }
}
