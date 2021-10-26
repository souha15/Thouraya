import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NotifText } from '../../Models/NotificationSettings/notif-text.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifTextService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: NotifText;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TacheEv

  Add(dotation: NotifText) {
    return this.http.post<NotifText>(this.rootURL + '/NotifTexts', dotation, this.headers);
  }


  Post() {
    return this.http.post(this.rootURL + '/NotifTexts', this.formData, this.headers);
  }



  Get(): Observable<NotifText[]> {
    return this.http.get<NotifText[]>(this.rootURL + '/NotifTexts');
  }

  List() {
    return this.http.get<NotifText[]>(this.rootURL + '/NotifTexts');
  }


  GetById(Id) {
    return this.http.get<NotifText>(this.rootURL + '/NotifTexts/' + Id);
  }



  Edit() {
    return this.http.put(this.rootURL + '/NotifTexts/' + this.formData.id, this.formData, this.headers);
  }



  Delete(id) {
    return this.http.delete(this.rootURL + '/NotifTexts/' + id);
  }
}
