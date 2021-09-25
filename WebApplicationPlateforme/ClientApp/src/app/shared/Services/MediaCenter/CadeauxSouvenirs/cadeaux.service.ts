import { Injectable } from '@angular/core';
import { PathSharedService } from '../../../path-shared.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Cadeaux } from '../../../Models/MediaCenter/CadeauxSouvenirs/cadeaux.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadeauxService {



  constructor(private pathService: PathSharedService,
    private http: HttpClient) { }

  readonly rootURL = this.pathService.getPath();
  formData: Cadeaux;
  headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    })
  }

  PutObservableE(Transaction: Cadeaux) {
    return this.http.put<Cadeaux>(this.rootURL + '/Cadeaux/' + Transaction.id, Transaction, this.headers);

  }
  //Create Cadeaux

  Create(tache: Cadeaux) {
    return this.http.post<Cadeaux>(this.rootURL + '/Cadeaux', tache, this.headers);
  }

  //Edit Cadeaux
  Edit() {
    return this.http.put(this.rootURL + '/Cadeaux/' + this.formData.id, this.formData, this.headers);
  }

  // List Cadeaux

  List(): Observable<Cadeaux[]> {
    return this.http.get<Cadeaux[]>(this.rootURL + '/Cadeaux');
  }

  //Delete Cadeaux

  Delete(id) {
    return this.http.delete(this.rootURL + '/Cadeaux/' + id);
  }

  //Put Cadeaux


  Put(Id) {
    return this.http.put(this.rootURL + '/Cadeaux/' + this.formData.id, this.formData, this.headers);
  }

  //Get Cadeaux By Id

  GetById(Id) {
    return this.http.get<Cadeaux>(this.rootURL + '/Cadeaux/' + Id);
  }
}
