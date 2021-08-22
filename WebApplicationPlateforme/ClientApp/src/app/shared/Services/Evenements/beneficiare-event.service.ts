import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BeneficiaireEvent } from '../../Models/Evenements/beneficiaire-event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeneficiareEventService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: BeneficiaireEvent;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create BeneficiaireEvent

  Create(BeneficiaireEvent: BeneficiaireEvent) {
    return this.http.post<BeneficiaireEvent>(this.rootURL + '/BeneficiaireEvents', BeneficiaireEvent, this.headers);
  }

  Post() {
    return this.http.post(this.rootURL + '/BeneficiaireEvents', this.formData, this.headers);
  }

  //Edit BeneficiaireEvent
  Edit() {
    return this.http.put(this.rootURL + '/BeneficiaireEvents/' + this.formData.id, this.formData, this.headers);
  }

  // List BeneficiaireEvent

  List(): Observable<BeneficiaireEvent[]> {
    return this.http.get<BeneficiaireEvent[]>(this.rootURL + '/BeneficiaireEvents');
  }


  //Delete BeneficiaireEvent

  Delete(id) {
    return this.http.delete(this.rootURL + '/BeneficiaireEvents/' + id);
  }

  //Put BeneficiaireEvent

  PutObservable(BeneficiaireEvent: BeneficiaireEvent) {
    return this.http.put<BeneficiaireEvent>(this.rootURL + '/BeneficiaireEvents/' + BeneficiaireEvent.id, BeneficiaireEvent, this.headers);
  }

  PutObservableTr(BeneficiaireEvent: BeneficiaireEvent) {
    return this.http.put<BeneficiaireEvent>(this.rootURL + '/BeneficiaireEvents/' + BeneficiaireEvent.id, BeneficiaireEvent, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/BeneficiaireEvents/' + this.formData.id, this.formData, this.headers);
  }

  //Get BeneficiaireEvent By Id

  GetById(Id) {
    return this.http.get<BeneficiaireEvent>(this.rootURL + '/BeneficiaireEvents/' + Id);
  }

}
