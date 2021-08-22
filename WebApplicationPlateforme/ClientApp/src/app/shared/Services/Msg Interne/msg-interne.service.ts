import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MsgInterne } from '../../Models/Msg Interne/msg-interne.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MsgInterneService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient, ) { }

  readonly rootURL = this.pathService.getPath();
  formData: MsgInterne;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }


  getdata() {

  }
  PutObservableE(Transaction: MsgInterne) {
    return this.http.put<MsgInterne>(this.rootURL + '/MsgInternes/' + Transaction.id, Transaction, this.headers);

  }
  //Create MsgInterne

  CreateMsgInterne(tache: MsgInterne) {
    return this.http.post<MsgInterne>(this.rootURL + '/MsgInternes', tache, this.headers);
  }

  //Edit MsgInterne
  EditMsgInterne() {
    return this.http.put(this.rootURL + '/MsgInternes/' + this.formData.id, this.formData, this.headers);
  }

  // List MsgInterne

  ListMsgInterne(): Observable<MsgInterne[]> {
    return this.http.get<MsgInterne[]>(this.rootURL + '/MsgInternes');
  }

  //Delete MsgInterne

  DeleteMsgInterne(id) {
    return this.http.delete(this.rootURL + '/MsgInternes/' + id);
  }

  //Put MsgInterne

  PutMsgInterneObservable(tache: MsgInterne, Id: number) {
    return this.http.put<MsgInterne>(this.rootURL + '/MsgInternes/' + Id, tache, this.headers);
  }

  PutMsgInterne(Id) {
    return this.http.put(this.rootURL + '/MsgInternes/' + this.formData.id, this.formData, this.headers);
  }

  //Get MsgInterne By Id

  GetById(Id) {
    return this.http.get<MsgInterne>(this.rootURL + '/MsgInternes/' + Id);
  }
}
