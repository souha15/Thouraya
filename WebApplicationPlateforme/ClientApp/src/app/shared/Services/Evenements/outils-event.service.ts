import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OutilsEvent } from '../../Models/Evenements/outils-event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OutilsEventService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: OutilsEvent;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create OutilsEvent

  Create(OutilsEvent: OutilsEvent) {
    return this.http.post<OutilsEvent>(this.rootURL + '/OutilsEvents', OutilsEvent, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/OutilsEvents', this.formData, this.headers);
  }

  //Edit OutilsEvent
  Edit() {
    return this.http.put(this.rootURL + '/OutilsEvents/' + this.formData.id, this.formData, this.headers);
  }

  // List OutilsEvent

  List(): Observable<OutilsEvent[]> {
    return this.http.get<OutilsEvent[]>(this.rootURL + '/OutilsEvents');
  }


  //Delete OutilsEvent

  Delete(id) {
    return this.http.delete(this.rootURL + '/OutilsEvents/' + id);
  }

  //Put OutilsEvent

  PutObservable(OutilsEvent: OutilsEvent) {
    return this.http.put<OutilsEvent>(this.rootURL + '/OutilsEvents/' + OutilsEvent.id, OutilsEvent, this.headers);
  }

  PutObservableTr(OutilsEvent: OutilsEvent) {
    return this.http.put<OutilsEvent>(this.rootURL + '/OutilsEvents/' + OutilsEvent.id, OutilsEvent, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/OutilsEvents/' + this.formData.id, this.formData, this.headers);
  }

  //Get OutilsEvent By Id

  GetById(Id) {
    return this.http.get<OutilsEvent>(this.rootURL + '/OutilsEvents/' + Id);
  }
}
