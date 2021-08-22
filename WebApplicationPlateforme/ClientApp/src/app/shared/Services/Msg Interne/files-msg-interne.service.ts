import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesMsgInterne } from '../../Models/Msg Interne/files-msg-interne.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesMsgInterneService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient, ) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesMsgInterne;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  PutObservableE(Transaction: FilesMsgInterne) {
    return this.http.put<FilesMsgInterne>(this.rootURL + '/FilesMsgInternes/' + Transaction.id, Transaction, this.headers);

  }
  //Create FilesMsgInterne

  CreateFilesMsgInterne(tache: FilesMsgInterne) {
    return this.http.post<FilesMsgInterne>(this.rootURL + '/FilesMsgInternes', tache, this.headers);
  }

  //Edit FilesMsgInterne
  EditFilesMsgInterne() {
    return this.http.put(this.rootURL + '/FilesMsgInternes/' + this.formData.id, this.formData, this.headers);
  }

  // List FilesMsgInterne

  ListFilesMsgInterne(): Observable<FilesMsgInterne[]> {
    return this.http.get<FilesMsgInterne[]>(this.rootURL + '/FilesMsgInternes');
  }

  //Delete FilesMsgInterne

  DeleteFilesMsgInterne(id) {
    return this.http.delete(this.rootURL + '/FilesMsgInternes/' + id);
  }

  //Put FilesMsgInterne

  PutFilesMsgInterneObservable(tache: FilesMsgInterne, Id: number) {
    return this.http.put<FilesMsgInterne>(this.rootURL + '/FilesMsgInternes/' + Id, tache, this.headers);
  }

  PutFilesMsgInterne(Id) {
    return this.http.put(this.rootURL + '/FilesMsgInternes/' + this.formData.id, this.formData, this.headers);
  }

  //Get FilesMsgInterne By Id

  GetById(Id) {
    return this.http.get<FilesMsgInterne>(this.rootURL + '/FilesMsgInternes/' + Id);
  }
}
