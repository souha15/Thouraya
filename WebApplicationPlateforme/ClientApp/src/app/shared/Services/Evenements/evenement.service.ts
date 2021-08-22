import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evenement } from '../../Models/Evenements/evenement.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Evenement;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  //Create Evenement

  Create(Evenement: Evenement) {
    return this.http.post<Evenement>(this.rootURL + '/Evenements', Evenement, this.headers);
  }

  //Edit Evenement
  Edit() {
    return this.http.put(this.rootURL + '/Evenements/' + this.formData.id, this.formData, this.headers);
  }

  // List Evenement

  List(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(this.rootURL + '/Evenements');
  }


  //Delete Evenement

  Delete(id) {
    return this.http.delete(this.rootURL + '/Evenements/' + id);
  }

  //Put Evenement

  PutObservable(Evenement: Evenement) {
    return this.http.put<Evenement>(this.rootURL + '/Evenements/' + Evenement.id, Evenement, this.headers);
  }

  PutObservableTr(Evenement: Evenement) {
    return this.http.put<Evenement>(this.rootURL + '/Evenements/' + Evenement.id, Evenement, this.headers);
  }

  Put(Id) {
    return this.http.put(this.rootURL + '/Evenements/' + this.formData.id, this.formData, this.headers);
  }

  //Get Evenement By Id

  GetById(Id) {
    return this.http.get<Evenement>(this.rootURL + '/Evenements/' + Id);
  }
}

