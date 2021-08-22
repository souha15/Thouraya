import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventsTwo } from '../../Models/EventsTwo/events-two.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsTwoService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: EventsTwo;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Type Dotation

  Add(dotation: EventsTwo) {
    return this.http.post<EventsTwo>(this.rootURL + '/EvenementTwoes', dotation, this.headers);
  }

  //Save Type Dotation
  Post() {
    return this.http.post(this.rootURL + '/EvenementTwoes', this.formData, this.headers);
  }

  //Get Type dotation List

  GetDotation(): Observable<EventsTwo[]> {
    return this.http.get<EventsTwo[]>(this.rootURL + '/EvenementTwoes');
  }

  Get() {
    return this.http.get<EventsTwo[]>(this.rootURL + '/EvenementTwoes');
  }
  //Get Type Dotation By Id

  GetById(Id) {
    return this.http.get<EventsTwo>(this.rootURL + '/EvenementTwoes/' + Id);
  }

  //Edit Type Dotation

  Edit() {
    return this.http.put(this.rootURL + '/EvenementTwoes/' + this.formData.id, this.formData, this.headers);
  }


  //Delete Type Dotation

  Delete(id) {
    return this.http.delete(this.rootURL + '/EvenementTwoes/' + id);
  }
}
