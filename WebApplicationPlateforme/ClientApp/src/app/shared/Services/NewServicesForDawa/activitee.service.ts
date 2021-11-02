import { Injectable } from '@angular/core';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activite } from '../../Models/NewModelsForDawaa/activite.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiviteeService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Activite;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Activite) {
    return this.http.put<Activite>(this.rootURL + '/Activitees/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: Activite) {
    return this.http.post<Activite>(this.rootURL + '/Activitees', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/Activitees/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<Activite[]> {
    return this.http.get<Activite[]>(this.rootURL + '/Activitees');
  }



  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/Activitees/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/Activitees/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<Activite>(this.rootURL + '/Activitees/' + Id);
  }

  public list: Activite[] = [];
}
