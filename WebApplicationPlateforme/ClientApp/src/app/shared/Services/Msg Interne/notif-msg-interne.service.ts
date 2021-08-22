import { Injectable } from '@angular/core';
import { NotifMsgInterne } from '../../Models/Msg Interne/notif-msg-interne.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifMsgInterneService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient, ) { }

  readonly rootURL = this.pathService.getPath();
  formData: NotifMsgInterne;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  getdata() {

  }
  PutObservableE(Transaction: NotifMsgInterne) {
    return this.http.put<NotifMsgInterne>(this.rootURL + '/NotifMsgInternes/' + Transaction.id, Transaction, this.headers);

  }
  //Create NotifMsgInterne

  CreateNotifMsgInterne(tache: NotifMsgInterne) {
    return this.http.post<NotifMsgInterne>(this.rootURL + '/NotifMsgInternes', tache, this.headers);
  }

  //Edit NotifMsgInterne
  EditNotifMsgInterne() {
    return this.http.put(this.rootURL + '/NotifMsgInternes/' + this.formData.id, this.formData, this.headers);
  }

  // List NotifMsgInterne

  ListNotifMsgInterne(): Observable<NotifMsgInterne[]> {
    return this.http.get<NotifMsgInterne[]>(this.rootURL + '/NotifMsgInternes');
  }

  //Delete NotifMsgInterne

  DeleteNotifMsgInterne(id) {
    return this.http.delete(this.rootURL + '/NotifMsgInternes/' + id);
  }

  //Put NotifMsgInterne

  PutNotifMsgInterneObservable(tache: NotifMsgInterne, Id: number) {
    return this.http.put<NotifMsgInterne>(this.rootURL + '/NotifMsgInternes/' + Id, tache, this.headers);
  }

  PutNotifMsgInterne(Id) {
    return this.http.put(this.rootURL + '/NotifMsgInternes/' + this.formData.id, this.formData, this.headers);
  }

  //Get NotifMsgInterne By Id

  GetById(Id) {
    return this.http.get<NotifMsgInterne>(this.rootURL + '/NotifMsgInternes/' + Id);
  }
}
