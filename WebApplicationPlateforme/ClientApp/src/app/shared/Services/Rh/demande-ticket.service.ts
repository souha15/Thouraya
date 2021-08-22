import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DemandeTicket } from '../../Models/RH/demande-ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DemandeTicketService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: DemandeTicket;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: DemandeTicket) {
    return this.http.post<DemandeTicket>(this.rootURL + '/DemandeTickets', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/DemandeTickets', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<DemandeTicket[]> {
    return this.http.get<DemandeTicket[]>(this.rootURL + '/DemandeTickets');
  }

  Get() {
    return this.http.get<DemandeTicket[]>(this.rootURL + '/DemandeTickets');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<DemandeTicket>(this.rootURL + '/DemandeTickets/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/DemandeTickets/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemandeTicket/' + id);
  }
}
