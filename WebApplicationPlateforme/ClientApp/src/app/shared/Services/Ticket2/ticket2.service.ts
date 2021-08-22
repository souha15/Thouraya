import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket2 } from '../../Models/Ticket2/ticket2.model';

@Injectable({
  providedIn: 'root'
})
export class Ticket2Service {

  constructor(private pathService: PathSharedService,
    private http: HttpClient, ) { }

  readonly rootURL = this.pathService.getPath();
  formData: Ticket2;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  PutObservableE(Transaction: Ticket2) {
    return this.http.put<Ticket2>(this.rootURL + '/Ticket2/' + Transaction.id, Transaction, this.headers);

  }
  //Create Ticket2

  CreateTicket2(tache: Ticket2) {
    return this.http.post<Ticket2>(this.rootURL + '/Ticket2', tache, this.headers);
  }

  //Edit Ticket2
  EditTicket2() {
    return this.http.put(this.rootURL + '/Ticket2/' + this.formData.id, this.formData, this.headers);
  }

  // List Ticket2

  ListTicket2(): Observable<Ticket2[]> {
    return this.http.get<Ticket2[]>(this.rootURL + '/Ticket2');
  }

  //Delete Ticket2

  DeleteTicket2(id) {
    return this.http.delete(this.rootURL + '/Ticket2/' + id);
  }

  //Put Ticket2

  PutTicket2Observable(tache: Ticket2, Id: number) {
    return this.http.put<Ticket2>(this.rootURL + '/Ticket2/' + Id, tache, this.headers);
  }

  PutTicket2(Id) {
    return this.http.put(this.rootURL + '/Ticket2/' + this.formData.id, this.formData, this.headers);
  }

  //Get Ticket2 By Id

  GetById(Id) {
    return this.http.get<Ticket2>(this.rootURL + '/Ticket2/' + Id);
  }
}
