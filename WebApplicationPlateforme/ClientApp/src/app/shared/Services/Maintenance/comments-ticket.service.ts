import { Injectable } from '@angular/core';
import { CommentsTickets } from '../../Models/Maintenance/comments-tickets.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsTicketService {
  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: CommentsTickets;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create FilesTicket

  Create(FilesTicket: CommentsTickets) {
    return this.http.post<CommentsTickets>(this.rootURL + '/CommentsTickets', FilesTicket, this.headers);
  }

  //Edit FilesTicket
  Edit() {
    return this.http.put(this.rootURL + '/CommentsTickets/' + this.formData.id, this.formData, this.headers);
  }

  // List FilesTicket

  List(): Observable<CommentsTickets[]> {
    return this.http.get<CommentsTickets[]>(this.rootURL + '/CommentsTickets');
  }


  //Delete FilesTicket

  Delete(id) {
    return this.http.delete(this.rootURL + '/CommentsTickets/' + id);
  }

  //Put FilesTicket

  PutObservable(FilesTicket: CommentsTickets) {
    return this.http.put<CommentsTickets>(this.rootURL + '/CommentsTickets/' + FilesTicket.id, FilesTicket, this.headers);
  }

  PutObservableTr(FilesTicket: CommentsTickets) {
    return this.http.put<CommentsTickets>(this.rootURL + '/CommentsTickets/' + FilesTicket.id, FilesTicket, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/CommentsTickets/' + this.formData.id, this.formData, this.headers);
  }

  //Get FilesTicket By Id

  GetById(Id) {
    return this.http.get<CommentsTickets>(this.rootURL + '/CommentsTickets/' + Id);
  }
}
