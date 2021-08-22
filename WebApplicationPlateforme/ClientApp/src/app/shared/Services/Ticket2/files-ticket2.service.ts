import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilesTicket2 } from '../../Models/Ticket2/files-ticket2.model';

@Injectable({
  providedIn: 'root'
})
export class FilesTicket2Service {

  constructor(private pathService: PathSharedService,
    private http: HttpClient, ) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesTicket2;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  PutObservableE(Transaction: FilesTicket2) {
    return this.http.put<FilesTicket2>(this.rootURL + '/FilesTicket2/' + Transaction.id, Transaction, this.headers);

  }
  //Create FilesTicket2

  CreateFilesTicket2(tache: FilesTicket2) {
    return this.http.post<FilesTicket2>(this.rootURL + '/FilesTicket2', tache, this.headers);
  }

  //Edit FilesTicket2
  EditFilesTicket2() {
    return this.http.put(this.rootURL + '/FilesTicket2/' + this.formData.id, this.formData, this.headers);
  }

  // List FilesTicket2

  ListFilesTicket2(): Observable<FilesTicket2[]> {
    return this.http.get<FilesTicket2[]>(this.rootURL + '/FilesTicket2');
  }

  //Delete FilesTicket2

  DeleteFilesTicket2(id) {
    return this.http.delete(this.rootURL + '/FilesTicket2/' + id);
  }

  //Put FilesTicket2

  PutFilesTicket2Observable(tache: FilesTicket2, Id: number) {
    return this.http.put<FilesTicket2>(this.rootURL + '/FilesTicket2/' + Id, tache, this.headers);
  }

  PutFilesTicket2(Id) {
    return this.http.put(this.rootURL + '/FilesTicket2/' + this.formData.id, this.formData, this.headers);
  }

  //Get FilesTicket2 By Id

  GetById(Id) {
    return this.http.get<FilesTicket2>(this.rootURL + '/FilesTicket2/' + Id);
  }
}
