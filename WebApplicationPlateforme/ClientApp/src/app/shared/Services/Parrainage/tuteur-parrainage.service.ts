import { Injectable } from '@angular/core';
import { TuteurOrphelin } from '../../Models/Orphelin/tuteur-orphelin.model';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TuteurParrinage } from '../../Models/Parrainage/tuteur-parrinage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TuteurParrainageService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: TuteurParrinage;
  ;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create TuteurParrinage

  Add(TuteurParrinage: TuteurParrinage) {
    return this.http.post<TuteurParrinage>(this.rootURL + '/TuteurParrainages', TuteurParrinage, this.headers);
  }

  PutObservableE(Transaction: TuteurParrinage) {
    return this.http.put<TuteurParrinage>(this.rootURL + '/TuteurParrainages/' + Transaction.id, Transaction, this.headers);

  }
  Post() {
    return this.http.post(this.rootURL + '/TuteurParrainages', this.formData, this.headers);
  }

  //Get TuteurParrinage List

  Get(): Observable<TuteurParrinage[]> {
    return this.http.get<TuteurParrinage[]>(this.rootURL + '/TuteurParrainages');
  }

  //Get TuteurParrinage By Id

  GetById(Id) {
    return this.http.get<TuteurParrinage>(this.rootURL + '/TuteurParrainages/' + Id);
  }

  //Edit TuteurParrinage

  Edit() {
    return this.http.put(this.rootURL + '/TuteurParrainages/' + this.formData.id, this.formData, this.headers);
  }


  //Delete TuteurParrinage

  Delete(id) {
    return this.http.delete(this.rootURL + '/TuteurParrainages/' + id);
  }
}
