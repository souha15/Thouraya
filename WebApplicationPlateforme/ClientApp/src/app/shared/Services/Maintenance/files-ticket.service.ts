import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesTicket } from '../../Models/Maintenance/files-ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesFilesTicketService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesTicket;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesTicket

  Create(FilesTicket: FilesTicket) {
    return this.http.post<FilesTicket>(this.rootURL + '/FilesTickets', FilesTicket, this.headers);
  }

  //Edit FilesTicket
  Edit() {
    return this.http.put(this.rootURL + '/FilesTickets/' + this.formData.id, this.formData, this.headers);
  }

  // List FilesTicket

  List(): Observable<FilesTicket[]> {
    return this.http.get<FilesTicket[]>(this.rootURL + '/FilesTickets');
  }


  //Delete FilesTicket

  Delete(id) {
    return this.http.delete(this.rootURL + '/FilesTickets/' + id);
  }

  //Put FilesTicket

  PutObservable(FilesTicket: FilesTicket) {
    return this.http.put<FilesTicket>(this.rootURL + '/FilesTickets/' + FilesTicket.id, FilesTicket, this.headers);
  }

  PutObservableTr(FilesTicket: FilesTicket) {
    return this.http.put<FilesTicket>(this.rootURL + '/FilesTickets/' + FilesTicket.id, FilesTicket, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/FilesTickets/' + this.formData.id, this.formData, this.headers);
  }

  //Get FilesTicket By Id

  GetById(Id) {
    return this.http.get<FilesTicket>(this.rootURL + '/FilesTickets/' + Id);
  }
}
