import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FilesCommentsTickets } from '../../Models/Maintenance/files-comments-tickets.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilesCommentsTicketService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: FilesCommentsTickets;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesTicket

  Create(FilesTicket: FilesCommentsTickets) {
    return this.http.post<FilesCommentsTickets>(this.rootURL + '/CommentsTicketFiles', FilesTicket, this.headers);
  }

  //Edit FilesTicket
  Edit() {
    return this.http.put(this.rootURL + '/CommentsTicketFiles/' + this.formData.id, this.formData, this.headers);
  }

  // List FilesTicket

  List(): Observable<FilesCommentsTickets[]> {
    return this.http.get<FilesCommentsTickets[]>(this.rootURL + '/CommentsTicketFiles');
  }


  //Delete FilesTicket

  Delete(id) {
    return this.http.delete(this.rootURL + '/CommentsTicketFiles/' + id);
  }

  //Put FilesTicket

  PutObservable(FilesTicket: FilesCommentsTickets) {
    return this.http.put<FilesCommentsTickets>(this.rootURL + '/CommentsTicketFiles/' + FilesTicket.id, FilesTicket, this.headers);
  }

  PutObservableTr(FilesTicket: FilesCommentsTickets) {
    return this.http.put<FilesCommentsTickets>(this.rootURL + '/CommentsTicketFiles/' + FilesTicket.id, FilesTicket, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/CommentsTicketFiles/' + this.formData.id, this.formData, this.headers);
  }

  //Get FilesTicket By Id

  GetById(Id) {
    return this.http.get<FilesCommentsTickets>(this.rootURL + '/CommentsTicketFiles/' + Id);
  }
}
