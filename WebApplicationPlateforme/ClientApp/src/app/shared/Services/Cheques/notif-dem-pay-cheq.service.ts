import { Injectable } from '@angular/core';
import { NotifDemPayCheq } from '../../Models/Cheques/notif-dem-pay-cheq.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifDemPayCheqService {

  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: NotifDemPayCheq
    ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create NotifDemPayCheq

  Add(NotifDemPayCheq: NotifDemPayCheq) {
    return this.http.post<NotifDemPayCheq>(this.rootURL + '/DemPayCheqNotifs', NotifDemPayCheq, this.headers);
  }

  PutObservableE(Transaction: NotifDemPayCheq) {
    return this.http.put<NotifDemPayCheq>(this.rootURL + '/DemPayCheqNotifs/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/DemPayCheqNotifs', this.formData, this.headers);
  }

  //Get NotifDemPayCheq List

  Get(): Observable<NotifDemPayCheq[]> {
    return this.http.get<NotifDemPayCheq[]>(this.rootURL + '/DemPayCheqNotifs');
  }

  //Get NotifDemPayCheq By Id

  GetById(Id) {
    return this.http.get<NotifDemPayCheq>(this.rootURL + '/DemPayCheqNotifs/' + Id);
  }

  //Edit NotifDemPayCheq

  Edit() {
    return this.http.put(this.rootURL + '/DemPayCheqNotifs/' + this.formData.id, this.formData, this.headers);
  }


  //Delete NotifDemPayCheq

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemPayCheqNotifs/' + id);
  }
}
