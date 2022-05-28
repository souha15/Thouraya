import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Notif } from '../../Models/NotifSystem/notif.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Notif;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TacheEv

  Add(dotation: Notif) {
    return this.http.post<Notif>(this.rootURL + '/Notifs', dotation, this.headers);
  }
  //Put FilesTicket

  PutObservable(FilesTicket: Notif) {
    return this.http.put<Notif>(this.rootURL + '/Notifs/' + FilesTicket.id, FilesTicket, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/Notifs', this.formData, this.headers);
  }



  Get(): Observable<Notif[]> {
    return this.http.get<Notif[]>(this.rootURL + '/Notifs');
  }


  GetByUser(Id): Observable<Notif[]> {
    return this.http.get<Notif[]>(this.rootURL + '/Notifs/GetByUserAll/'+Id);
  }

  GetByUserRead(Id): Observable<Notif[]> {
    return this.http.get<Notif[]>(this.rootURL + '/Notifs/GetByUserRead/'+Id);
  }

  GetByUserUnRead(Id): Observable<Notif[]> {
    return this.http.get<Notif[]>(this.rootURL + '/Notifs/GetByUserUnRead/'+Id);
  }

  List() {
    return this.http.get<Notif[]>(this.rootURL + '/Notifs');
  }


  GetById(Id) {
    return this.http.get<Notif>(this.rootURL + '/Notifs/' + Id);
  }



  Edit() {
    return this.http.put(this.rootURL + '/Notifs/' + this.formData.id, this.formData, this.headers);
  }



  Delete(id) {
    return this.http.delete(this.rootURL + '/Notifs/' + id);
  }
}
