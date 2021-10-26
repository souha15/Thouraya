import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PathSharedService } from '../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangerRib } from '../../Models/ChangeRib/changer-rib.model';

@Injectable({
  providedIn: 'root'
})
export class ChangerRibService {


  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: ChangerRib;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: ChangerRib) {
    return this.http.put<ChangerRib>(this.rootURL + '/DemChangeRibs/' + Transaction.id, Transaction, this.headers);

  }
  //Create Film

  Create(tache: ChangerRib) {
    return this.http.post<ChangerRib>(this.rootURL + '/DemChangeRibs', tache, this.headers);
  }

  //Edit Film
  Edit() {
    return this.http.put(this.rootURL + '/DemChangeRibs/' + this.formData.id, this.formData, this.headers);
  }

  // List Film

  List(): Observable<ChangerRib[]> {
    return this.http.get<ChangerRib[]>(this.rootURL + '/DemChangeRibs');
  }

  //Delete Film

  Delete(id) {
    return this.http.delete(this.rootURL + '/DemChangeRibs/' + id);
  }

  //Put Film


  Put(Id) {
    return this.http.put(this.rootURL + '/DemChangeRibs/' + this.formData.id, this.formData, this.headers);
  }

  //Get Film By Id

  GetById(Id) {
    return this.http.get<ChangerRib>(this.rootURL + '/DemChangeRibs/' + Id);
  }
}
