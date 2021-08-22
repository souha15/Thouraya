import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ticket } from '../../Models/Maintenance/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Ticket;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Ticket

  Create(Ticket: Ticket) {
    return this.http.post<Ticket>(this.rootURL + '/Tickets', Ticket, this.headers);
  }

  //Edit Ticket
  Edit() {
    return this.http.put(this.rootURL + '/Tickets/' + this.formData.id, this.formData, this.headers);
  }

  // List Ticket

  List(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.rootURL + '/Tickets');
  }


  //Delete Ticket

  Delete(id) {
    return this.http.delete(this.rootURL + '/Tickets/' + id);
  }

  //Put Ticket

  PutObservable(Ticket: Ticket) {
    return this.http.put<Ticket>(this.rootURL + '/Tickets/' + Ticket.id, Ticket, this.headers);
  }

  PutObservableTr(Ticket: Ticket) {
    return this.http.put<Ticket>(this.rootURL + '/Tickets/' + Ticket.id, Ticket, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Tickets/' + this.formData.id, this.formData, this.headers);
  }

  //Get Ticket By Id

  GetById(Id) {
    return this.http.get<Ticket>(this.rootURL + '/Tickets/' + Id);
  }
}
