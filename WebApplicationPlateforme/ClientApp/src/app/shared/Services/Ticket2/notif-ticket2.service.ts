import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotifTicket2 } from '../../Models/Ticket2/notif-ticket2.model';
@Injectable({
  providedIn: 'root'
})
export class NotifTicket2Service {

  constructor(private pathService: PathSharedService,
    private http: HttpClient, ) { }

  readonly rootURL = this.pathService.getPath();
  formData: NotifTicket2;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  PutObservableE(Transaction: NotifTicket2) {
    return this.http.put<NotifTicket2>(this.rootURL + '/NotifTicket2/' + Transaction.id, Transaction, this.headers);

  }
  //Create NotifTicket2

  CreateNotifTicket2(tache: NotifTicket2) {
    return this.http.post<NotifTicket2>(this.rootURL + '/NotifTicket2', tache, this.headers);
  }

  //Edit NotifTicket2
  EditNotifTicket2() {
    return this.http.put(this.rootURL + '/NotifTicket2/' + this.formData.id, this.formData, this.headers);
  }

  // List NotifTicket2

  ListNotifTicket2(): Observable<NotifTicket2[]> {
    return this.http.get<NotifTicket2[]>(this.rootURL + '/NotifTicket2');
  }

  //Delete NotifTicket2

  DeleteNotifTicket2(id) {
    return this.http.delete(this.rootURL + '/NotifTicket2/' + id);
  }

  //Put NotifTicket2

  PutNotifTicket2Observable(tache: NotifTicket2, Id: number) {
    return this.http.put<NotifTicket2>(this.rootURL + '/NotifTicket2/' + Id, tache, this.headers);
  }

  PutNotifTicket2(Id) {
    return this.http.put(this.rootURL + '/NotifTicket2/' + this.formData.id, this.formData, this.headers);
  }

  //Get NotifTicket2 By Id

  GetById(Id) {
    return this.http.get<NotifTicket2>(this.rootURL + '/NotifTicket2/' + Id);
  }
}
