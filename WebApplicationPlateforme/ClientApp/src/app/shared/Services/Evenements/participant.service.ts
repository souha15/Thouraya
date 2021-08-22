import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Participant } from '../../Models/Evenements/participant.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Participant;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Participant

  Create(Participant: Participant) {
    return this.http.post<Participant>(this.rootURL + '/Participations', Participant, this.headers);
  }

  //Edit Participant
  Edit() {
    return this.http.put(this.rootURL + '/Participations/' + this.formData.id, this.formData, this.headers);
  }

  // List Participant

  List(): Observable<Participant[]> {
    return this.http.get<Participant[]>(this.rootURL + '/Participations');
  }


  //Delete Participant

  Delete(id) {
    return this.http.delete(this.rootURL + '/Participations/' + id);
  }

  //Put Participant

  PutObservable(Participant: Participant) {
    return this.http.put<Participant>(this.rootURL + '/Participations/' + Participant.id, Participant, this.headers);
  }

  PutObservableTr(Participant: Participant) {
    return this.http.put<Participant>(this.rootURL + '/Participations/' + Participant.id, Participant, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Participations/' + this.formData.id, this.formData, this.headers);
  }

  //Get Participant By Id

  GetById(Id) {
    return this.http.get<Participant>(this.rootURL + '/Participations/' + Id);
  }
}
